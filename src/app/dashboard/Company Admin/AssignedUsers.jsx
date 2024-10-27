import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignedUsers } from "@/redux/slices/talentSlice";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AssignedUsers = () => {
  const dispatch = useDispatch();
  const { assignedUsers, status, error } = useSelector((state) => state.talent);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortField, setSortField] = useState("fullName");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAssignedUsers());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p>Loading assigned users...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  // Filter and sort users based on search term and selected filters
  const filteredUsers = assignedUsers?.assignedUsers
    ?.filter((user) => {
      const fullName = user.fullName.toLowerCase();
      const role = user.role?.toLowerCase();

      return (
        (fullName.includes(searchTerm.toLowerCase()) ||
          user.whatsappNumber?.includes(searchTerm.toLowerCase()) ||
          user.wctId?.includes(searchTerm.toLowerCase())) &&
        (filterRole === "all" || role === filterRole)
      );
    })
    .sort((a, b) => {
      const aField = a[sortField]?.toLowerCase() || "";
      const bField = b[sortField]?.toLowerCase() || "";
      if (sortOrder === "asc") {
        return aField.localeCompare(bField);
      } else {
        return bField.localeCompare(aField);
      }
    });

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Assigned Users
      </h1>

      {/* Search and Filter Controls */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:gap-6">
        <input
          type="text"
          placeholder="Search by name, WhatsApp number, or WCT ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border w-80 border-gray-300 rounded-md"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Roles</option>
          <option value="Company Admin">Company Admin</option>
          <option value="Project Admin">Project Admin</option>
          <option value="User">User</option>
          {/* Add more roles as needed */}
        </select>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="fullName">Sort by Name</option>
          <option value="createdAt">Sort by Created At</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers?.map((user) => (
          <div
            key={user.id}
            className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div
              className={`absolute top-0 right-0 mt-4 mr-4 px-3 py-1 text-sm font-medium rounded-full ${
                user.isApproved
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {user.isApproved ? "Approved" : "Not Approved"}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={
                    user.profile.profilePictureUrl ||
                    "https://placehold.co/150x150.png"
                  }
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user.fullName || "Name Not Provided"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {user.role || "Role Not Provided"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>WhatsApp:</strong> {user.whatsappNumber || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>ID:</strong> {user.wctId || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Gender:</strong> {user.profile.gender || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Experience:</strong>{" "}
                {user.profile.experienceLevel || "N/A"}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Created At:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4">
              <Button className="mr-2 bg-blue-500 hover:bg-blue-600">
                View Details
              </Button>
              <Link
                href={`/dashboard/admin/users/${user.wctId}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedUsers;
