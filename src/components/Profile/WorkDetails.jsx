"use client";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

export default function Home() {
  const user = useUser();
  const [openSections, setOpenSections] = useState({
    achievement: false,
    upcomingProjects: false,
    workLinks: false,
    interestedMedia: false,
    comfortable1: false,
    comfortable2: false,
  });
  const profiles = user.user;

  const [openMovie, setOpenMovie] = useState({
    Garudan: false,
    Ayogya: false,
  });

  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const toggleMovie = (movieTitle) => {
    setOpenMovie({
      ...openMovie,
      [movieTitle]: !openMovie[movieTitle],
    });
  };
  // Sample data structure for movies (this can be dynamically fetched from an API)
  const movieData = [
    {
      title: "Garudan",
      description:
        "Garudan is a 2024 Indian Tamil-language action thriller film. The film stars Soori.",
      cast: ["Soori", "Aishwarya Rajesh"],
      director: "Karthik Subbaraj",
      releaseDate: "2024-03-12",
    },
    {
      title: "Ayogya",
      description:
        "Karnan is a corrupt police inspector who frequently bends the rules to suit his own needs.",
      cast: ["Vishal", "Raashi Khanna"],
      director: "Venkat Mohan",
      releaseDate: "2019-05-10",
    },
  ];

  return (
    <div className="h-auto py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Work Details Header */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <h1 className="col-span-2 bg-gray-300 text-xl font-bold py-3 px-4 rounded-lg shadow">
            Work Details
          </h1>
          <h1 className="col-span-1 bg-gray-300 text-xl font-bold py-3 px-4 rounded-lg shadow">
            Media Preferences
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Side Accordions */}
          <div className="space-y-4 col-span-2">
            {/* Achievement Section */}
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-xl">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => toggleSection("achievement")}
              >
                <span className="font-semibold">Achievements</span>
                <span>{openSections.achievement ? "↑" : "↓"}</span>
              </div>

              {openSections.achievement && (
                <div className="mt-2">
                  {/* Render workDetails */}
                  <div className="bg-white shadow-inner p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">Work Details</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>
                        <strong>Achievements:</strong>{" "}
                        {profiles?.profile.workDetails.achievements || "N/A"}
                      </li>
                      <li>
                        <strong>Experience:</strong>{" "}
                        {profiles?.profile.workDetails.experience || "N/A"}
                      </li>
                      <li>
                        <strong>International Movies:</strong>{" "}
                        {profiles?.profile.workDetails.internationalMovie ||
                          "N/A"}
                      </li>
                      <li>
                        <strong>Movies:</strong>{" "}
                        {profiles?.profile.workDetails.movies || "N/A"}
                      </li>
                      <li>
                        <strong>Shoot Per Day:</strong>{" "}
                        {profiles?.profile.workDetails.shootPerDay || "N/A"}
                      </li>
                    </ul>

                    {/* Render projects array */}
                  </div>
                </div>
              )}
            </div>

            {/* Upcoming Projects Section */}
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-xl">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => toggleSection("upcomingProjects")}
              >
                <span className="font-semibold">Upcoming Projects</span>
                <span>{openSections.upcomingProjects ? "↑" : "↓"}</span>
              </div>

              {openSections.upcomingProjects && (
                <div className="mt-2 text-sm">
                  <p>
                    {profiles?.profile.workDetails.upcomingProjects ||
                      "No upcoming projects."}
                  </p>
                </div>
              )}
            </div>

            {/* Work Links Section */}
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-xl">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => toggleSection("workLinks")}
              >
                <span className="font-semibold">Work Links</span>
                <span>{openSections.workLinks ? "↑" : "↓"}</span>
              </div>
              {openSections.workLinks && (
                <p className="mt-2 text-sm">
                  {profiles?.profile.workDetails.worklinks || "No work links"}
                </p>
              )}
            </div>
          </div>

          {/* Right Side Accordions */}
          <div className="space-y-4 col-span-1">
            {/* Interested Media Section */}
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-xl">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => toggleSection("interestedMedia")}
              >
                <span className="font-semibold">Interested Media</span>
                <span>{openSections.interestedMedia ? "↑" : "↓"}</span>
              </div>
              {openSections.interestedMedia && (
                <ul>
                  {profiles?.profile.interests.interestedMedia?.length > 0 ? (
                    profiles.profile.interests.interestedMedia.map(
                      (media, index) => (
                        <li key={index} className="mt-2 text-sm">
                          {media}
                        </li>
                      )
                    )
                  ) : (
                    <li className="mt-2 text-sm">
                      No interested media listed.
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Comfortable Section 1 */}
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-xl">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => toggleSection("comfortableWith")}
              >
                <span className="font-semibold">Comfortable With</span>
                <span>{openSections.comfortableWith ? "↑" : "↓"}</span>
              </div>
              {openSections.comfortableWith && (
                <ul className="mt-2 text-sm space-y-1">
                  {profiles?.profile.interests.comfortableWith?.length > 0 ? (
                    profiles.profile.interests.comfortableWith.map(
                      (item, index) => <li key={index}>{item}</li>
                    )
                  ) : (
                    <li>No preferences listed.</li>
                  )}
                </ul>
              )}
            </div>

            {/* Comfortable Clothing Section */}
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-xl">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => toggleSection("comfortableClothing")}
              >
                <span className="font-semibold">Comfortable Clothing</span>
                <span>{openSections.comfortableClothing ? "↑" : "↓"}</span>
              </div>
              {openSections.comfortableClothing && (
                <ul>
                  {profiles?.profile.interests.comfortableClothing?.length >
                  0 ? (
                    profiles.profile.interests.comfortableClothing.map(
                      (clothing, index) => (
                        <li key={index} className="mt-2 text-sm">
                          {clothing}
                        </li>
                      )
                    )
                  ) : (
                    <li className="mt-2 text-sm">
                      No clothing preferences listed.
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Interested Shoots Section */}
            <div className="bg-white shadow-lg rounded-lg p-4 transition duration-300 ease-in-out hover:shadow-xl">
              <div
                className="flex justify-between cursor-pointer items-center"
                onClick={() => toggleSection("interestedShoots")}
              >
                <span className="font-semibold">Interested Shoots</span>
                <span>{openSections.interestedShoots ? "↑" : "↓"}</span>
              </div>
              {openSections.interestedShoots && (
                <ul>
                  {profiles?.profile.interests.interestedShoots?.length > 0 ? (
                    profiles.profile.interests.interestedShoots.map(
                      (shoot, index) => (
                        <li key={index} className="mt-2 text-sm">
                          {shoot}
                        </li>
                      )
                    )
                  ) : (
                    <li className="mt-2 text-sm">No shoot interests listed.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
