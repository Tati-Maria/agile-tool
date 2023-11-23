import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Typography } from "../shared";

interface UserStoryCardProps {
    description: string | null;
    points: number;
    name: string;
    id: string;
}

const UserStoryCard = ({description, points, name, id}: UserStoryCardProps) => {
  return (
    <div className="flex-col-center border border-dashed py-2 px-4 rounded-lg space-y-1">
        <div className="flex-between">
            <Link className="text-lg font-bold" to={`/user-stories/${id}`}>
                {name}
            </Link>
            <Button className="p-0" variant={"ghost"} size={"icon"}>
                <MoreHorizontal className="w-6 h-6" />
            </Button>
        </div>
        <Typography>
            {description || "No description"}
        </Typography>
        <span className="text-xs font-bold text-blue-600 py-2">
            Points {points}
        </span>
    </div>
  )
}

export default UserStoryCard