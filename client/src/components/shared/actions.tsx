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
                <HiDotsVertical className='h-5 w-5' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
            <DropdownMenuItem>
                <HiOutlinePencilAlt className='h-4 w-4 mr-2' />
                <Link to={`${route}/update`}>Edit</Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
};

export default Actions;
