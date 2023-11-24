import { useParams } from "react-router-dom"
import { Heading, Typography } from "@/components/shared"
import { useGetUserStoryQuery } from "@/store/slices/user-story-api-slice"

const UserStoryByIdPage = () => {
    const {userStoryId} = useParams<{userStoryId: string}>();
    const {data: userStory, isLoading} = useGetUserStoryQuery(userStoryId, {skip: !userStoryId});

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    } else if(!isLoading && !userStory) {
        return (
            <div>User Story not found</div>
        )
    }
  return (
    <section className="h-full py-5">
      <div className="flex-col-center space-y-4 md:flex-row md:justify-between md:space-y-0 mb-10">
        <Heading className="text-xl md:text-2xl" level={2}>
          {userStory.name}
        </Heading>
        <Typography className="text-muted-foreground">
          {userStory.description}
        </Typography>
      </div>
      {/* Other data */}
    </section>
  );
}

export default UserStoryByIdPage