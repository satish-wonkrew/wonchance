import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiCalendar } from "react-icons/fi";

const DOBPicker = ({ value, onDateChange }) => {
  const [date, setDate] = useState(value ? new Date(value) : null);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef();

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateChange = (selectedDate) => {
    if (selectedDate > new Date()) {
      alert("Future dates are not allowed");
    } else {
      setDate(selectedDate);
      onDateChange(selectedDate);
      setIsOpen(false);
    }
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return "";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    } else {
      setDate(null);
    }
  }, [value]);

  return (
    <div className="relative flex flex-col items-start space-y-3 font-serif w-full">
      <div className="relative w-full">
        <div
          className="flex items-center border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-600 transition duration-200 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 shadow-md"
          onClick={toggleCalendar}
          tabIndex={0} // Make it keyboard accessible
          onKeyPress={(e) => e.key === "Enter" && toggleCalendar()} // Handle enter key
        >
          <input
            type="text"
            readOnly
            value={formatDate(date)}
            placeholder="DD-MM-YYYY"
            className="w-full text-gray-700 placeholder-gray-500 focus:outline-none bg-transparent"
          />
          <FiCalendar className="text-blue-500 ml-2 transition-transform duration-200 transform hover:scale-110" />
        </div>

        {/* Calendar Popup */}
        {isOpen && (
          <div
            ref={calendarRef}
            className="absolute top-14 left-0 sm:left-auto sm:right-0 w-full sm:w-72 md:w-80 lg:w-96 z-20 bg-white rounded-xl shadow-lg p-5 border border-gray-200 transform scale-95 origin-top-left transition-transform duration-300 ease-out"
          >
            <div className="flex flex-col space-y-4">
              {/* Calendar for Day Selection */}
              <div className="transition-opacity duration-300 ease-in-out">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  maxDate={new Date()}
                  className="rounded-lg border border-gray-300 transition-transform duration-200 ease-in-out hover:scale-105"
                  minDetail="decade"
                  maxDetail="month"
                  showNeighboringMonth={false}
                  next2Label={null}
                  prev2Label={null}
                  tileClassName={({ date, view }) => {
                    if (view === "month") {
                      const isSelected = date.toDateString() === (date ? date.toDateString() : "").toString();
                      return isSelected ? 'bg-blue-500 text-slate-900 rounded-full' : '';
                    }
                    return '';
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DOBPicker;
