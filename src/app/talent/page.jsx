/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchApprovedUsers } from "@/redux/slices/talentSlice";
import { motion } from "framer-motion";
import Spinner from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ClockIcon,
  GridIcon,
  ListIcon,
  SortAscIcon,
  StarIcon,
} from "lucide-react";
import { BreadcrumbSection } from "@/components/etc/Breadcrumb";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/loading";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { IMAGE_API_END_POINT } from "@/utils/constant";

const TalentPage = () => {
  const User = useUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    users: talents,
    status: loadingStatus,
    error,
  } = useSelector((state) => state.talent);

  const [viewMode, setViewMode] = useState("grid");
  const [authError, setAuthError] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("rating");
  const [showContent, setShowContent] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [filters, setFilters] = useState({
    location: talents.map((talent) => talent.location),
    ageRange: talents.map((talent) => talent.ageRange),
    experienceLevel: talents.map((talent) => talent.experienceLevel),
    wctId: talents.map((talent) => talent.wctId),
  });

  const [advancedSearchVisible, setAdvancedSearchVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setAuthenticated(true);
          dispatch(fetchApprovedUsers(token, {}, "", searchTerm));
        } else {
          setAuthenticated(false);
          dispatch(fetchApprovedUsers(null, {}, "", searchTerm)); // Fetch without token
        }
        // Delay the content rendering by 3 seconds
        setTimeout(() => setShowContent(true), 1000);
      } catch (error) {
        setAuthError(true);
      }
    };

    fetchData();
  }, [dispatch, searchTerm]);

  const handleSearch = () => {
    const token = localStorage.getItem("token") || "";
    dispatch(fetchApprovedUsers(token, filters, "", searchTerm));
  };

  const handleFilterChange = (e, filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: e.target.value,
    }));
  };
  const handleViewProfile = (wctId) => {
    router.push(`/talent/${wctId}`);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const loading = loadingStatus === "loading";

  if (!showContent) {
    return (
      <div className="flex  justify-center items-center h-screen bg-primary-forground dark:bg-dark-primary-forground">
        <LoadingSpinner />
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex justify-center items-center h-screen bg-primary-forground dark:bg-dark-primary-forground">
        <p className="text-red-500">Unauthorized. Please log in.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-primary-forground dark:bg-dark-primary-forground">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center bg-primary-forground dark:bg-dark-primary-forground">
        <p className="text-red-500">An error occurred: {error.message}</p>
      </div>
    );
  }

  if (!talents || talents.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center bg-primary-forground dark:bg-dark-primary-forground">
        <p className="text-gray-500">
          No talents found. Try adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <div className="talent-page container mx-auto p-4 bg-primary-forground dark:bg-dark-primary-forground">
      {/* Hero Section */}
      <header className="hero-section bg-gradient-to-r from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 flex flex-col md:flex-row items-center justify-between p-4 md:p-8 h-auto md:h-80 rounded-lg shadow-lg mb-8">
        <motion.h1
          className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Models for Hire
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

      <BreadcrumbSection />

      <section className="talent-count-row flex flex-col md:flex-row justify-between items-center mb-8 bg-neutral-500 dark:bg-neutral-700 p-2 rounded-md shadow-lg">
        <motion.p
          className="text-black dark:text-white text-lg font-semibold mb-2 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Total Talents Found: {talents.length}
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
              <option value="">Sort by Recently updated</option>
              <option value="name">Sort by Name</option>
              <option value="location">Sort by Location</option>
              <option value="skills">Sort by Skills</option>
            </select>
            <Label className="text-gray-500 dark:text-gray-400">Sort</Label>
          </div>
        </div>
      </section>

      {/* Talent List Section */}
      <section
        className={`talent-list ${
          viewMode === "grid"
            ? "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {talents.map((talent) => (
          <motion.div
            key={talent.id}
            className={`talent-card bg-primary-foreground dark:bg-primary-foreground p-4 rounded-lg shadow-lg my-3 ${
              viewMode === "row"
                ? "flex flex-col sm:flex-row items-center shadow-lg"
                : "flex flex-col"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Profile Image */}
            <div
              className={`relative ${
                viewMode === "row" ? "w-32 h-32" : "w-full h-60"
              } bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden mb-4 sm:mb-0 flex items-center justify-center`}
            >
              {/* Image */}
              <img
                src={
                  `${talent?.profilePictureUrl}` ||
                  "https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=170667a&w=0&k=20&c=qDvsvfQdmm_cvI_BQH4PdIt8-P-VDAq7ufOobicPBu0="
                }
                alt={talent?.profile?.screenName || "Talent Profile"}
                className="object-contain w-full h-full"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-5 pointer-events-none"></div>

              {/* Prevent Right Click */}
              <div
                className="absolute inset-0 pointer-events-auto" // Blur on hover
                onContextMenu={(e) => e.preventDefault()} // Disables right-click
              ></div>

              {/* Watermark */}
              <div className="absolute top-2 right-2 pointer-events-none">
                <img
                  src="/Img/Logo.png"
                  alt="Wonchance Watermark"
                  className="opacity-70 w-16 h-auto"
                />
              </div>
            </div>

            {/* Profile Details */}
            <div
              className={`${
                viewMode === "row" ? "flex-grow sm:ml-6 mt-4 sm:mt-0" : ""
              }`}
            >
              {/* <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
                {talent?.profile?.screenName || "Wonchance Talent"}
              </h2> */}
              <p className="text-gray-600 mt-5 dark:text-gray-300 mb-2">
                <strong>Profile ID: </strong>
                {talent?.wctId || "N/A"}
              </p>
              {/* <p className="text-gray-600 dark:text-gray-300 mb-4">
                {authenticated
                  ? `Bio: ${
                      talent?.bio ||
                      "🎬 Actor exploring the world of cinema. Follow along for behind-the-scenes content!"
                    }`
                  : "Please log in to see more details."}
              </p> */}
              {viewMode === "row" && authenticated && (
                <div className="flex flex-wrap gap-4">
                  {/* <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Height:</strong>{" "}
                    {talent?.profile?.physicalDetails?.height
                      ? `${talent.profile.physicalDetails.height} CM`
                      : "N/A"}
                  </p> */}
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Age:</strong> {talent?.age || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Location:</strong>{" "}
                    {talent?.profile?.nativePlace || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Professional Level:</strong>{" "}
                    {talent?.profile?.experienceLevel || "N/A"}
                  </p>
                </div>
              )}
              {viewMode === "grid" && (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Age:</strong> {talent?.age || "N/A"}
                  </p>
                  {/* <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Height:</strong>{" "}
                    {talent?.profile?.physicalDetails?.height || "N/A"}
                  </p> */}
                </>
              )}
              {authenticated ? (
                <Button
                  onClick={() => handleViewProfile(talent.wctId)}
                  className="mt-4 bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-800 hover:bg-blue-600 dark:hover:bg-blue-700"
                >
                  View Profile
                </Button>
              ) : (
                <Link
                  href="/auth"
                  className=" text-secondary rounded-md bg-primary p-2 my-14  hover:text-teal-400"
                >
                  Log in to view profile
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default TalentPage;
