"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";

interface Params {
    userId: string,
    username: string,
    name:string,
    bio: string,
    image: string,
    path:  string 
}
//Connect to mongoose
export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path
}: Params
    ): Promise<void>{
    connectToDb();

    try {await User.findOneAndUpdate(
        {id: userId},
        {
            username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded:true
        },
        {
            upsert: true
        })

    if (path === '/profile/edit'){
        revalidatePath(path)
    }
    }
    catch(err: any){
        throw new Error (`FAILED to update: ${err.message}`);
    }

}

export async function fetchUser(userId: string) {
    try {
        connectToDb();

        return await User.findOne({id:userId})
        // .populate({})
    }
    catch (err : any) {
        throw new Error("Error:"+err.message);
    }


}