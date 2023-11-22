import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {format} from "date-fns";
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    className?: string;
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
}

export const DatePicker = ({className, date, setDate}: DatePickerProps) => {

    return (
      <div className={cn('grid gap-2', className)}>
        <Label htmlFor="date">Pick a start and end date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'justify-start text-left font-normal w-fukk mb-4',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick start and end date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-auto" align="end">
            <Calendar 
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={setDate}
            numberOfMonths={3}
            disabled={date?.from !== undefined && date?.to !== undefined}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
}