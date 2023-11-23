import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Modal } from "@/components/modals/modal";

interface AlertDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  title: string;
  description: string;
  isLoading: boolean;
}

const DeleteModal = ({
    onConfirm,
    onCancel,
    isOpen,
    title,
    description,
    isLoading,
}: AlertDeleteProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      description={description}
      title={title}
    >
      <div className="flex justify-end items-center w-full gap-x-4">
        <Button disabled={isLoading} variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Delete
          {isLoading && <Icons.spinner className="animate-spin ml-2 h-4 w-4" />}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
