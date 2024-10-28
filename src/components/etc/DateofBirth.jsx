import { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FiCalendar } from 'react-icons/fi';

const DOBPicker = ({ value, onDateChange }) => {
  const [date, setDate] = useState(value ? new Date(value) : null);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef();

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateChange = (selectedDate) => {
    if (selectedDate > new Date()) {
      alert('Future dates are not allowed');
    } else {
      setDate(selectedDate);
      onDateChange(selectedDate);
      setIsOpen(false);
    }
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return '';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    } else {
      setDate(null);
    }
  }, [value]);

  return (
    <div className="relative flex flex-col items-start space-y-3 font-serif">
      <div className="relative w-full">
        <div
          className="flex items-center border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:border-blue-600 transition duration-200 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 shadow-md"
          onClick={toggleCalendar}
        >
          <input
            type="text"
            readOnly
            value={formatDate(date)}
            placeholder="DD-MM-YYYY"
            className="w-full text-gray-700 placeholder-gray-500 focus:outline-none bg-transparent"
          />
          <FiCalendar className="text-blue-500 ml-2 transition-transform duration-200 transform hover:scale-125" />
        </div>

        {isOpen && (
          <div
            ref={calendarRef}
            className="absolute mt-2 z-20 bg-white rounded-lg shadow-xl p-5 border border-gray-200 transform scale-95 origin-top-left transition-transform duration-300 ease-out"
          >
            <div className="flex flex-col space-y-4">
              {/* Year Dropdown */}
              <div className="flex items-center justify-between">
                <label htmlFor="year" className="text-gray-700">Year:</label>
                <select
                  id="year"
                  value={date ? date.getFullYear() : ''}
                  onChange={(e) => {
                    const newYear = Number(e.target.value);
                    const newDate = new Date(newYear, date.getMonth(), date.getDate());
                    setDate(newDate);
                  }}
                  className="border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:border-blue-500"
                >
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Month Dropdown */}
              <div className="flex items-center justify-between">
                <label htmlFor="month" className="text-gray-700">Month:</label>
                <select
                  id="month"
                  value={date ? date.getMonth() + 1 : ''}
                  onChange={(e) => {
                    const newMonth = Number(e.target.value) - 1;
                    const newDate = new Date(date.getFullYear(), newMonth, date.getDate());
                    setDate(newDate);
                  }}
                  className="border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:border-blue-500"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                  ))}
                </select>
              </div>

              {/* Calendar for Day Selection */}
              <div className="transition-opacity duration-300 ease-in-out">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  maxDate={new Date()}
                  className="react-calendar rounded-lg border border-gray-300 transition-transform duration-200 ease-in-out hover:scale-105"
                  minDetail="decade"
                  maxDetail="month"
                  showNeighboringMonth={false}
                  next2Label={null}
                  prev2Label={null}
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
