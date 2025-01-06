import passport from "passport";
import bcrypt from "bcryptjs";

import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "./db";
import { User } from "@prisma/client";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    done(null, existingUser);
  } catch (error) {
    done(error);
  }
});
