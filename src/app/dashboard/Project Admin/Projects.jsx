import { fetchAssignedProjects } from "@/redux/slices/projectSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IMAGE_API_END_POINT } from "@/utils/constant";
import CreateRole from "../components/forms/Roles/CreateRole";
import { useRouter } from "next/navigation";

const AssignedProjects = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateRole, setShowCreateRole] = useState(false); // State to toggle form visibility
  const projectsPerPage = 10;
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };
  useEffect(() => {
    dispatch(fetchAssignedProjects());
  }, [dispatch]);

  // Pagination logic
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const paginatedProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Handlers for actions
  const handleViewDetails = (project) => {
    const projectId = project._id;
    router.push(`/dashboard/project/${projectId}`);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleCreateRoleForm = () => {
    setShowCreateRole(!showCreateRole);
  };

  return (
    <div>
      {/* Create Role Button */}
      <div className="mb-4 flex justify-between mx-3">
        <h1 className="text-2xl font-bold mb-4">Assigned Projects</h1>
        <Button onClick={toggleCreateRoleForm} className="">
          {showCreateRole ? "Close Create Role Form" : "Create Role"}
        </Button>
      </div>

      {/* Conditionally render the CreateRole form */}
      {showCreateRole && (
        <div className="mb-6">
          <CreateRole /> {/* This is your form component */}
        </div>
      )}

      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.length > 0 ? (
              paginatedProjects.map((project) => (
                <Card
                  key={project._id}
                  className="relative bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader className="relative">
                    <img
                      src={`${IMAGE_API_END_POINT}${project.projectImage}`}
                      alt={project.projectName || "Project Image"}
                      className="object-cover w-full h-32 transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <span className="text-lg font-semibold">Featured</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold mb-2">
                      {project.projectName}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 mb-2">
                      {truncateText(project.description, 40)}
                    </CardDescription>
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Company:</strong>{" "}
                      {truncateText(project.company?.companyName, 35) || "N/A"}
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Categories:</strong>{" "}
                      {project.categories?.join(", ")}
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Genre:</strong> {project.genre?.join(", ")}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center border-t border-gray-200 bg-gray-50">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Start Date</span>
                      <span className="text-lg font-medium">
                        {project.projectStartDate
                          ? new Date(
                              project.projectStartDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Unknown"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">End Date</span>
                      <span className="text-lg font-medium">
                        {project.projectEndDate
                          ? new Date(project.projectEndDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "Ongoing"}
                      </span>
                    </div>
                  </CardFooter>
                  <CardFooter className="p-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <Button
                        variant="secondary"
                        className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                        onClick={() => handleViewDetails(project)}
                        aria-label={`View details of ${project.projectName}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="mr-2"
            >
              Previous
            </Button>
            <span className="px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="ml-2"
            >
              Next
            </Button>
          </div>
        </>
      )}
      {status === "failed" && <p>Error: {error}</p>}
    </div>
  );
};

export default AssignedProjects;
