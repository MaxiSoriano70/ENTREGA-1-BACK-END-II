import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema({
    nickname: { type: String },
    avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/512/18851/18851107.png"},
    role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"]},
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true, },
    isVerify: { type: Boolean, default: false },
    verifyCode: { type: String, required: true }
    },
    { timestamps: true }
);

const User = model(collection, schema);
export default User;