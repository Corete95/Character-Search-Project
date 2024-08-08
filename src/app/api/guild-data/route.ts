import { NextResponse } from "next/server";
import api from "@/api/axios";
import { handleAxiosError } from "@/lib/utils";

const TIMEOUT = 10000;
const MAX_RETRIES = 3;
const BATCHSIZE = 20;

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

const fetchOcid = async (name: string) => {
  try {
    const response = await api.get(`id?character_name=${name}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const fetchBasic = async (ocid: string) => {
  try {
    const response = await api.get(`character/basic?ocid=${ocid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export async function POST(request: any) {
  const { names } = await request.json();

  try {
    const results = [];

    for (let i = 0; i < names.length; i += BATCHSIZE) {
      const batch = names.slice(i, i + BATCHSIZE);

      const ocidPromises = batch.map((name: string) =>
        fetchWithRetry(() => fetchOcid(name)).catch((error) => {
          return null;
        }),
      );

      const ocidResults = await Promise.all(ocidPromises);

      const ocids = ocidResults
        .filter((result): result is { ocid: string } => result && result.ocid)
        .map((result) => result.ocid);

      const basicPromises = ocids.map((ocid) =>
        fetchWithRetry(() => fetchBasic(ocid)).catch((error) => {
          return null;
        }),
      );

      const basicResults = await Promise.all(basicPromises);
      const validBasicResults = basicResults.filter(
        (result) => result !== null,
      );
      results.push(...validBasicResults);
    }

    return NextResponse.json({ data: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
