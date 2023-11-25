import { Comment } from "@/types";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

const commentSchema = z.object({
    text: z.string({required_error: "Comment is required"}).min(1, "Comment is required").max(500, "Comment cannot be longer than 500 characters")
});

export type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
    isEditing?: boolean;
    initialValues?: Comment;
    onSubmit: (data: CommentFormData) => void;
}


const CommentForm = ({initialValues, isEditing, onSubmit}: CommentFormProps) => {
    const form = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            text: initialValues?.text ?? "",
        }
    });

    const {formState: {isSubmitting}} = form;

    const handleSubmit = (values: CommentFormData) => {
        onSubmit(values);
    }

  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField 
                name="text"
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
                        {isEditing ? "Update" : "Add"}
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}

export default CommentForm