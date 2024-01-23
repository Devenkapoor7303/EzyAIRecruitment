import { StatusCodes } from "http-status-codes";
import User from "../Model/UserModel.js";
import { hashPassword, comparePassword } from "../Utils/passwordUtil.js";
import { UnauthenticatedError } from "../Errors/CustomError.js";
import { createJWT } from "../Utils/tokenUtil.js";

export const register = async (req, res) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
    const user = await User.find({ email: req.body.email }).select("+password");
    const isValidUser = user && (await comparePassword(req.body.password, user.password));

    if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
    const token = createJWT({ userId: user._id, role: user.role });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({ msg: "User Logged In" });
};

export const logout = (req,res)=>{
    res.cookie('token','logout',{
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({msg:"user logged out"});
}

