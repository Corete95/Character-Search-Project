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

const fetchBasic = async (ocid: string) => {
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
  const { names = [] } = await request.json();

  try {
    const ocidPromises = names.map((name: string) => fetchOcid(name));
    const ocidResults = await Promise.all(ocidPromises);

    const ocids = ocidResults
      .filter((result) => result && result.ocid)
      .map((result) => result.ocid);

    const basicPromises = ocids.map((ocid) => fetchBasic(ocid));
    const basicResults = await Promise.all(basicPromises);

    return NextResponse.json({ data: basicResults });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
