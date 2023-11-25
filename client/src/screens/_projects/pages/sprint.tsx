import { useParams} from "react-router-dom"
import { useGetSprintByIdQuery } from "@/store/slices/sprint-api-slice"
import { EmptyState, Loading } from "@/components/shared";
import SprintCard from "@/components/cards/sprint-card";

const Sprint = () => {
    const { sprintId } = useParams<{sprintId: string}>();
    const {data: sprint, isLoading} = useGetSprintByIdQuery(sprintId as string, {skip: !sprintId});


  return (
    <section className="h-full py-5">
        {isLoading && <Loading />}
        {!isLoading && !sprint && <EmptyState text="No sprint found" />}
        {!isLoading && sprint && (
            <SprintCard 
            sprint={sprint} />
        )}
    </section>
  )
}

export default Sprint