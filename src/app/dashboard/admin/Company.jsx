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
import { fetchAllCompanies, deleteCompany } from "@/redux/slices/companySlice";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/loading";
import { IMAGE_API_END_POINT } from "@/utils/constant";
import { useTheme } from "next-themes";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import UpdateCompany from "../components/forms/company/UpdateCompany";
import CreateCompany from "../components/forms/company/CompanyCreate";

const CompanyList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { companies, status, error } = useSelector((state) => state.company);
  const { theme } = useTheme();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllCompanies()).unwrap().catch(err => {
      toast.error(err.message || "Failed to fetch companies.");
    });
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

  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleSortChange = (event) => setSort(event.target.value);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDelete = async (companyId) => {
    try {
      await dispatch(deleteCompany(companyId)).unwrap();
      toast.success("Company deleted successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to delete company.");
    }
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setShowUpdateForm(true);
  };
  const company= companies.data
  const filteredCompanies = company
    ?.filter((company) =>
      company.companyName?.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") {
        return a.companyName.localeCompare(b.companyName);
      }
      if (sort === "type") {
        return a.companyType.localeCompare(b.companyType);
      }
      return 0;
    });

  const paginatedCompanies = filteredCompanies?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCompanies?.length / itemsPerPage);

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
      <h2 className="font-bold text-3xl mb-6">Company List</h2>
      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2"
          />
          <select
            value={sort}
            onChange={handleSortChange}
            className="border rounded-lg px-4 py-2"
          >
            <option value="name">Sort by Name</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>
        <Button
          variant="primary"
          className="bg-secondary-foreground text-white"
          onClick={() => setShowForm(true)}
        >
          Add New Company
        </Button>
      </div>

      {showForm && <CreateCompany onClose={() => setShowForm(false)} />}
      {showUpdateForm && (
        <UpdateCompany
          company={selectedCompany}
          onClose={() => setShowUpdateForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCompanies?.length > 0 ? (
          paginatedCompanies.map((company) => (
            <Card
              key={company._id}
              className={`relative bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : ""
              }`}
            >
              <CardHeader className="relative">
                <img
                  src={`${IMAGE_API_END_POINT}${company.companyImage}`}
                  alt={company.companyName || "Company Image"}
                  className="object-cover w-full h-32 transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold">
                  {company.companyName}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {company.companyType}
                </CardDescription>
                <p className="text-gray-700 mt-2">
                  Categories: {company.categories.join(", ")}
                </p>
                <p className="mt-2 text-gray-600">
                  Owner: {company.ownerFirstName} {company.ownerLastName}
                </p>
              </CardContent>
              <CardFooter className="p-4">
                <div className="flex justify-between">
                  <Button
                    variant="secondary"
                    className="mr-2"
                    onClick={() => router.push(`/company/${company._id}`)}
                  >
                    View Details
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(company)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(company._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500">No companies found.</div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-1 px-4 py-2 border rounded-lg bg-white text-blue-500 hover:bg-blue-100"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-4 py-2 border rounded-lg ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-1 px-4 py-2 border rounded-lg bg-white text-blue-500 hover:bg-blue-100"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for viewing company details */}
      {selectedCompany && !showUpdateForm && (
        <Modal onClose={() => setSelectedCompany(null)}>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative">
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedCompany.companyName}
            </h2>
            <p>
              <strong>Type:</strong> {selectedCompany.companyType}
            </p>
            <p>
              <strong>Categories:</strong> {selectedCompany.categories.join(", ")}
            </p>
            <p>
              <strong>Owner:</strong> {selectedCompany.ownerFirstName} {selectedCompany.ownerLastName}
            </p>
            <img
              src={`${IMAGE_API_END_POINT}${selectedCompany.companyImage}`}
              alt={selectedCompany.companyName || "Company Image"}
              className="w-full h-auto mt-4 rounded-lg"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CompanyList;
