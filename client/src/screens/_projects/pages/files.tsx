import { useParams } from "react-router-dom"

const FilesPage = () => {
    const { projectId } = useParams<{ projectId: string }>();

    if(!projectId) return null;

  return (
    <div>FilesPage</div>
  )
}

export default FilesPage