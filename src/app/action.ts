"use server";
export const fetching = async (url: string) => {
  const { SERVER_URL }: any = process.env;
  return await fetch(SERVER_URL + "api/mongodb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl: url }),
  })
    .then((res) => res.json())
    .then((data) => data);
};
