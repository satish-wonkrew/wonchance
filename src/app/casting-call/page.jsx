"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdatedCastings } from "@/redux/slices/castingSlice";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import { Bookmark, GridIcon, ListIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input"; // Import the components
import RemoveBookmarkButton from "@/components/etc/RemoveBookmarkButton";
import AddBookmarkButton from "@/components/etc/AddBookmarkButton";
import { fetchBookmarks } from "@/redux/slices/bookmarksSlice";
import BookmarkButton from "@/components/etc/AddBookmarkButton";

const CastingCall = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { updatedCastings, status, error } = useSelector(
    (state) => state.castings
  );
  const { bookmarks = [] } = useSelector((state) => state.bookmarks); // Get the bookmarks from state
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterMode, setFilterMode] = useState(""); // "online" or "offline"
  const [filterCastingDate, setFilterCastingDate] = useState("");
  const [filterId, setFilterId] = useState("");
  const [filterMinAge, setFilterMinAge] = useState(""); // Minimum age
  const [filterMaxAge, setFilterMaxAge] = useState(""); // Maximum age
  const [filteredCastings, setFilteredCastings] = useState([]);
  const [sortBy, setSortBy] = useState(""); // Sort criteria
  const [sortOrder, setSortOrder] = useState("asc"); // Ascending or Descending

  useEffect(() => {
    dispatch(fetchUpdatedCastings());
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBookmarks());
    }
  }, [dispatch, status]);
  useEffect(() => {
    if (status === "succeeded") {
      const filterCastings = updatedCastings
        .filter((casting) => {
          const term = searchTerm.toLowerCase();
          return (
            casting.title?.toLowerCase().includes(term) ||
            casting.role?.roleName?.toLowerCase().includes(term) ||
            casting.location?.toLowerCase().includes(term) ||
            casting.role?.gender?.toLowerCase().includes(term) ||
            casting.role?.skinTone?.toLowerCase().includes(term) ||
            casting.role?.bodyType?.toLowerCase().includes(term) ||
            casting.wccId?.toLowerCase().includes(term)
          );
        })
        .filter((casting) =>
          filterMode
            ? casting.mode?.toLowerCase() === filterMode.toLowerCase()
            : true
        )
        .filter((casting) =>
          filterCastingDate
            ? new Date(casting.castingDate).toISOString().split("T")[0] ===
              filterCastingDate
            : true
        )
        .filter((casting) =>
          filterId
            ? casting.wccId?.toLowerCase().includes(filterId.toLowerCase())
            : true
        )
        .filter((casting) => {
          if (filterMinAge && filterMaxAge) {
            const roleMinAge = casting.role?.ageRange?.minAge ?? 0;
            const roleMaxAge = casting.role?.ageRange?.maxAge ?? 100;
            return roleMinAge >= filterMinAge && roleMaxAge <= filterMaxAge;
          }
          return true;
        });

      const sortCastings = (criteria) => {
        const sorted = [...filterCastings].sort((a, b) => {
          switch (criteria) {
            case "name":
              return a.title?.localeCompare(b.title);
            case "location":
              return a.location?.localeCompare(b.location);
            case "date":
              return new Date(b.castingDate) - new Date(a.castingDate);
            case "updatedAt":
              return new Date(b.updatedAt) - new Date(a.updatedAt);
            case "createdAt":
              return new Date(b.createdAt) - new Date(a.createdAt);
            default:
              return 0;
          }
        });

        if (sortOrder === "desc") {
          sorted.reverse();
        }

        setFilteredCastings(sorted);
      };

      sortCastings(sortBy);
    }
  }, [
    status,
    updatedCastings,
    searchTerm,
    filterMode,
    filterCastingDate,
    filterId,
    filterMinAge,
    filterMaxAge,
    sortBy,
    sortOrder,
  ]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterModeChange = (e) => setFilterMode(e.target.value);
  const handleFilterCastingDateChange = (e) =>
    setFilterCastingDate(e.target.value);
  const handleFilterIdChange = (e) => setFilterId(e.target.value);
  const handleFilterMinAgeChange = (e) => setFilterMinAge(e.target.value);
  const handleFilterMaxAgeChange = (e) => setFilterMaxAge(e.target.value);
  const handleSortByChange = (e) => setSortBy(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const toggleAdvancedFilters = () =>
    setShowAdvancedFilters(!showAdvancedFilters);

  const handleViewProfile = (wccId) => {
    router.push(`/casting-call/${wccId}`);
  };

  const toggleViewMode = (mode) => setViewMode(mode);

  if (status === "loading") return <Spinner className="text-center" />;
  if (status === "failed")
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4 bg-primary-foreground dark:bg-dark-primary-foreground">
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
          src="/Img/TalentHero.png"
          alt="Hero Image"
          className="w-full md:w-auto h-auto max-w-xs md:max-w-none md:max-h-80 md:mr-8 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </header>

      {/* Search Bar and Filtering Options */}
      <section className="search-bar-and-options mb-8">
        <div className="search-bar flex flex-col md:flex-row items-center mb-6 md:mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search (title, role, location, gender, skin tone, body type, ID)"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <Button onClick={toggleAdvancedFilters}>
              {showAdvancedFilters
                ? "Hide Advanced Filters"
                : "Show Advanced Filters"}
            </Button>
          </div>
        </div>

        {/* Sorting Options */}
        

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="flex flex-col md:flex-row items-center mb-6 md:mb-8 gap-4 md:gap-6">
            <select onChange={handleFilterModeChange} value={filterMode} className="border rounded-md p-2">
              <option value="">Select Mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            <Input
              type="date"
              placeholder="Casting Date"
              onChange={handleFilterCastingDateChange}
              className="border rounded-md p-2"
            />
            <Input
              type="text"
              placeholder="ID"
              onChange={handleFilterIdChange}
              className="border rounded-md p-2"
            />
            <Input
              type="number"
              placeholder="Min Age"
              onChange={handleFilterMinAgeChange}
              className="border rounded-md p-2"
            />
            <Input
              type="number"
              placeholder="Max Age"
              onChange={handleFilterMaxAgeChange}
              className="border rounded-md p-2"
            />
            <select onChange={handleSortByChange} value={sortBy} className="border rounded-md p-2">
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="location">Location</option>
              <option value="date">Date</option>
              <option value="updatedAt">Updated At</option>
              <option value="createdAt">Created At</option>
            </select>
            <select onChange={handleSortOrderChange} value={sortOrder} className="border rounded-md p-2">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        )}
      </section>

      {/* Casting Calls List */}
      <section
        className={`casting-list  ${
          viewMode === "grid"
            ? "grid gap-6 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1 "
        }`}
      >
        {filteredCastings.map((casting) => (
          <motion.div
            key={casting._id}
            className={`casting-card ${
              viewMode === "row"
                ? "flex flex-col sm:flex-row items-stretch p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-200 dark:border-gray-700"
                : "flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 h-80 w-full sm:w-72"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Casting Details */}
            <div className={`flex-grow ${viewMode === "row" ? "sm:ml-6 " : "flex flex-col justify-evenly"}`}>
              <div className="flex flex-row justify-between">
                <p className="font-semibold mb-2 text-black dark:text-white truncate">
                  <strong>Casting Name:</strong> <br />
                  {casting.title || "Casting Title"}
                </p>
                {/* Bookmark buttons */}
                <BookmarkButton roleId={casting._id} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <strong>ID:</strong> {casting.wccId || "N/A"}
              </p>
              {/* <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Role:</strong>{" "}
                {casting.role?.roleName || "Unknown Role"}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Description:</strong>{" "}
                {casting.role?.description || "No description"}
              </p> */}
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Casting Date:</strong>{" "}
                {new Date(casting.castingDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Expiry Date:</strong>{" "}
                {new Date(casting.expiryDate).toLocaleDateString()}
              </p>
              <Button
                onClick={() => handleViewProfile(casting.wccId)}
                className={`casting-list ${
                  viewMode === "grid" ? "w-full" : "grid-cols-1"
                }`}
              >
                View & Apply
              </Button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* View Mode Toggle */}
      {/* <div className="view-mode-toggle flex justify-center space-x-4 mt-6">
        <Button
          onClick={() => toggleViewMode("grid")}
          className={`px-4 py-2 rounded-md border ${
            viewMode === "grid"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          } hover:bg-blue-600 hover:text-white`}
        >
          <GridIcon className="mr-2" /> Grid
        </Button>
        <Button
          onClick={() => toggleViewMode("list")}
          className={`px-4 py-2 rounded-md border ${
            viewMode === "list"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          } hover:bg-blue-600 hover:text-white`}
        >
          <ListIcon className="mr-2" /> List
        </Button>
      </div> */}
    </div>
  );
};

export default CastingCall;
