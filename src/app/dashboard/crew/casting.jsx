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
import {
  fetchAllCastings,
  deleteCasting,
  updateCasting,
} from "@/redux/slices/castingSlice";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/loading";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CreateCastingCall } from "../components/forms/Casting/CreateCasting";
import { UpdateCastingCall } from "../components/forms/Casting/UpdateCastingCall";
import { useTheme } from "next-themes";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"; // Ensure this is the correct path // Ensure this is the correct path
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const CastingCallList = () => {
  const dispatch = useDispatch();
  const { castings, status, error } = useSelector((state) => state.castings);
  const { theme } = useTheme();

  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedCastingCall, setSelectedCastingCall] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [filter, setFilter] = useState({
    roleName: "",
    projectName: "",
    dateRange: [null, null],
  });
  const [sort, setSort] = useState("roleName");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [castingDate, setCastingDate] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCastings());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred.");
    }
  }, [error]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleDateRangeChange = (dates) => {
    setFilter((prevFilter) => ({ ...prevFilter, dateRange: dates }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (castingId) => {
    try {
      await dispatch(deleteCasting(castingId)).unwrap();
      toast.success("Casting call deleted successfully.");
    } catch (error) {
      toast.error(error.message || "Failed to delete casting call.");
    }
  };

  const handleEdit = (castingCall) => {
    setSelectedCastingCall(castingCall);
    setShowUpdateForm(true);
  };

  const handleViewDetails = (castingCall) => {
    setSelectedCastingCall(castingCall);
    setShowDetailsDialog(true);
  };

  const filteredCastingCalls = (castings || [])
    .filter((casting) => {
      const roleNameMatch = casting.role?.roleName
        ?.toLowerCase()
        .includes(filter.roleName.toLowerCase());
      const projectNameMatch = casting.role?.project
        ?.toLowerCase()
        .includes(filter.projectName.toLowerCase());
      const dateRangeMatch =
        !filter.dateRange[0] ||
        !filter.dateRange[1] ||
        (new Date(casting.castingDate) >= new Date(filter.dateRange[0]) &&
          new Date(casting.castingDate) <= new Date(filter.dateRange[1]));
      return roleNameMatch && projectNameMatch && dateRangeMatch;
    })
    .sort((a, b) => {
      if (sort === "roleName") {
        return a.role?.roleName.localeCompare(b.role?.roleName);
      }
      if (sort === "projectName") {
        return a.role?.project?.localeCompare(b.role?.project);
      }
      if (sort === "castingDate") {
        return new Date(a.castingDate) - new Date(b.castingDate);
      }
      return 0;
    });

  const paginatedCastingCalls = filteredCastingCalls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCastingCalls.length / itemsPerPage);

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
      <h2 className="font-bold text-3xl mb-6">Casting Call List</h2>
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex gap-4 items-end">
          <Input
            type="text"
            name="roleName"
            placeholder="Filter by role name"
            value={filter.roleName}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2"
          />
          <Input
            type="text"
            name="projectName"
            placeholder="Filter by project name"
            value={filter.projectName}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-2"
          />
          <div className="space-y-2">
            <Label htmlFor="casting-date">Casting Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal ${
                    !castingDate ? "text-muted-foreground" : ""
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {castingDate ? format(castingDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={castingDate}
                  onSelect={setCastingDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex gap-4 items-end">
          <Select
            value={sort}
            onChange={handleSortChange}
            className="border rounded-lg px-4 py-2"
          >
            <option value="roleName">Sort by Role Name</option>
            <option value="projectName">Sort by Project Name</option>
            <option value="castingDate">Sort by Casting Date</option>
          </Select>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button
                variant="primary"
                className="bg-secondary-foreground text-white"
                onClick={() => setShowForm(true)}
              >
                Add New Casting Call
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px]">
              <DialogHeader>
                <DialogTitle>Add New Casting Call</DialogTitle>
                <DialogDescription>
                  Fill out the form to create a new casting call.
                </DialogDescription>
              </DialogHeader>
              <CreateCastingCall onClose={() => setShowForm(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {paginatedCastingCalls.length > 0 ? (
          paginatedCastingCalls.map((castingCall) => (
            <Card
              key={castingCall._id}
              className={`relative bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden ${
                theme === "dark" ? "bg-gray-800 border-gray-600" : ""
              }`}
            >
              <CardHeader className="relative border-b border-gray-200 dark:border-gray-600">
                <div
                  className={`h-14 flex items-center justify-center ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {castingCall.role?.roleName || "No Role Name"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {castingCall.role?.roleName}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                  Casting-Call Id: {castingCall.wccId || "No project name"}
                </CardDescription>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    Location: {castingCall.location || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Casting Date:{" "}
                    {new Date(castingCall.castingDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Skin Tone: {castingCall.role?.skinTone || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Body Type: {castingCall.role?.bodyType || "N/A"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Notes: {castingCall.notes || "No notes"}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1 sm:flex-auto"
                    onClick={() => handleEdit(castingCall)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 sm:flex-auto"
                    onClick={() => handleDelete(castingCall._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1 sm:flex-auto"
                    onClick={() => handleViewDetails(castingCall)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="info"
                    className="flex-1 sm:flex-auto"
                    onClick={() => handleViewApplications(castingCall)}
                  >
                    View Applications
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
            No casting calls found.
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <Dialog open={showUpdateForm} onOpenChange={setShowUpdateForm}>
        <DialogTrigger asChild>
          {/* Empty trigger for dialog - adjust if needed */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>Update Casting Call</DialogTitle>
          </DialogHeader>
          <UpdateCastingCall
            castingCall={selectedCastingCall}
            onClose={() => setShowUpdateForm(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogTrigger asChild>
          {/* Empty trigger for dialog - adjust if needed */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>Casting Call Details</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <h3 className="text-lg font-bold">Role Name:</h3>
            <p>{selectedCastingCall?.role?.roleName || "N/A"}</p>
            <h3 className="text-lg font-bold mt-4">Casting Call Id:</h3>
            <p>{selectedCastingCall?.wccId || "N/A"}</p>
            <h3 className="text-lg font-bold mt-4">Location:</h3>
            <p>{selectedCastingCall?.location || "N/A"}</p>
            <h3 className="text-lg font-bold mt-4">Skin Tone:</h3>
            <p>{selectedCastingCall?.role?.skinTone || "N/A"}</p>
            <h3 className="text-lg font-bold mt-4">Body Type:</h3>
            <p>{selectedCastingCall?.role?.bodyType || "N/A"}</p>
            <h3 className="text-lg font-bold mt-4">Notes:</h3>
            <p>{selectedCastingCall?.notes || "N/A"}</p>
            <h3 className="text-lg font-bold mt-4">Casting Date:</h3>
            <p>
              {new Date(selectedCastingCall?.castingDate).toLocaleDateString()}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CastingCallList;
