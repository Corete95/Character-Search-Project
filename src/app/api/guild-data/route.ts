// import { NextResponse } from "next/server";
// import axios from "axios";
// import { errorStatus } from "../../../utility/utils";
// import api from "@/api/axios";

// const fetchOcid = async (name: string) => {
//   try {
//     const response = await api.get(`id?character_name=${name}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       const code = errorStatus(error.response.data.error.name);
//       throw new Error(code);
//     }
//   }
// };

// const fetchBasic: any = async (ocid: string) => {
//   try {
//     const response = await api.get(`character/basic?ocid=${ocid}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       const code = errorStatus(error.response.data.error.name);
//       throw new Error(code);
//     }
//   }
// };

// export async function POST(request: any) {
//   const { names = [], master } = await request.json();
//   const batchSize = 20;

//   try {
//     const results = [];

//     for (let i = 0; i < names.length; i += batchSize) {
//       const batch = names.slice(i, i + batchSize);

//       const ocidPromises = batch.map((name: string) => fetchOcid(name));
//       const ocidResults = await Promise.all(ocidPromises);

//       const ocids = ocidResults
//         .filter((result) => result && result.ocid)
//         .map((result) => result.ocid);

//       const basicPromises = ocids.map((ocid) => fetchBasic(ocid));
//       const basicResults = await Promise.all(basicPromises);

//       results.push(...basicResults);
//     }
//     const masterResult = await results.find(
//       (result) => result.character_name === master,
//     );
//     const reorderedResults = masterResult
//       ? [masterResult, ...results.filter((r) => r !== masterResult)]
//       : results;

//     const uniqueResults = Array.from(
//       new Set(reorderedResults.map((result) => JSON.stringify(result))),
//     ).map((str) => JSON.parse(str));

//     return NextResponse.json({ data: uniqueResults });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
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
// }

// import { NextResponse } from "next/server";
// import axios from "axios";
// import { errorStatus } from "../../../utility/utils";
// import api from "@/api/axios";

// const fetchOcid = async (name: string) => {
//   try {
//     const response = await api.get(`id?character_name=${name}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       const code = errorStatus(error.response.data.error.name);
//       throw new Error(code);
//     }
//   }
// };

// const fetchBasic = async (ocid: string) => {
//   try {
//     const response = await api.get(`character/basic?ocid=${ocid}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       const code = errorStatus(error.response.data.error.name);
//       throw new Error(code);
//     }
//   }
// };

// export async function POST(request: any) {
//   const { names = [], master } = await request.json();
//   const batchSize = 40;

//   try {
//     const results = [];

//     for (let i = 0; i < names.length; i += batchSize) {
//       const batch = names.slice(i, i + batchSize);

//       const ocidPromises = batch.map((name: string) => fetchOcid(name));
//       const ocidResults = await Promise.allSettled(ocidPromises);

//       const ocids = ocidResults
//         .filter((result) => result.status === "fulfilled" && result.value.ocid)
//         .map((result) => (result as PromiseFulfilledResult<any>).value.ocid);

//       const basicPromises = ocids.map((ocid) => fetchBasic(ocid));
//       const basicResults = await Promise.allSettled(basicPromises);

//       const fulfilledBasicResults = basicResults
//         .filter((result) => result.status === "fulfilled")
//         .map((result) => (result as PromiseFulfilledResult<any>).value);

//       results.push(...fulfilledBasicResults);
//     }

//     console.log("TTT", results.length);
//     return NextResponse.json({ data: results });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import axios from "axios";
import { errorStatus } from "../../../utility/utils";
import api from "@/api/axios";

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
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
    throw error;
  }
};

const fetchBasic = async (ocid: string) => {
  try {
    const response = await api.get(`character/basic?ocid=${ocid}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const code = errorStatus(error.response.data.error.name);
      throw new Error(code);
    }
    throw error;
  }
};

export async function POST(request: any) {
  const { names = [] } = await request.json();

  try {
    const results = [];

    for (let i = 0; i < names.length; i += BATCHSIZE) {
      const batch = names.slice(i, i + BATCHSIZE);

      const ocidPromises = batch.map((name: string) =>
        fetchWithRetry(() => fetchOcid(name)),
      );
      const ocidResults = await Promise.all(ocidPromises);

      const ocids = ocidResults
        .filter((result): result is { ocid: string } => result && result.ocid)
        .map((result) => result.ocid);

      const basicPromises = ocids.map((ocid) =>
        fetchWithRetry(() => fetchBasic(ocid)),
      );
      const basicResults = await Promise.all(basicPromises);

      results.push(...basicResults);
    }

    return NextResponse.json({ data: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
