import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} from "../utils/constants";

export const initPassport = () => {
  passport.serializeUser((user: { id: number }, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (user: { id: number }, done) => {
    const userRepo = getRepository(User);

    await userRepo
      .findOneOrFail(user.id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, user);
      });
  });

  // Google oauth 2.0 strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async (_accessToken: string, _refreshToken: string, profile, done) => {
        const userRepo = getRepository(User);

        // check if user is exist
        await userRepo
          .findOne({
            where: { googleProviderId: profile.id },
          })
          .then((user) => done(undefined, user))
          .catch((err) => done(err, null));

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

        // save user to database
        await userRepo
          .save(newUser)
          .then((user) => done(undefined, user))
          .catch((err) => done(err, null));
      }
    )
  );
};
