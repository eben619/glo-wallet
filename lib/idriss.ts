import { IdrissCrypto } from "idriss-crypto";

export const idriss = new IdrissCrypto(process.env.NEXT_PUBLIC_POLYGON_RPC_URL);

export const isIdriss = async (address: string, email?: string) => {
  if (email) {
    const resolved = await idriss.resolve(email);
    if (Object.values(resolved).includes(address)) {
      return true;
    }
  }

  const result = await getIdrissName(address);
  return !!result;
};

export const getIdrissName = async (address: string) =>
  idriss.reverseResolve(address);
