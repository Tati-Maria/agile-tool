import { Heading, Typography, EmptyState, Loading } from "@/components/shared"

import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "@/store/slices/project-api-slice";
import UserCard from "@/components/cards/user-card";
import { User } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import { useSetDocumentTitle } from "@/hooks/user-document-title";



const MembersPage = () => {
    useSetDocumentTitle("Members");
    const {user} = useAuth();
    const { projectId } = useParams<{projectId: string}>();
    const { data: project, isLoading } = useGetProjectQuery(projectId, {skip: !projectId});
    const projectMembers = project?.team
    


  return (
    <section className="py-6">
      <div className="mb-10 space-y-1">
        <Heading className="text-xl md:text-2xl" level={2}>Members</Heading>
        <Typography className="text-muted-foreground">
            {user?.role === "Product Owner" ? "Manage your team members" : "View your team members"}
        </Typography>
        <Typography className="text-muted-foreground">
            {projectMembers?.length} {projectMembers?.length === 1 ? 'member' : 'members'}
        </Typography>
      </div>
      {isLoading && <Loading />}
      {!isLoading && !projectMembers && (<EmptyState text="No members found" />)}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {projectMembers?.map((member: User) => (
            <UserCard 
            user={member}
            key={member._id}
            />
        ))}
      </ul>
    </section>
  );
}

export default MembersPage