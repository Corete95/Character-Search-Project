export async function getBasic(ocid: string) {
  const url = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}&date=2024-01-25`;
  const res = await fetch(url, {
    headers: {
      "x-nxopen-api-key": `${process.env.NEXT_PUBLIC_NEXON_KEY}`,
    },
  });
  const users = await res.json();
  console.log("???", users);
  return users;
}
