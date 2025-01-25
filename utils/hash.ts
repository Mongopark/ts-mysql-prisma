import bcrypt from "bcrypt";
import crypto from "crypto";
import { v4 as uuid } from "uuid";

export const bcryptHashSync = (data: string) => {
  return bcrypt.hashSync(data, bcrypt.genSaltSync(10));
};

export const bcryptCompareSync = (data: string, dbString: string) => {
  return bcrypt.compareSync(data, dbString);
};

export const generateSHA512 = () => {
  const secret =
    "29A492021F4B709A8D1152C3EF4D32DC5A7092723ECAC4C511781003584B48873CCBFEBDEAE89CF22ED1CB1A836213549BC6638A3B563CA7FC009BEB3BC30CF8";
  const hmac = crypto.createHmac("sha512", secret);
  const signature = hmac.digest("hex");
  return signature;
};

export const generateSHA1 = async (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex").toLowerCase();
};

export const generateWalletId = () =>
  uuid().replace(/-/g, "").slice(0, 8).toUpperCase();

export const generateAnchorNumber = () => uuid().replace(/\D/g, "").slice(0, 6);
