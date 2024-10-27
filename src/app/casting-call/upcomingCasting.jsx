"use client";
import { BreadcrumbSection } from "@/components/etc/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fetchUpcomingCastings } from "@/redux/slices/castingSlice";
import { GridIcon, ListIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const UpcomingCastings = () => {
  const dispatch = useDispatch();
  const { upcomingCastings, status, error } = useSelector(
    (state) => state.castings
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUpcomingCastings());
    }
  }, [dispatch, status]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearch = () => {
    // Implement search functionality here
  };
  const toggleViewMode = (mode) => setViewMode(mode);
  const handleViewDetails = (id) => {
    // Implement view details functionality here
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  let sortedCastings = [...upcomingCastings];
  if (sortBy === "title") {
    sortedCastings.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "role") {
    sortedCastings.sort((a, b) => a.role?.localeCompare(b.role));
  } else if (sortBy === "location") {
    sortedCastings.sort((a, b) => a.location.localeCompare(b.location));
  }

  return (
    <div className="casting-call-page container mx-auto p-4 bg-primary-forground dark:bg-dark-primary-forground">
      {/* Hero Section */}
      <header className="hero-section bg-gradient-to-r from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 flex flex-col md:flex-row items-center justify-between p-4 md:p-8 h-auto md:h-80 rounded-lg shadow-lg mb-8">
        <motion.h1
          className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Casting Calls
        </motion.h1>
        <motion.img
          src="/Img/CastingHero.png"
          alt="Hero Image"
          className="w-full md:w-auto h-auto max-w-xs md:max-w-none md:max-h-80 md:mr-8 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </header>

      <BreadcrumbSection />

      <section>
        {/* Search Bar */}
        <div className="search-bar flex flex-col md:flex-row items-center mb-6 md:mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search by title, role, or location"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 flex items-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M16 13C16 11.8954 14.8954 11 13 11C11.1046 11 10 11.8954 10 13V17C10 18.1046 11.1046 19 13 19C14.8954 19 16 18.1046 16 17V13ZM13 21C14.6569 21 16 19.6569 16 18C16 16.3431 14.6569 15 13 15C11.3431 15 10 16.3431 10 18C10 19.6569 11.3431 21 13 21C14.6569 21 16 19.6569 16 18C16 16.3431 14.6569 15 13 15Z" />
            </svg>
            <Label>Search</Label>
          </button>
        </div>
      </section>

      {/* Casting Calls Count Row */}
      <section className="casting-call-count-row flex flex-col md:flex-row justify-between items-center mb-8 bg-neutral-500 dark:bg-neutral-700 p-2 rounded-md shadow-lg">
        <motion.p
          className="text-black dark:text-white text-lg font-semibold mb-2 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Total Casting Calls Found: {upcomingCastings.length}
        </motion.p>

        {/* View Mode Toggle Buttons */}
        <div className="flex flex-wrap md:space-x-4 space-y-2 md:space-y-0">
          <Button
            onClick={() => toggleViewMode("grid")}
            disabled={viewMode === "grid"}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              viewMode === "grid"
                ? "bg-white dark:bg-gray-800 text-black dark:text-white border border-black dark:border-gray-600"
                : "bg-zinc-800 text-blue-500"
            }`}
          >
            <GridIcon className="w-4 h-4" />
            <Label className="hidden md:inline">Grid</Label>
          </Button>
          <Button
            onClick={() => toggleViewMode("row")}
            disabled={viewMode === "row"}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              viewMode === "row"
                ? "bg-white dark:bg-gray-800 text-black dark:text-white border border-black dark:border-gray-600"
                : "bg-zinc-800 text-white hover:bg-gray-400"
            }`}
          >
            <ListIcon className="w-4 h-4" />
            <Label className="hidden md:inline">List</Label>
          </Button>

          {/* Sorting Options */}
          <div className="sort-options flex items-center space-x-2 mt-2 md:mt-0">
            <label htmlFor="sort-by" className="sr-only">
              Sort By
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600 text-black dark:text-white bg-white dark:bg-gray-800"
            >
              <option value="recent">Sort by Recently updated</option>
              <option value="title">Sort by Title</option>
              <option value="role">Sort by Role</option>
              <option value="location">Sort by Location</option>
            </select>
            <Label className="text-gray-500 dark:text-gray-400">Sort</Label>
          </div>
        </div>
      </section>

      {/* Casting Call List Section */}
      <section
        className={`casting-call-list ${
          viewMode === "grid"
            ? "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {sortedCastings.map((castingCall) => (
          <motion.div
            key={castingCall._id}
            className={`casting-call-card bg-primary-foreground dark:bg-primary-foreground p-4 rounded-lg shadow-lg my-3 ${
              viewMode === "row"
                ? "flex flex-col sm:flex-row items-center shadow-lg"
                : "flex flex-col"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Casting Call Image */}
            <div
              className={`${
                viewMode === "row" ? "w-32 h-32" : "w-full h-60"
              } bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden mb-4 sm:mb-0 flex items-center justify-center`}
            >
              <img
                src={castingCall.imageUrl || "https://via.placeholder.com/150"}
                alt={castingCall.title || "Casting Call Image"}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Casting Call Details */}
            <div
              className={`${
                viewMode === "row" ? "flex-grow sm:ml-6 mt-4 sm:mt-0" : ""
              }`}
            >
              <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                {castingCall.title || "Casting Call Title"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <strong>Role:</strong> {castingCall.roleName || "N/A"}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Location:</strong> {castingCall.location || "N/A"}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Dates:</strong> {castingCall.dates || "N/A"}
              </p>
              <Button
                onClick={() => handleViewDetails(castingCall._id)}
                className="mt-4 bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-800 hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                View Details
              </Button>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default UpcomingCastings;
