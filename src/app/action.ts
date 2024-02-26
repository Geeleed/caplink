"use server";

import {
  DataAddress,
  mongodbConnect,
  mongodbConnectThenAggregate,
} from "@geeleed/short-mongodb";
import { params } from "./dev";
import { ObjectId } from "mongodb";

const dataAddress: DataAddress = {
  connectionString: process.env.DATABASE_URL || params.DATABASE_URL,
  databaseName: "caplink",
  collectionName: "map",
};

export const env = () => ({
  DATABASE_URL: process.env.DATABASE_URL || params.DATABASE_URL,
  SERVER_URL: process.env.SERVER_URL || params.SERVER_URL,
});

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

export const readLink = async () => {
  const result = await mongodbConnectThenAggregate(dataAddress, [
    { $match: {} },
  ]);
  return JSON.stringify(result);
};

export const remove = async (_id: string) => {
  const conneted = await mongodbConnect(dataAddress.connectionString);
  const collection = conneted
    .db(dataAddress.databaseName)
    .collection(dataAddress.collectionName);
  await collection.deleteOne({ _id: new ObjectId(_id) });
  await conneted.close();
};
