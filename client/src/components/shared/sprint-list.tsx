import { useState } from 'react';
import { Heading } from '.';
import { Button } from '../ui/button';
import SprintModal from '../modals/sprint-modal';

interface SprintListProps {
  projectId: string;
}

const SprintList = ({ projectId }: SprintListProps) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {isOpen && (
      <SprintModal 
      projectId={projectId}
      isOpen={isOpen}
      isClose={() => setIsOpen(false)}
      />
    )}
      <section>
        <div className="flex-between">
          <Heading level={2}>Sprints</Heading>
          <Button onClick={() => setIsOpen(true)}>
            <span className="hidden md:block">Create Sprint</span>
            <span className="md:hidden">+</span>
          </Button>
        </div>
        {/* DIspplay current active sprint */}
      </section>
    </>
  );
};

export default SprintList;
