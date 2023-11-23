import { UserStory } from '@/types';
import Slider from 'react-slick';
import { CiCirclePlus } from 'react-icons/ci';
import { EmptyState, Loading } from '@/components/shared';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserStoryModal } from '@/components/modals/user-story-modal';
import { useGetProjectUserStoriesQuery } from '@/store/slices/user-story-api-slice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserStoryCard from '../cards/user-story-card';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }
  ]
};

interface UserStoryListProps {
  projectId?: string;
}

const UserStoryList = ({ projectId }: UserStoryListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userStoriesData, isLoading } = useGetProjectUserStoriesQuery(
    projectId,
    { skip: !projectId }
  );

  return (
    <>
      {isOpen && (
        <UserStoryModal
          projectId={projectId}
          isOpen={isOpen}
          isClose={() => setIsOpen(false)}
        />
      )}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">User Stories</h3>
        <Button variant={"ghost"} onClick={() => setIsOpen(true)}>
          <CiCirclePlus className="w-6 h-6" />
        </Button>
      </div>
      <Slider {...settings}>
        {isLoading ? (
          <Loading />
        ) : userStoriesData?.userStories?.length ? (
          userStoriesData?.userStories?.map((userStory: UserStory) => (
            <UserStoryCard
              id={userStory._id}
              key={userStory._id}
              description={userStory.description}
              points={userStory.estimationPoints}
              name={userStory.name}
            />
          ))
        ) : (
          <EmptyState text="No user stories" />
        )}
      </Slider>
    </>
  );
};

export default UserStoryList;
