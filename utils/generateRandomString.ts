import randomString from "randomstring";
export const generateRandomString = (length: number) => {
  const number = randomString.generate({
    length,
    readable: true,
    charset: "numeric",
  });

  return number;
};
