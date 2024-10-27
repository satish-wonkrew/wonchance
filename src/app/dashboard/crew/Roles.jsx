/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { fetchAllRoles, deleteRole } from "@/redux/slices/roleSlice";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/loading";
import { useTheme } from "next-themes";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import UpdateRole from "../components/forms/Roles/UpdateRole";
import CreateRole from "../components/forms/Roles/CreateRole";

const RoleList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { roles, status, error } = useSelector((state) => state.roles);
  const { theme } = useTheme();

  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name"); // Default sorting by name
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        await dispatch(fetchAllRoles()).unwrap();
      } catch (err) {
        toast.error(err.message || "Failed to fetch roles.");
      }
    };

    fetchRoles();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error.message || "An error occurred."
      );
    }
  }, [error]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (roleId) => {
    try {
      await dispatch(deleteRole(roleId)).unwrap();
      toast.success("Role deleted successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to delete role.");
    }
  };

  const handleViewDetails = (role) => {
    setSelectedRole(role);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setShowUpdateForm(true);
  };

  const filteredRoles = roles
    .filter((role) =>
      role.roleName?.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") {
        return a.roleName.localeCompare(b.roleName);
      }
      return 0;
    });

  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className={`p-10 md:px-20 lg:px-32 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h2 className="font-bold text-3xl mb-6">Role List</h2>
      <div className="flex justify-between mb-6">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sort}
            onChange={handleSortChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
          </select>
        </div>
        <Button
          variant="primary"
          className="bg-secondary-foreground text-white"
          onClick={() => setShowForm(true)}
        >
          Add New Role
        </Button>
      </div>
      {showForm && <CreateRole onClose={() => setShowForm(false)} />}
      {showUpdateForm && (
        <UpdateRole
          role={selectedRole}
          onClose={() => setShowUpdateForm(false)}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRoles.length > 0 ? (
          paginatedRoles.map((role) => (
            <Card
              key={role._id}
              className={`relative bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : ""
              }`}
            >
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold">
                  {role.roleName}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {role.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center">
                <Button
                  variant="secondary"
                  className="mr-2"
                  onClick={() => handleViewDetails(role)}
                >
                  View Details
                </Button>
                <div className="flex space-x-2">
                  <Button variant="primary" onClick={() => handleEdit(role)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(role._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500">No roles found.</div>
        )}
      </div>
      <div className="mt-6 flex justify-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg bg-white text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border rounded-lg ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg bg-white text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for viewing role details */}
      {selectedRole && !showUpdateForm && (
        <Modal onClose={() => setSelectedRole(null)}>
          <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg relative max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {selectedRole.roleName}
            </h2>
            <div className="space-y-4">
              {/* Description Section */}
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  <strong>Description:</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  {selectedRole.description || "Not specified"}
                </p>
              </div>

              {/* Skin Tone and Body Type Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    <strong>Skin Tone:</strong>
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    {Array.isArray(selectedRole.skinTone)
                      ? selectedRole.skinTone.join(", ")
                      : "Not specified"}
                  </p>
                </div>
                <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    <strong>Body Type:</strong>
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    {Array.isArray(selectedRole.bodyType)
                      ? selectedRole.bodyType.join(", ")
                      : "Not specified"}
                  </p>
                </div>
              </div>

              {/* Openings Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    <strong>Openings Closed:</strong>
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    {selectedRole.openingsClosed || "Not specified"}
                  </p>
                </div>
                <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    <strong>Shoot Dates:</strong>
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    {selectedRole.noOfShootDate || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    <strong>Created By:</strong>
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    {selectedRole.created_by || "Not specified"}
                  </p>
                </div>
                <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    <strong>Project ID:</strong>
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    {selectedRole.projectId || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoleList;
