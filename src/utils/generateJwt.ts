import jwt from "jsonwebtoken";

const generateJsonWebToken = (email: string, userId?: number) => {
  const token = jwt.sign(
    { email, userId: userId ?? 0 },
    process.env.ACCESS_TOKEN_SECRET!
  );
  return token;
};

const generateJsonWebTokenEmail = (email: string) => {
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "5 min",
  });
  return token;
};

export { generateJsonWebToken, generateJsonWebTokenEmail };
