import { NextResponse } from "next/server";
import api from "@/api/axios";
import { handleAxiosError } from "@/lib/utils";
import NodeCache from "node-cache";

const TIMEOUT = 5000;
const MAX_RETRIES = 2;
const BATCHSIZE = 50;

const cache = new NodeCache({ stdTTL: 600 });

const fetchWithRetry = async (
  fetchFn: () => Promise<any>,
  retries = MAX_RETRIES,
) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await Promise.race([
        fetchFn(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), TIMEOUT),
        ),
      ]);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

const fetchData = async (
  endpoint: string,
  param: string,
  paramName: string,
) => {
  const cacheKey = `${endpoint}:${param}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await api.get(`${endpoint}?${paramName}=${param}`);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export async function POST(request: any) {
  const { names } = await request.json();

  try {
    const results = [];

    for (let i = 0; i < names?.length; i += BATCHSIZE) {
      const batch = names.slice(i, i + BATCHSIZE);

      const ocidPromises = batch.map((name: string) =>
        fetchWithRetry(() => fetchData("id", name, "character_name")),
      );

      const ocidResults = await Promise.all(ocidPromises);

      const validOcidResults = ocidResults.filter(
        (result): result is { ocid: string } => result && result.ocid,
      );

      const basicPromises = validOcidResults.map((result) =>
        fetchWithRetry(() =>
          fetchData("character/basic", result.ocid, "ocid"),
        ).catch(() => null),
      );

      const basicResults = await Promise.all(basicPromises);
      results.push(...basicResults.filter((result) => result !== null));
    }

    return NextResponse.json({ data: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
