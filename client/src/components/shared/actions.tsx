import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HiDotsVertical, HiOutlinePencilAlt } from 'react-icons/hi';

interface ActionsProps {
    route: string;
}

const Actions = ({route}: ActionsProps) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className='p-0'>
                <HiDotsVertical className='h-4 w-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuContent>
            <DropdownMenuItem>
                <HiOutlinePencilAlt className='h-4 w-4 mr-2' />
                <Link to={`${route}/edit`}>Edit</Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
};

export default Actions;
