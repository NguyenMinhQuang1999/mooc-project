

import mongoose from 'mongoose';
import  dotevn  from 'dotenv';
dotevn.config();
const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true
        });

        console.log("Mongo DB connected: ", conn.connection.host);
    }
    catch(e) {
        console.log(`Error  ${e.message}`);
        process.exit(1);

    }
}

export default connectDB