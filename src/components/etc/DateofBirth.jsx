import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiCalendar, FiXCircle } from "react-icons/fi";
import { format, parse } from "date-fns";
import { enUS, fr, es } from "date-fns/locale"; // Add more locales if needed

const AdvancedDatePicker = ({ value, onDateChange, locale = enUS, dateFormat = "dd-MM-yyyy" }) => {
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value ? format(new Date(value), dateFormat, { locale }) : "");
  const calendarRef = useRef();

  const toggleCalendar = () => setIsOpen((prev) => !prev);

  // Helper function to create a date without timezone offset
  const createDateWithoutOffset = (year, month, day) => {
    return new Date(Date.UTC(year, month - 1, day)); // month is 0-indexed
  };

  // Handle input change for manual date entry
  const handleInputChange = (e) => {
    const dateStr = e.target.value;
    setInputValue(dateStr);

    const parsedDate = parse(dateStr, dateFormat, new Date(), { locale });
    if (parsedDate && parsedDate <= new Date()) {
      const utcDate = createDateWithoutOffset(
        parsedDate.getFullYear(),
        parsedDate.getMonth() + 1,
        parsedDate.getDate()
      );
      setSelectedDate(utcDate);
      onDateChange(utcDate);
    }
  };

  // Handle date selection from calendar
  const handleDateChange = (date) => {
    if (date > new Date()) {
      alert("Future dates are not allowed");
    } else {
      const utcDate = createDateWithoutOffset(date.getFullYear(), date.getMonth() + 1, date.getDate());
      setSelectedDate(utcDate);
      setInputValue(format(utcDate, dateFormat, { locale }));
      onDateChange(utcDate);
      setIsOpen(false);
    }
  };

  // Handle outside click to close the calendar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update selectedDate when value prop changes
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setInputValue(format(date, dateFormat, { locale }));
    }
  }, [value, dateFormat, locale]);

  return (
    <div className="relative w-full font-serif">
      <div className="relative">
        {/* Input Field */}
        <div
          className="flex items-center border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500 shadow-md transition"
          onClick={toggleCalendar}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleCalendar()}
        >
          <input
            type="text"
            value={inputValue}
            placeholder={format(new Date(), dateFormat, { locale })}
            onChange={handleInputChange}
            className="w-full text-gray-700 placeholder-gray-500 focus:outline-none bg-transparent"
          />
          <FiCalendar className="text-blue-500 ml-2 transition-transform transform hover:scale-110" />
          {inputValue && (
            <FiXCircle
              className="text-red-500 ml-2 cursor-pointer hover:text-red-700"
              onClick={() => {
                setSelectedDate(null);
                setInputValue("");
                onDateChange(null);
              }}
            />
          )}
        </div>

        {/* Calendar Popup */}
        {isOpen && (
          <div
            ref={calendarRef}
            className="absolute top-14 left-0 sm:left-auto sm:right-0 w-full sm:w-72 md:w-80 lg:w-96 z-20 bg-white rounded-xl shadow-lg p-5 border border-gray-200 transform scale-95 origin-top-left transition-transform duration-300 ease-out"
          >
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              maxDate={new Date()}
              locale={locale}
              className="rounded-lg border border-gray-300"
              minDetail="decade"
              maxDetail="month"
              showNeighboringMonth={false}
              next2Label={null}
              prev2Label={null}
              tileClassName={({ date, view }) =>
                view === "month" && date.toDateString() === selectedDate?.toDateString()
                  ? "bg-blue-500 text-white rounded-full"
                  : ""
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedDatePicker;
