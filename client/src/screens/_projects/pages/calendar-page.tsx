/*
    This page is for the calendar page of the project
    We will be using the react-big-calendar package for this
    It will display the sprint dates and the tasks that are due on those dates
 */

import { Heading, Typography } from "@/components/shared"

const CalendarPage = () => {
  return (
    <section>
      <div>
        <Heading level={2}>Sprint Calendar</Heading>
        <Typography>
            Manage your project sprints here and add tasks to them.
        </Typography>
      </div>
      {/* Sprint dispplay */}
    </section>
  );
}

export default CalendarPage