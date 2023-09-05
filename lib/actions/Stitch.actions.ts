"use server";

import { revalidatePath } from "next/cache";
import Stitch from "../models/Stitch.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose"


interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}
export async function createStitch
({
    text,author, communityId, path
}: Params){
    connectToDb();

    const createdStitch = Stitch.create({
        text, author, community: null
    });

    //update user
    await User.findByIdAndUpdate(author, {
        $push: { stitches: createdStitch._id }
    })

    revalidatePath(path);

}
export async function fetchPosts(pageNumber=1, pageSize=20){
    connectToDb();

    //calulcate pages to skip
    const skipAm = (pageNumber - 1) * pageSize;

    //requirements
    try
    {
        const postsQuery = Stitch.find({parentId: {$in: [null, undefined]}})
            .sort({createdAt: "desc"})
            .skip(skipAm)
            .limit(pageSize)
            .populate({path: 'author', model: User })
            .populate({path: 'children', 
                        populate : {
                            path:'author',
                            model:User,
                            select:"_id name parentId image"
                        }
                })

    const totalPostC = await Stitch.countDocuments({parentId: {$in: [null, undefined]}});

    const posts = await postsQuery.exec();
    const isNext = totalPostC > skipAm + posts.length;

    return { posts, isNext}

    }
    catch (err : any) {
        console.log("ERROR: "+err.message);
    }
    
    

}