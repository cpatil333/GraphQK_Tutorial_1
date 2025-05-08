import mongoose from "mongoose";
import { users, quotes } from "./fakedb.js";
import { randomBytes } from "crypto";
import User from "./models/User.js";
import Quote from "./models/Quote.js";
import bycrupt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    userById: async (_, { _id }) => await User.findOne({ _id }),
    quotesByby: async (_, { by }) => await Quote.find({ by }),
    quotes: async () => await Quote.find({}).populate("by", "_id, firstName"),
    //My profile
    myProfile: async (_, { arg }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged");
      }
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (ur) => await Quote.find({ by: ur._id }), //quotes.filter((quote) => quote.by == ur._id),
  },
  Mutation: {
    //New user signup
    singupUser: async (_, { newUser }) => {
      const user = await User.findOne({ email: newUser.email });
      if (user) {
        throw new Error("User already exists with the email");
      }
      const hashedPassword = await bycrupt.hash(newUser.password, 12);
      const createUser = new User({
        ...newUser,
        password: hashedPassword,
      });
      return await createUser.save();
    },

    //User Login
    singinUser: async (_, { userSignin }) => {
      //TODO
      //find user exists
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User does not exist with email");
      }
      //compared password
      const matchPassword = await bycrupt.compare(
        userSignin.password,
        user.password
      );
      if (!matchPassword) {
        throw new Error("email or password is invalid");
      }
      //create token
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECRET
      );
      return { token };
    },
    //Create new Quote
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote saved successfully!";
    },

    //update Exist user
    updateUser: async (_, { userUpdate }) => {
      const existUser = await User.findById({ _id: userUpdate._id });

      if (!existUser) {
        throw new Error("User does not exist!");
      }

      existUser.firstName = userUpdate.firstName;
      existUser.lastName = userUpdate.lastName;
      existUser.email = userUpdate.email;
      existUser.password = userUpdate.password;

      const updatedUser = await existUser.save();

      if (!updatedUser) {
        throw new Error("Something went wrong when udpate data");
      }
      return updatedUser;
    },

    //delete exist user
    deleteUser: async (_, { _id }) => {
      if (!_id) {
        throw new Error("User ID is required.");
      }
      const deletedUser = await User.findByIdAndDelete(_id);

      if (!deletedUser) {
        throw new Error("User not found or already deleted.");
      }

      return deletedUser;
    },
  },
};
export default resolvers;
