"use client";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

export default function Home() {
  const user = useUser()
  const [openSections, setOpenSections] = useState({
    achievement: false,
    upcomingProjects: false,
    workLinks: false,
    interestedMedia: false,
    comfortable1: false,
    comfortable2: false,
  });

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
      description: "Garudan is a 2024 Indian Tamil-language action thriller film. The film stars Soori.",
      cast: ["Soori", "Aishwarya Rajesh"],
      director: "Karthik Subbaraj",
      releaseDate: "2024-03-12",
    },
    {
      title: "Ayogya",
      description: "Karnan is a corrupt police inspector who frequently bends the rules to suit his own needs.",
      cast: ["Vishal", "Raashi Khanna"],
      director: "Venkat Mohan",
      releaseDate: "2019-05-10",
    },
  ];

  return (
    <div className="h-auto">
      <div className="max-w-6xl mx-auto">
        {/* Work Details Header */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <h1 className="col-span-2 bg-gray-300 text-xl font-bold py-2 px-4">Work Details</h1>
          <h1 className="col-span-1 bg-gray-300 text-xl font-bold py-2 px-4">Media Preferences</h1>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Side Accordions */}
          <div className="space-y-4 col-span-2">
            {/* Achievement Section */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between cursor-pointer" onClick={() => toggleSection("achievement")}>
                <span>Achievements</span>
                <span>{openSections.achievement ? "↑" : "↓"}</span>
              </div>

              {openSections.achievement && (
                <div className="mt-2">
                  {/* Render workDetails */}
                  <div className="bg-white shadow-inner p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">Work Details</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li>
                        <strong>Availability:</strong> {user.user?.profile.workDetails.availability}
                      </li>

                    </ul>

                    {/* Render projects array */}
                    <div className="mt-4">
                      <h4 className="font-semibold text-md">Projects:</h4>
                      {user.user.profile.workDetails.projects.map((project, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg p-3 mt-2">
                          <div className="flex justify-between cursor-pointer" onClick={() => toggleMovie(project.description)}>
                            <span>{project.description}</span>
                            <span>{openMovie[project.description] ? "↑" : "↓"}</span>
                          </div>

                          {/* Nested Accordion for project details */}
                          {openMovie[project.description] && (
                            <div className="mt-2 bg-white p-4 rounded-lg shadow-inner">
                              <ul className="list-disc list-inside text-sm space-y-1">
                                <li>
                                  <strong>Role:</strong> {project.role || "Not specified"}
                                </li>
                                <li>
                                  <strong>Shoot per Day:</strong> {project.shootperday || "Not specified"}
                                </li>
                                <li>
                                  <strong>Upcoming Projects:</strong> {project.upcomingprojects || "None"}
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Upcoming Projects Section */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between cursor-pointer" onClick={() => toggleSection("upcomingProjects")}>
                <span>Upcoming Projects</span>
                <span>{openSections.upcomingProjects ? "↑" : "↓"}</span>
              </div>

              {openSections.upcomingProjects && (
                <div className="mt-2 text-sm">
                  {/* Check if there are upcoming projects */}
                  {user.user.profile.workDetails.projects.length > 0 ? (
                    user.user.profile.workDetails.projects.map((project, index) => (
                      project.upcomingprojects ? (
                        <div key={index} className="bg-gray-100 rounded-lg p-3 mt-2">
                          <h4 className="font-semibold">Project {index + 1}:</h4>
                          <p><strong>Upcoming Project:</strong> {project.upcomingprojects}</p>
                        </div>
                      ) : (
                        <p key={index} className="mt-2">No upcoming projects listed for project {index + 1}.</p>
                      )
                    ))
                  ) : (
                    <p>No upcoming projects available.</p>
                  )}
                </div>
              )}
            </div>


            {/* Work Links Section */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between cursor-pointer" onClick={() => toggleSection("workLinks")}>
                <span>Work Links</span>
                <span>{openSections.workLinks ? "↑" : "↓"}</span>
              </div>
              {openSections.workLinks && <p className="mt-2 text-sm">Links to related work...</p>}
            </div>
          </div>

          {/* Right Side Accordions */}
          <div className="space-y-4 col-span-1">
            {/* Interested Media Section */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between cursor-pointer" onClick={() => toggleSection("interestedMedia")}>
                <span>Interested Media</span>
                <span>{openSections.interestedMedia ? "↑" : "↓"}</span>
              </div>
              {openSections.interestedMedia && <ul>
                <li className="mt-2 text-sm">{user.user.profile.interests.interestedmedia}</li>
              </ul>}
            </div>

            {/* Comfortable Section 1 */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between cursor-pointer" onClick={() => toggleSection("comfortable1")}>
                <span>Comfortable With</span>
                <span>{openSections.comfortable1 ? "↑" : "↓"}</span>
              </div>
              {openSections.comfortable1 && (
                <ul className="mt-2 text-sm space-y-1">
                  <li>{user.user.profile.interests.comfortablewith}</li>

                </ul>
              )}
            </div>

            {/* Comfortable Section 2 */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between cursor-pointer" onClick={() => toggleSection("comfortable2")}>
                <span>Comfortable in Various Roles</span>
                <span>{openSections.comfortable2 ? "↑" : "↓"}</span>
              </div>
              {openSections.comfortable2 && <ul>
                <li className="mt-2 text-sm">{user.user.profile.interests.interestedroles}</li>
              </ul>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
