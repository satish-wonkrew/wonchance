import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // Ensure these components exist
import { Button } from "@/components/ui/button"; // Ensure this component exists// Ensure this component exists
import { format } from "date-fns";
import { Calendar, CalendarIcon } from "lucide-react";

const DatePicker = ({ selectedDates, onChange, formatString = "PPP", className }) => {
  const [dates, setDates] = useState(selectedDates);

  const handleDateSelect = (date) => {
    setDates(date);
    onChange(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-[280px] justify-start text-left font-normal ${
            !dates[0] ? "text-muted-foreground" : "text-primary"
          } ${className}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dates[0]
            ? `${format(dates[0], formatString)} - ${format(dates[1] || dates[0], formatString)}`
            : "Pick a date range"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={dates}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
