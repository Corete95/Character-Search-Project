import { NextResponse } from "next/server";
import axios from "axios";
import { errorStatus } from "../../../utility/utils";
import api from "@/api/axios";

const fetchOcid = async (name: string) => {
  try {
    const response = await api.get(`id?character_name=${name}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
  }
};

const fetchBasic: any = async (ocid: string) => {
  try {
    const response = await api.get(`character/basic?ocid=${ocid}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
  }
};

export async function POST(request: any) {
  const { names = [], master } = await request.json();
  const batchSize = 20;

  try {
    const results = [];

    for (let i = 0; i < names.length; i += batchSize) {
      const batch = names.slice(i, i + batchSize);

      const ocidPromises = batch.map((name: string) => fetchOcid(name));
      const ocidResults = await Promise.all(ocidPromises);

      const ocids = ocidResults
        .filter((result) => result && result.ocid)
        .map((result) => result.ocid);

      const basicPromises = ocids.map((ocid) => fetchBasic(ocid));
      const basicResults = await Promise.all(basicPromises);

      results.push(...basicResults);
    }
    const masterResult = await results.find(
      (result) => result.character_name === master,
    );
    const reorderedResults = masterResult
      ? [masterResult, ...results.filter((r) => r !== masterResult)]
      : results;

    const uniqueResults = Array.from(
      new Set(reorderedResults.map((result) => JSON.stringify(result))),
    ).map((str) => JSON.parse(str));

    return NextResponse.json({ data: uniqueResults });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // const { names = [], master } = await request.json();

  // try {
  //   const ocidPromises = names.map((name: string) => fetchOcid(name));
  //   const ocidResults = await Promise.all(ocidPromises);

  //   const ocids = ocidResults
  //     .filter((result) => result && result.ocid)
  //     .map((result) => result.ocid);

  //   const basicPromises = ocids.map((ocid) => fetchBasic(ocid));
  //   const basicResults = await Promise.all(basicPromises);

  //   const masterResult = await basicResults.find(
  //     (result) => result.character_name === master,
  //   );
  //   const reorderedResults = masterResult
  //     ? [masterResult, ...basicResults]
  //     : basicResults;

  //   const uniqueResults = Array.from(
  //     new Set(reorderedResults.map((result) => JSON.stringify(result))),
  //   ).map((str) => JSON.parse(str));

  //   return NextResponse.json({ data: uniqueResults });
  // } catch (error: any) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
}
