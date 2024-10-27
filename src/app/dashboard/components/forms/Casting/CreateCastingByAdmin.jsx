import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {  fetchAllProjects } from "@/redux/slices/projectSlice";
import { createCasting } from "@/redux/slices/castingSlice";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { fetchRolesByProjectId } from "@/redux/slices/roleSlice";

export function AdminCastingCreate({ onClose }) {
  const dispatch = useDispatch();
  const { user } = useUser();
  const { roles } = useSelector((state) => state.roles);
  const { projects, error } = useSelector((state) => state.projects);
  const [castingDate, setCastingDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]); // Multi-select for roles
  const [selectedProject, setSelectedProject] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [totalSlots, setTotalSlots] = useState(1);
  const [castingMode, setCastingMode] = useState("online");
  const [location, setLocation] = useState("");

  const projectStatus = useSelector((state) => state.projects.status);

  useEffect(() => {
    if (projectStatus === "idle") {
      dispatch(fetchAllProjects());
    }
  }, [dispatch, projectStatus]);

  useEffect(() => {
    if (selectedProject) {
      dispatch(fetchRolesByProjectId(selectedProject));
    }
  }, [dispatch, selectedProject]);

  useEffect(() => {
    if (error) {
      toast.error(typeof error === "string" ? error : error.message || "An error occurred.");
    }
  }, [error]);

  const projectOptions = projects?.map((project) => ({
    value: project._id,
    label: project.projectName,
  }));

  const roleOptions = roles?.map((role) => ({
    value: role._id,
    label: role.roleName,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const castingData = {
      title,
      role: selectedRoles.map((role) => role.value), // Collect selected roles
      project: selectedProject,
      castingDate,
      expiryDate,
      notes,
      castingSlots: { totalSlots },
      location: castingMode === "offline" ? location : "N/A",
      mode: castingMode,
    };
    dispatch(createCasting(castingData)).then((result) => {
      if (result.type.endsWith("fulfilled")) {
        toast.success("Casting call created successfully!");
      } else {
        toast.error("Failed to create casting call.");
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="p-4 sm:p-6 lg:p-8 w-max mx-auto">
        <Tabs defaultValue="casting-call" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="casting-call">Casting Call</TabsTrigger>
            <TabsTrigger value="audition">Audition</TabsTrigger>
          </TabsList>

          <TabsContent value="casting-call">
            <Card className="my-4">
              <CardHeader>
                <CardTitle>Casting Call</CardTitle>
                <CardDescription>Manage your casting calls here. Click Save when youre done.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project">Project</Label>
                      <select
                        id="project"
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="">Select a project</option>
                        {projectOptions?.map((project) => (
                          <option key={project.value} value={project.value}>
                            {project.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roles">Roles</Label>
                      <Select
                        id="roles"
                        options={roleOptions}
                        value={selectedRoles}
                        onChange={setSelectedRoles}
                        isMulti // Enable multi-select
                        isDisabled={!selectedProject} // Disable until a project is selected
                        className="w-full border rounded-md"
                        placeholder="Select roles"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="casting-date">Casting Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal ${!castingDate ? "text-muted-foreground" : ""}`}
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
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full justify-start text-left font-normal ${!expiryDate ? "text-muted-foreground" : ""}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {expiryDate ? format(expiryDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expiryDate}
                            onSelect={setExpiryDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="total-slots">Total Slots</Label>
                      <Input
                        id="total-slots"
                        type="number"
                        value={totalSlots}
                        onChange={(e) => setTotalSlots(Number(e.target.value))}
                        min="1"
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="casting-mode">Casting Mode</Label>
                      <select
                        id="casting-mode"
                        value={castingMode}
                        onChange={(e) => setCastingMode(e.target.value)}
                        className="w-full border rounded-md p-2"
                      >
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                      </select>
                    </div>
                  </div>

                  {castingMode === "offline" && (
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <textarea
                      id="notes"
                      placeholder="Enter notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full border rounded-md p-2"
                      rows="4"
                    />
                  </div>

                  <CardFooter>
                    <Button type="submit">Save Casting Call</Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
