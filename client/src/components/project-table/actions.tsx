import { HiDotsHorizontal } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  useDeleteProjectMutation,
  useMakeProjectActiveOrInactiveMutation,
} from '@/store/slices/project-api-slice';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteModal from '@/components/modals/delete-modal';

interface ActionsProps {
  data: string;
  isActive?: boolean;
}

export default function ProjectRowActions({ data, isActive }: ActionsProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();
  const [makeProjectActiveOrInactive, { isLoading: isPending }] =
    useMakeProjectActiveOrInactiveMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteProject(data).unwrap();
      toast.success(res.message);
      navigate('/projects');
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  //handle make project active or inactive
  const handleActiveOrInactive = async () => {
    try {
      const res = await makeProjectActiveOrInactive(data).unwrap();
      toast.success(res.message);
      navigate('/projects');
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  return (
    <>
      {openModal && (
        <DeleteModal
          title={`Delelte Project`}
          description="Are you sure you want to delete this project?"
          onCancel={() => setOpenModal(false)}
          onConfirm={handleDelete}
          isLoading={isLoading}
          isOpen={openModal}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <HiDotsHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>
            <Link to={`/projects/${data}`}>View</Link>
          </DropdownMenuItem>
          {user?.role === 'Product Owner' && (
            <>
              <DropdownMenuItem>
                <Link to={`/projects/${data}/update`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleActiveOrInactive}
                disabled={isPending}
              >
                {isActive ? 'Make Inactive' : 'Make Active'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
