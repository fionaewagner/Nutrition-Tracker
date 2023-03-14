import express  from "express";
import { register, login, getUsers, updateUser, getUser } from "../Controller/auth.js";

export const authRouter = express.Router()

authRouter.route("/register").post(register);
authRouter.patch('/:_id', updateUser);
authRouter.get('/:_id', getUser);
authRouter.route("/login").post(login);
authRouter.route("/getusers").post(getUsers);


