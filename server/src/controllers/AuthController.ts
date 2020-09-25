import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export default class AuthController {
  /**
   * login using username and password
   * @param req Request
   * @param res Response
   */
  public static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).json("username and password cannot be empty");
    }

    const userRepo = getRepository(User);

    // check if user exist
    const user = await userRepo.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json("user not found");
    }

    // validate password
    if (!(await user.checkPassword(password))) {
      return res.status(401).json("invalid password");
    }

    // TODO: Loging in user
    res.json(user);
  };
}
