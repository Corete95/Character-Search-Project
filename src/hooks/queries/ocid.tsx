export async function getOcid(name: string) {
  const url = `https://open.api.nexon.com/maplestory/v1/id?character_name=${name}`;
  const res = await fetch(url, {
    headers: {
      "x-nxopen-api-key": `${process.env.NEXT_PUBLIC_NEXON_KEY}`,
    },
  });
  const ocid = await res.json();
  return ocid;
}
