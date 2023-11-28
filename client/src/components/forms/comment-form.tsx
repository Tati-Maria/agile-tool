import { useForm } from "react-hook-form";
import { useCreateCommentMutation } from "@/store/slices/comment-api-slice";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";

const commentSchema = z.object({
    content: z.string({required_error: "Comment is required"}).min(1, "Comment is required").max(500, "Comment cannot be longer than 500 characters")
});

export type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
    taskId: string;
}


const CommentForm = ({taskId}: CommentFormProps) => {
    const form = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
        }
    });

    const {formState: {isSubmitting}} = form;

    const [createComment, {isLoading}] = useCreateCommentMutation();
    const handleSubmit = async (formData: CommentFormData) => {
        try {
            const res = await createComment({
                task: taskId,
                content: formData.content
            }).unwrap();
            toast.success(res.message);
        } catch (error) {
            const err = error as {message: string};
            toast.error(err.message)
        }
    }

  return (
    <div>
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField 
                name="content"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Textarea 
                            {...field}
                            placeholder="Add a comment"
                            rows={3}
                            disabled={isSubmitting}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                        Comment
                        {isLoading && "ing..."}
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default CommentForm