import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "./../../../DB/models/user.model";

interface registerParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: registerParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User  already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return { data: generateJwt({ firstName, lastName, email }), statusCode: 200 };
};

//login

interface loginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: loginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Account Not Found", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    return {
      data: generateJwt({
        email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      }),
      statusCode: 200,
    };
  }

  return { data: "Incorrect email or password", statusCode: 400 };
};

const generateJwt = (data: any) => {
  return jwt.sign(data, "EZb47pnPuLHTZfmuec39qG6JWTEm8z1v");
};
