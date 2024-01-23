import mongoose from "mongoose";

const connectWithDb = () => {
    mongoose.connect(process.env.MONGO_URL).then(console.log("DB is Connected")).catch((error) => {
        console.log(error);
        process.exit(1);
    });
}

export default connectWithDb;