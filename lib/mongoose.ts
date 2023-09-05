import mongoose from 'mongoose';

let isConnected = false; // conn status

export const connectToDb = async () => {
    mongoose.set('strictQuery', true); // to prevent query injection + unknown field injection

    if (!process.env.MONGODB_URL) {return console.log("No MongoDB URL")}
    if (isConnected) {return console.log("Connected to MongoDB already");}

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        
        console.log("Connected to MongoDB");

    }
    catch(err){

        console.log(err);


    }




}

