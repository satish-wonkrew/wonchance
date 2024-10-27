import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";

const TalentForm = ({ profileInput, setProfileInput, handleSubmit, loading }) => {
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setProfileInput(prev => {
      if (id.includes('.')) {
        const [mainKey, subKey] = id.split('.');
        return {
          ...prev,
          [mainKey]: {
            ...prev[mainKey],
            [subKey]: type === 'checkbox' ? checked : value
          }
        };
      }
      return {
        ...prev,
        [id]: type === 'checkbox' ? checked : value
      };
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <img src="/path/to/talent-image.jpg" alt="Talent" className="w-32 h-32 mb-4 rounded-full object-cover" />
      <Label htmlFor="screenName">Screen Name</Label>
      <Input
        type="text"
        id="screenName"
        value={profileInput.screenName}
        onChange={handleChange}
      />
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        id="email"
        value={profileInput.email}
        onChange={handleChange}
      />
      <Label htmlFor="gender">Gender</Label>
      <Input
        type="text"
        id="gender"
        value={profileInput.gender}
        onChange={handleChange}
      />
      <Label htmlFor="dateOfBirth">Date of Birth</Label>
      <Input
        type="date"
        id="dateOfBirth"
        value={profileInput.dateOfBirth}
        onChange={handleChange}
      />
      <Label htmlFor="maritalStatus">Marital Status</Label>
      <Input
        type="text"
        id="maritalStatus"
        value={profileInput.maritalStatus}
        onChange={handleChange}
      />
      <Label htmlFor="physicalDetails.tattoos">Has Tattoos</Label>
      <Input
        type="checkbox"
        id="physicalDetails.tattoos"
        checked={profileInput.physicalDetails.tattoos}
        onChange={handleChange}
      />
      <Label htmlFor="physicalDetails.piercings">Has Piercings</Label>
      <Input
        type="checkbox"
        id="physicalDetails.piercings"
        checked={profileInput.physicalDetails.piercings}
        onChange={handleChange}
      />
      {/* Add additional fields as needed */}
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Submit"}
      </Button>
    </div>
  );
};

export default TalentForm;
