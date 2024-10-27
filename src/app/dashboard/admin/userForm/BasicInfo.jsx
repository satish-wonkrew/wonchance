"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BasicInfo = ({ nextStep, prevStep, onFormDataChange, formData }) => {
  const [dateOfBirth, setDateOfBirth] = useState(
    formData.profile?.dateOfBirth
      ? new Date(formData.profile.dateOfBirth)
      : null
  );
  const [age, setAge] = useState(formData.profile?.age);

  useEffect(() => {
    if (dateOfBirth) {
      const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (
          month < 0 ||
          (month === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age;
      };
      setAge(calculateAge(dateOfBirth));
      onFormDataChange({
        profile: {
          ...formData.profile,
          dateOfBirth: dateOfBirth.toISOString(),
          age: calculateAge(dateOfBirth),
        },
      });
    }
  }, [dateOfBirth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({ profile: { ...formData.profile, [name]: value } });
  };

  const handleDateChange = (date) => {
    setDateOfBirth(date);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="profile.firstName">First Name</Label>
            <Input
              type="text"
              id="profile.firstName"
              name="firstName"
              value={formData.profile?.firstName || ""}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.lastName">Last Name</Label>
            <Input
              type="text"
              id="profile.lastName"
              name="lastName"
              value={formData.profile?.lastName || ""}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.screenName">Screen Name</Label>
            <Input
              type="text"
              id="profile.screenName"
              name="screenName"
              value={formData.profile?.screenName || ""}
              onChange={handleChange}
              placeholder="Enter your screen name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.dateOfBirth">Date of Birth</Label> <br />
            <DatePicker
              selected={dateOfBirth}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="Select Date"
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              maxDate={new Date()} // Limits the date to today
              yearDropdownItemNumber={100} // Dropdown years to select from
              scrollableYearDropdown // Makes the year dropdown scrollable
              className="mt-1 block w-full border border-gray-300 rounded-md py-1 px-3 bg-white"
            />
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              disabled
              type="number"
              id="age"
              name="age"
              value={age}
              readOnly
              className="mt-1 bg-gray-100 border border-gray-300 rounded-md py-2 px-3 w-full"
            />
          </div>

          <div>
            <Label htmlFor="profile.nativeState">Native State</Label>
            <Input
              type="text"
              id="profile.nativeState"
              name="nativeState"
              value={formData.profile?.nativeState || ""}
              onChange={handleChange}
              placeholder="Enter your native state"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.nativePlace">Native Place</Label>
            <Input
              type="text"
              id="profile.nativePlace"
              name="nativePlace"
              value={formData.profile?.nativePlace || ""}
              onChange={handleChange}
              placeholder="Enter your native place"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.nationality">Nationality</Label>
            <Input
              type="text"
              id="profile.nationality"
              name="nationality"
              value={formData.profile?.nationality || ""}
              onChange={handleChange}
              placeholder="Enter your nationality"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.currentCity">Current City</Label>
            <Input
              type="text"
              id="profile.currentCity"
              name="currentCity"
              value={formData.profile?.currentCity || ""}
              onChange={handleChange}
              placeholder="Enter your current city"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profile.address">Address</Label>
            <Input
              type="text"
              id="profile.address"
              name="address"
              value={formData.profile?.address || ""}
              onChange={handleChange}
              placeholder="Enter your full address"
              className="mt-1"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            onClick={prevStep}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
