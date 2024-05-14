import axios from "axios";

const api = axios.create({
  baseURL: "https://open.api.nexon.com/maplestory/v1",
  headers: {
    "x-nxopen-api-key": `${process.env.NEXT_PUBLIC_NEXON_KEY}`,
  },
});

export default api;
