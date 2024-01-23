import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        select: false
    },
    lastName: {
        type: String,
        default: "lastName"
    },
    location: {
        type: String,
        default: "my city",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    userType:{
        type: String,
        enum:["JobSeeker","JobRecruiter"],
        default:"JobSeeker"
    },
    avatarPublicId: String
});


export default mongoose.model("User", UserSchema);