import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";

interface NewUserInput {
  username: string;
  password: string;
  name: string;
}

export default class UserController {
  static newUser = async (req: Request, res: Response) => {
    const { username, password, name } = <NewUserInput>req.body;

    // create new user object
    const user = new User();
    user.username = username;
    user.password = password;
    user.name = name;

    // validate input paramater using class-validator
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    // hash password before save
    await user.hashPassword();

    // try to create new user
    const userRepo = getRepository(User);
    try {
      await userRepo.save(user);
    } catch (err) {
      return res.status(409).json(err);
    }

    res.status(200).json("user created");
  };
}
