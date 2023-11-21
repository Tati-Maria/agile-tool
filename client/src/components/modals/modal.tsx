import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ModalProps {
    children?: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    description?: string;
}

export const Modal: React.FC<ModalProps> = ({children, title, description, onClose, isOpen}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="relative">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}