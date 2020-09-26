import passport, { use } from "passport";
import { validate } from "class-validator";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

import { GOOGLE_STRATEGY_OPTIONS } from "../utils/constants";

import { USER_PAYLOAD } from "../utils/types";
const userPayload: USER_PAYLOAD = {};

export const initPassport = () => {
  passport.serializeUser((user: USER_PAYLOAD, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (user: USER_PAYLOAD, done) => {
    const userRepo = getRepository(User);

    const getUser = await userRepo.findOne({ id: user.id });
    if (getUser) {
      return done(null, getUser);
    }
  });

  // Google oauth 2.0 strategy
  passport.use(
    new GoogleStrategy(
      GOOGLE_STRATEGY_OPTIONS,
      async (_accessToken: string, _refreshToken: string, profile, done) => {
        const userRepo = getRepository(User);

        // check if user is exist
        const user = await userRepo.findOne({
          where: { googleProviderId: profile.id },
        });

        if (user) {
          userPayload.id = user.id;
          return done(null!, userPayload);
        }

        // create new user instance
        const newUser = new User();
        newUser.googleProviderId = profile.id;
        newUser.name = profile.displayName;
        newUser.email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : "";
        newUser.avatar =
          profile.photos && profile.photos.length > 0
            ? profile.photos[0].value
            : "";

        const errors = await validate(newUser);
        if (errors.length > 0) {
          return done(errors.toString());
        }

        // save user to database
        await userRepo
          .save(newUser)
          .then((user) => {
            userPayload.id = user.id;
            return done(undefined, userPayload);
          })
          .catch((err) => done(err));
      }
    )
  );
};
