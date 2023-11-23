import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {FormControl} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import {format} from "date-fns";
import {BsCalendar3} from "react-icons/bs";

interface PickADateProps {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    className?: string;
}

export const PickADate = ({value, onChange, className}: PickADateProps) => {
    return (
      <div className={cn(className)}>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                className={cn(
                  'pl-3 font-normal w-full',
                  !value && 'text-muted-foreground'
                )}
                variant={'outline'}
              >
                {value ? (
                  format(value, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <BsCalendar3 className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar 
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={date => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
}