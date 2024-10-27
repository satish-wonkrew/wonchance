import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCastingCallsByCompany } from "@/redux/slices/castingSlice";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@radix-ui/react-select";
import { CreateCastingCall } from "../components/forms/Casting/CreateCasting";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <Card
        key={index}
        className="animate-pulse bg-gray-200 rounded-lg shadow-md"
      >
        <CardHeader className="p-4">
          <CardTitle className="bg-gray-300 h-6 w-1/2 rounded"></CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="bg-gray-300 h-4 w-3/4 rounded mb-2"></p>
          <p className="bg-gray-300 h-4 w-full rounded"></p>
        </CardContent>
        <CardFooter className="p-4">
          <Button className="bg-gray-400 text-white w-full" disabled>
            View Details
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
);

const CastingsList = () => {
  const dispatch = useDispatch();
  const { castings, status, error } = useSelector((state) => state.castings);

  const [sortBy, setSortBy] = useState("date");
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCastingCallsByCompany());
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
    toast.error(error?.message || "An error occurred");
    return null;
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
          <Select value={sortBy} onValueChange={handleSortChange} className="w-40">
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </Select>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white"
          >
            Create Casting Call
          </Button>
        </div>
      </div>
      {sortedCastings.length > 0 ? (
        sortedCastings.map((casting) => (
          <Card
            key={casting._id}
            className="shadow-md hover:shadow-lg w-max transition-shadow duration-300 p-4"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {casting.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">
                Date: {format(new Date(casting.castingDate), "PPP")}
              </p>
              <p className="text-gray-600 mb-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    casting.status === "Pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {casting.status}
                </span>
              </p>
              <p className="text-gray-600 mb-2">
                Role Name: {casting.role.roleName}
              </p>
              <p className="text-gray-600 mb-2">Mode: {casting.mode}</p>
              <p className="text-gray-600 mb-2">Location: {casting.location}</p>
              <p className="text-gray-600 mb-2">
                Casting Call Count: {casting.castingCallCount}
              </p>
              <p className="text-gray-600 mb-2">
                Expiry Date: {format(new Date(casting.expiryDate), "PPP")}
              </p>
              <p className="text-gray-600 mb-2">
                Openings: {casting.role.noOfOpenings}
              </p>
              <p className="text-gray-600 mb-2">
                Closed Openings: {casting.role.openingsClosed}
              </p>
              <p className="text-gray-600 mb-2">
                Shoot Dates: {casting.role.noOfShootDate}
              </p>
              <p className="text-gray-600 mb-2">Notes: {casting.notes}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  /* Handle View Details */
                  /* Open the Casting Details Modal */
                }}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500">No casting calls available.</p>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Create New Casting Call</h3>
            <CreateCastingCall />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastingsList;
