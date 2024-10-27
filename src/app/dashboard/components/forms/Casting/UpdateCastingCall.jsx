/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCasting, fetchCastingById } from "@/redux/slices/castingSlice";
import { fetchAllRoles } from "@/redux/slices/roleSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export function UpdateCastingCall({ castingId }) {
  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state.roles);
  const { status, casting } = useSelector((state) => state.castings);

  const [formData, setFormData] = useState({
    title: "",
    selectedRole: "",
    castingDate: null,
    expiryDate: null,
    notes: "",
    totalSlots: 1,
    castingMode: "online",
    location: "",
  });

  useEffect(() => {
    if (castingId) {
      dispatch(fetchCastingById(castingId)).then((result) => {
        const castingData = result.payload;
        if (castingData) {
          setFormData({
            title: castingData.title || "",
            selectedRole: castingData.role || "",
            castingDate: castingData.castingDate ? new Date(castingData.castingDate) : null,
            expiryDate: castingData.expiryDate ? new Date(castingData.expiryDate) : null,
            notes: castingData.notes || "",
            totalSlots: castingData.castingSlots?.totalSlots || 1,
            castingMode: castingData.mode || "online",
            location: castingData.mode === "offline" ? castingData.location || "" : "",
          });
        }
      });
    }
    dispatch(fetchAllRoles());
  }, [dispatch, castingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const castingData = {
      id: castingId,
      title: formData.title,
      role: formData.selectedRole,
      castingDate: formData.castingDate,
      expiryDate: formData.expiryDate,
      notes: formData.notes,
      castingSlots: {
        totalSlots: formData.totalSlots,
      },
      location: formData.castingMode === "offline" ? formData.location : "N/A",
      mode: formData.castingMode,
    };

    dispatch(updateCasting(castingData)).then((result) => {
      if (result.type.endsWith("fulfilled")) {
        toast.success("Casting call updated successfully!");
        router.push("/casting-calls"); // Ensure `router` is imported from next/router
      } else {
        toast.error("Failed to update casting call.");
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Update Casting Call</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="selectedRole"
              value={formData.selectedRole}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="casting-date">Casting Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !formData.castingDate ? "text-muted-foreground" : ""
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.castingDate ? format(formData.castingDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.castingDate}
                  onSelect={(date) => handleDateChange("castingDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="expiry-date">Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !formData.expiryDate ? "text-muted-foreground" : ""
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.expiryDate ? format(formData.expiryDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.expiryDate}
                  onSelect={(date) => handleDateChange("expiryDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="total-slots">Total Slots</Label>
            <Input
              id="total-slots"
              name="totalSlots"
              type="number"
              value={formData.totalSlots}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div>
            <Label htmlFor="casting-mode">Casting Mode</Label>
            <select
              id="casting-mode"
              name="castingMode"
              value={formData.castingMode}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
        {formData.castingMode === "offline" && (
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>
        )}
        <div>
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any additional notes"
            className="w-full border rounded-md p-2 h-32 resize-none"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Saving..." : "Save Casting Call"}
        </Button>
      </form>
    </div>
  );
}
