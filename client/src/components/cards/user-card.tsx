import { User } from "@/types"
import { HiOutlineDotsVertical } from 'react-icons/hi';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { Typography } from "@/components/shared";

interface UserCardProps {
    user: User;
}

const UserCard = ({user}: UserCardProps) => {
  return (
    <div className="relative border py-5 rounded-lg">
        <button className="absolute top-0 right-0 pt-3 px-2">
            <HiOutlineDotsVertical className="w-6 h-6 hover:text-indigo-600" />
        </button>
        <div className="flex items-center justify-center flex-col gap-1">
            <Avatar className="h-14 w-14">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <Typography>
                {user.name}
            </Typography>
            <Typography className="text-muted-foreground text-xs">
                {user.email}
            </Typography>
            <Typography className="font-medium text-indigo-600 dark:text-indigo-200">
                {user.role}
            </Typography>
        </div>
    </div>
  )
}

export default UserCard