export async function getCharacter(get: string, ocid: string, date: string) {
  const url = `https://open.api.nexon.com/maplestory/v1/character/${get}?ocid=${ocid}&date=${date}`;
  const res = await fetch(url, {
    headers: {
      "x-nxopen-api-key": `${process.env.NEXT_PUBLIC_NEXON_KEY}`,
    },
  });
  const users = await res.json();

  return users;
}
