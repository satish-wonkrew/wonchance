import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCastingCallsByProjectId } from "@/redux/slices/castingSlice";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";
import { CreateCastingCall } from "../components/forms/Casting/CreateCasting";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="animate-pulse bg-gray-200 rounded-lg shadow-lg p-6 space-y-4"
      >
        <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-300 h-4 w-full rounded"></div>
        <div className="bg-gray-300 h-10 w-full rounded"></div>
      </div>
    ))}
  </div>
);

const CastingCalls = () => {

  const dispatch = useDispatch();
  const { castings, status, error } = useSelector((state) => state.castings);

  const [sortBy, setSortBy] = useState("date");
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCastingCallsByProjectId());
  }, [dispatch]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };
  const sortedCastings = [...castings]
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.castingDate) - new Date(a.castingDate);
      }
      return a.title.localeCompare(b.title);
    })
    .filter((casting) =>
      casting.title.toLowerCase().includes(filterText.toLowerCase())
    );

  if (status === "loading") {
    return <SkeletonLoader />;
  }

  if (status === "failed") {
    // toast.error(error?.message || "An error occurred");
    // return <p>Error: {error?.message || "An unknown error occurred."}</p>;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Casting Calls</h1>
        <div className="flex space-x-4">
          <Input
            type="text"
            placeholder="Filter by title..."
            value={filterText}
            onChange={handleFilterChange}
            className="w-64"
          />
          <Select
            value={sortBy}
            onValueChange={handleSortChange}
            className="w-40 border border-gray-300 rounded-md"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </Select>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Create Casting Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCastings.length > 0 ? (
          sortedCastings.map((casting) => (
            <Card
              key={casting._id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white p-6"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                  {casting.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-2">
                  Date: {format(new Date(casting.castingDate), "PPP")}
                </p>
                <p className="text-gray-500 mb-2">
                  Role:{" "}
                  <span className="font-medium">{casting.role?.roleName}</span>
                </p>
                <p className="text-gray-500 mb-2">
                  Location: {casting.location}
                </p>
                <p className="text-gray-500 mb-2">
                  Description: {casting.description}
                </p>
              </CardContent>
              <CardFooter className="mt-4">
                <Button
                  variant="outline"
                  className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition-colors duration-300"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No casting calls found.
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <h3 className="text-xl font-semibold mb-4">
              Create New Casting Call
            </h3>
            <CreateCastingCall />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastingCalls;
