import jwt from "jsonwebtoken";

const generateJsonWebToken = (email: string) => {
  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET!);
  return token;
};

export default generateJsonWebToken;
