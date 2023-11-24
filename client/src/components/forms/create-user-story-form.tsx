import { UserStory, userStorySchema } from "@/lib/validation/user-story";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormItem, FormLabel, FormField, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormGroup } from "@/components/shared";
import {Icons} from "@/components/ui/icons";

interface CreateUserStoryFormProps {
    values?: UserStory;
    projectId: string;
    onSubmit: (values: UserStory) => void;
    buttonText: string;
}

export const CreateUserStoryForm: React.FC<CreateUserStoryFormProps> = ({values, onSubmit, buttonText, projectId}) => {
    const maxCharacters = 300;
    const form = useForm<UserStory>({
        resolver: zodResolver(userStorySchema),
        defaultValues: {
            name: "" || values?.name,
            description: "" || values?.description,
            acceptanceCriteria: "" || values?.acceptanceCriteria,
            estimationPoints: 0 || values?.estimationPoints,
        }
    });
    const descriptionValue = form.watch("description");

    const {handleSubmit, formState:{isSubmitting}} = form; 

    async function submitHandler(values: UserStory) {
        onSubmit(values);
    }

    return (
      <div>
        <Form {...form}>
          <form
            className="flex-col-center space-y-4"
            onSubmit={handleSubmit(submitHandler)}
          >
            <FormGroup>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        id="name"
                        disabled={isSubmitting}
                        placeholder="E.g. As a user, I want to..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="estimationPoints"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="estimationPoints">
                      Estimation Points
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        id="estimationPoints"
                        disabled={isSubmitting}
                        placeholder="E.g. 5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormGroup>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="description"
                      disabled={isSubmitting}
                      placeholder="Describe the user story in detail..."
                      maxLength={maxCharacters}
                    />
                  </FormControl>
                  <FormDescription>
                    {descriptionValue?.length || 0}/{maxCharacters} characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="acceptanceCriteria"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="acceptanceCriteria">
                    Acceptance Criteria
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="acceptanceCriteria"
                      disabled={isSubmitting}
                      placeholder="Describe the acceptance criteria in detail..."
                    />
                  </FormControl>
                  <FormDescription>
                    Separate each acceptance criteria with numbers or bullet.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-end">
              <Button
                asChild
                type="button"
                disabled={isSubmitting}
                variant={'secondary'}
                className="mr-4"
              >
                <Link to={`/projects/${projectId}`}>Cancel</Link>
              </Button>
              <Button type="submit" variant={'brand'} disabled={isSubmitting}>
                {buttonText}
                {isSubmitting && (
                  <Icons.spinner className="animate-spin ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
};