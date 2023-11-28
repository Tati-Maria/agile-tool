import { useGetProjectQuery } from '@/store/slices/project-api-slice';
import { useGetProjectAttachmentsQuery } from '@/store/slices/attachment-api-slice';
import { EmptyState, Loading } from '@/components/shared';
import { UploadAttachment } from '@/components/forms/upload';

const FileList = ({projectId}: {projectId: string}) => {
    const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(projectId);
    const { data: attachments, isLoading: isLoadingAttachments } = useGetProjectAttachmentsQuery(projectId);
    if(!project || !attachments) return null;

    if(isLoadingProject || isLoadingAttachments){
        return (
            <Loading />
        )
    }

  return (
    <div>
        {attachments.length === 0 ? (<EmptyState text="No attachments yet!" />) : (
            attachments.map(attachment => (
                <div key={attachment._id}>
                    <p>{attachment.name}</p>
                </div>
            ))
        )}
        <div>
            <UploadAttachment projectId={projectId} />
        </div>
    </div>
  )
}

export default FileList