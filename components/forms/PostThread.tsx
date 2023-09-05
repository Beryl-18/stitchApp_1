"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import * as z from 'zod'
import { Textarea } from "@/components/ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { StitchValidation } from "@/lib/validations/stitch";
import { createStitch } from "@/lib/actions/Stitch.actions";

// import { updateUser } from "@/lib/actions/user.actions";
// import { UserValidation } from "@/lib/validations/user";

interface Props {
    user : {
        id: string, 
        objectId: string, 
        username: string,
        name: string,
        bio: string,
        image: string,
    };
    btnTitle: string;
}


function PostThread({userId} : {userId: string} ){

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(StitchValidation) , 
        defaultValues: {
            stitch:'',
            accountId: userId
        }
    });

    const onSubmit = async(values: z.infer<typeof StitchValidation>)=>{
        await createStitch({ 
            text:values.stitch,
            author: userId,
            communityId: null,
            path: pathname


        });

        router.push('/');
    }

    return (
    <Form 
        {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-10 flex flex-col justify-start gap-10">
        <FormField
            control={form.control} 
            name="stitch"
            render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2  ">
                    Content
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1  ">
                    <Textarea
                        rows={15} 
                    {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" className="bg-primary-500" >
                Post Stitch
            </Button>

      </form>
    </Form>
    )

}

export default PostThread;