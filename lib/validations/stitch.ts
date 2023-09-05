import * as z from 'zod';

export const StitchValidation = z.object({
    stitch: z.string().nonempty().min(3, {message: "Minimum 3 characters"}),
    accountId: z.string()
})

export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, {message: "Minimum 3 characters"}),   
})