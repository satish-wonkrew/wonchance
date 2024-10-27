import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import languageOptions from "@/data/languageOptions.json";
import socialMediaOptions from "@/data/socialMediaOptions.json";
import interestOptions from "@/data/interestOptions.json";

const MidlleInfo = ({ nextStep, prevStep, onFormDataChange, formData }) => {
  const [experienceLevel, setExperienceLevel] = useState(
    formData.profile?.experienceLevel || "Fresher"
  );
  const [educationalQualification, setEducationalQualification] = useState(
    formData.profile?.educationalQualification || ""
  );
  const [speakingLanguages, setSpeakingLanguages] = useState(
    formData.profile?.speakingLanguages || []
  );
  const [readingLanguages, setReadingLanguages] = useState(
    formData.profile?.readingLanguages || []
  );
  const [physicalDetails, setPhysicalDetails] = useState(
    formData.profile?.physicalDetails || {}
  );
  const [workDetails, setWorkDetails] = useState(
    formData.profile?.workDetails?.projects || []
  );
  const [skillDetails, setSkillDetails] = useState(
    formData.profile?.skillDetails?.skills || []
  );
  const [certifications, setCertifications] = useState(
    formData.profile?.skillDetails?.certifications || []
  );
  const [socialMediaProfiles, setSocialMediaProfiles] = useState(
    formData.profile?.socialMedia || {}
  );
  const [interests, setInterests] = useState({
    hobbies: formData.profile?.interests?.hobbies || [],
    genres: formData.profile?.interests?.genres || [],
    interestedmedia: formData.profile?.interests?.interestedmedia || [],
    interestedroles: formData.profile?.interests?.interestedroles || [],
    comfortablewith: formData.profile?.interests?.comfortablewith || [],
    comfortableclothing: formData.profile?.interests?.comfortableclothing || [],
  });
  const [tattoos, setTattoos] = useState(
    !!formData.profile?.physicalDetails?.tattoos
  );
  const [piercings, setPiercings] = useState(
    !!formData.profile?.physicalDetails?.piercings
  );
  const [availability, setAvailability] = useState(
    formData.profile?.workDetails?.availability || "Full-time"
  );

  const handleLanguagesChange = (selectedOptions, field) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    if (field === "speakingLanguages") {
      setSpeakingLanguages(values);
      onFormDataChange({
        profile: { ...formData.profile, speakingLanguages: values },
      });
    } else if (field === "readingLanguages") {
      setReadingLanguages(values);
      onFormDataChange({
        profile: { ...formData.profile, readingLanguages: values },
      });
    }
  };

  const handlePhysicalDetailChange = (field, value) => {
    setPhysicalDetails((prev) => ({ ...prev, [field]: value }));
    onFormDataChange({
      profile: {
        ...formData.profile,
        physicalDetails: { ...physicalDetails, [field]: value },
      },
    });
  };

  const removeWorkExperience = (index) => {
    const updatedWorkDetails = workDetails.filter((_, i) => i !== index);
    setWorkDetails(updatedWorkDetails);
    onFormDataChange({
      profile: {
        ...formData.profile,
        workDetails: {
          ...formData.profile.workDetails,
          projects: updatedWorkDetails,
        },
      },
    });
  };

  const handleWorkChange = (index, field, value) => {
    const updatedWorkDetails = [...workDetails];
    updatedWorkDetails[index] = {
      ...updatedWorkDetails[index],
      [field]: value,
    };
    setWorkDetails(updatedWorkDetails);
    onFormDataChange({
      profile: {
        ...formData.profile,
        workDetails: {
          ...formData.profile.workDetails,
          projects: updatedWorkDetails,
        },
      },
    });
  };

  const addWorkExperience = () => {
    const newWorkExperience = {
      projectName: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      upcomingprojects: "",
      shootperday: 0,
    };
    setWorkDetails([...workDetails, newWorkExperience]);
  };

  const handleSkillChange = (selectedOptions) => {
    const skills = selectedOptions
      ? selectedOptions.map((option) => ({
          title: option.value,
          description: "",
        }))
      : [];
    setSkillDetails(skills);
    onFormDataChange({
      profile: {
        ...formData.profile,
        skillDetails: { ...formData.profile.skillDetails, skills },
      },
    });
  };

  const handleSkillDetailChange = (index, field, value) => {
    const updatedSkills = [...skillDetails];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkillDetails(updatedSkills);
    onFormDataChange({
      profile: {
        ...formData.profile,
        skillDetails: {
          ...formData.profile.skillDetails,
          skills: updatedSkills,
        },
      },
    });
  };

  const addSkill = () => {
    const newSkill = { title: "", description: "" };
    setSkillDetails([...skillDetails, newSkill]);
  };

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    setCertifications(updatedCertifications);
    onFormDataChange({
      profile: {
        ...formData.profile,
        skillDetails: {
          ...formData.profile.skillDetails,
          certifications: updatedCertifications,
        },
      },
    });
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      { name: "", institution: "", year: new Date().getFullYear() },
    ]);
  };

  const handleSocialMediaChange = (value, profile) => {
    setSocialMediaProfiles((prev) => ({ ...prev, [profile]: value }));
    onFormDataChange({
      profile: {
        ...formData.profile,
        socialMedia: { ...socialMediaProfiles, [profile]: value },
      },
    });
  };

  const handleInterestsChange = (selectedOptions, field) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setInterests((prev) => ({ ...prev, [field]: values }));
    onFormDataChange({
      profile: {
        ...formData.profile,
        interests: { ...interests, [field]: values },
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen max-w-4xl p-6 mx-auto bg-gray-100">
      <div className="flex-1 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Level */}
          <div>
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <RadioGroup
              value={experienceLevel}
              onValueChange={(value) => {
                setExperienceLevel(value);
                onFormDataChange({
                  profile: { ...formData.profile, experienceLevel: value },
                });
              }}
              className="mt-2 flex flex-row"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fresher" id="r1" />
                <Label htmlFor="r1">Fresher</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Experienced" id="r2" />
                <Label htmlFor="r2">Experienced</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Educational Qualification */}
          <div>
            <Label htmlFor="educationalQualification">
              Educational Qualification
            </Label>
            <Input
              id="educationalQualification"
              value={educationalQualification}
              onChange={(e) => {
                setEducationalQualification(e.target.value);
                onFormDataChange({
                  profile: {
                    ...formData.profile,
                    educationalQualification: e.target.value,
                  },
                });
              }}
              className="mt-2"
            />
          </div>

          {/* Languages */}
          <div>
            <Label htmlFor="speakingLanguages">Speaking Languages</Label>
            <Select
              isMulti
              options={languageOptions}
              value={speakingLanguages.map((lang) => ({
                value: lang,
                label: lang,
              }))}
              onChange={(options) =>
                handleLanguagesChange(options, "speakingLanguages")
              }
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="readingLanguages">Reading Languages</Label>
            <Select
              isMulti
              options={languageOptions}
              value={readingLanguages.map((lang) => ({
                value: lang,
                label: lang,
              }))}
              onChange={(options) =>
                handleLanguagesChange(options, "readingLanguages")
              }
              className="mt-2"
            />
          </div>

          {/* Physical Details */}
          <div>
            <Label>Physical Details</Label>
            <div className="mt-2">
              {/* Height */}
              <div className="flex flex-row gap-3">
                <div className="mt-2">
                  <Label>Height (cm)</Label>
                  <input
                    type="number"
                    min={50}
                    max={250}
                    value={physicalDetails.height || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("height", e.target.value)
                    }
                    placeholder="Enter height in cm"
                    className="border rounded p-1 mt-1 w-full"
                  />
                </div>

                {/* Weight */}
                <div className="mt-2">
                  <Label>Weight (kg)</Label>
                  <input
                    type="number"
                    min={20}
                    max={200}
                    value={physicalDetails.weight || ""}
                    onChange={(e) =>
                      handlePhysicalDetailChange("weight", e.target.value)
                    }
                    placeholder="Enter weight in kg"
                    className="border rounded p-1 mt-1 w-full"
                  />
                </div>
              </div>

              {/* Eye Color */}
              <div className="mt-2">
                <Label>Eye Color</Label>
                <input
                  type="text"
                  value={physicalDetails.eyeColor || ""}
                  onChange={(e) =>
                    handlePhysicalDetailChange("eyeColor", e.target.value)
                  }
                  placeholder="Enter eye color"
                  className="border rounded p-1 mt-1 w-full"
                />
              </div>

              {/* Hair Color */}
              <div className="mt-2">
                <Label>Hair Color</Label>
                <input
                  type="text"
                  value={physicalDetails.hairColor || ""}
                  onChange={(e) =>
                    handlePhysicalDetailChange("hairColor", e.target.value)
                  }
                  placeholder="Enter hair color"
                  className="border rounded p-1 mt-1 w-full"
                />
              </div>

              {/* Skin Tone */}
              <div className="mt-2">
                <Label>Skin Tone</Label>
                <select
                  value={physicalDetails.skinTone || ""}
                  onChange={(e) =>
                    handlePhysicalDetailChange("skinTone", e.target.value)
                  }
                  className="border rounded p-1 mt-1 w-full"
                >
                  <option value="" disabled>
                    Select skin tone
                  </option>
                  <option value="Light">Light</option>
                  <option value="Fair">Fair</option>
                  <option value="Medium">Medium</option>
                  <option value="Dark">Dark</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Body Type */}
              <div className="mt-2">
                <Label>Body Type</Label>
                <select
                  value={physicalDetails.bodyType || ""}
                  onChange={(e) =>
                    handlePhysicalDetailChange("bodyType", e.target.value)
                  }
                  className="border rounded p-1 mt-1 w-full"
                >
                  <option value="" disabled>
                    Select body type
                  </option>
                  <option value="Slim">Slim</option>
                  <option value="Athletic">Athletic</option>
                  <option value="Average">Average</option>
                  <option value="Heavy">Heavy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Tattoos */}
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  checked={!!physicalDetails.tattoos}
                  onCheckedChange={(checked) =>
                    handlePhysicalDetailChange("tattoos", checked)
                  }
                />
                <Label>Tattoos</Label>
              </div>

              {/* Piercings */}
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  checked={!!physicalDetails.piercings}
                  onCheckedChange={(checked) =>
                    handlePhysicalDetailChange("piercings", checked)
                  }
                />
                <Label>Piercings</Label>
              </div>
            </div>
          </div>

          {/* Social Media Profiles */}
          <div>
            <Label>Social Media Profiles</Label>
            {socialMediaOptions.map((profile) => (
              <div key={profile.key} className="mt-4">
                <Label>{profile.label}</Label>
                <Input
                  value={socialMediaProfiles[profile.key] || ""}
                  onChange={(e) =>
                    handleSocialMediaChange(e.target.value, profile.key)
                  }
                  placeholder={`Your ${profile.label}`}
                  className="mt-2"
                />
              </div>
            ))}
          </div>

          {/* Interests */}
          <div>
            <Label>Interests</Label>
            {Object.keys(interestOptions).map((field) => (
              <div key={field} className="mt-4">
                <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Select
                  isMulti
                  options={interestOptions[field]}
                  value={interests[field].map((interest) => ({
                    value: interest,
                    label: interest,
                  }))}
                  onChange={(options) => handleInterestsChange(options, field)}
                  className="mt-2"
                />
              </div>
            ))}
          </div>
          {/* Work Details */}
          <div>
            <Label>Work Experience</Label> <br />
            {workDetails.map((experience, index) => (
              <div key={index} className="mt-4">
                <Input
                  value={experience.projectName}
                  onChange={(e) =>
                    handleWorkChange(index, "projectName", e.target.value)
                  }
                  placeholder="Project Name"
                  className="mb-2"
                />
                <Input
                  value={experience.role}
                  onChange={(e) =>
                    handleWorkChange(index, "role", e.target.value)
                  }
                  placeholder="Role"
                  className="mb-2"
                />
                <Input
                  value={experience.startDate}
                  onChange={(e) =>
                    handleWorkChange(index, "startDate", e.target.value)
                  }
                  placeholder="Start Date"
                  className="mb-2"
                />
                <Input
                  value={experience.endDate}
                  onChange={(e) =>
                    handleWorkChange(index, "endDate", e.target.value)
                  }
                  placeholder="End Date"
                  className="mb-2"
                />
                <Input
                  value={experience.description}
                  onChange={(e) =>
                    handleWorkChange(index, "description", e.target.value)
                  }
                  placeholder="Description"
                  className="mb-2"
                />
                <Button
                  variant="destructive"
                  onClick={() => removeWorkExperience(index)}
                  className="mt-2"
                >
                  Remove Experience
                </Button>
              </div>
            ))}
            <Button onClick={addWorkExperience} className="mt-4">
              Add Work Experience
            </Button>
          </div>

          {/* Skills */}
          <div>
            <Label>Skills</Label> <br />
            <Select
              isMulti
              options={interestOptions.skills}
              value={skillDetails.map((skill) => ({
                value: skill.title,
                label: skill.title,
              }))}
              onChange={handleSkillChange}
              className="mt-2"
            />
            {skillDetails.map((skill, index) => (
              <div key={index} className="mt-4">
                <Input
                  value={skill.title}
                  onChange={(e) =>
                    handleSkillDetailChange(index, "title", e.target.value)
                  }
                  placeholder="Skill Title"
                  className="mb-2"
                />
                <Input
                  value={skill.description}
                  onChange={(e) =>
                    handleSkillDetailChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Description"
                  className="mb-2"
                />
              </div>
            ))}
            <Button onClick={addSkill} className="mt-4">
              Add Skill
            </Button>
          </div>

          {/* Certifications */}
          <div>
            <Label>Awards</Label> <br />
            {certifications.map((certification, index) => (
              <div key={index} className="mt-4">
                <Input
                  value={certification.name}
                  onChange={(e) =>
                    handleCertificationChange(index, "name", e.target.value)
                  }
                  placeholder="Award Name"
                  className="mb-2"
                />
                <Input
                  value={certification.institution}
                  onChange={(e) =>
                    handleCertificationChange(
                      index,
                      "institution",
                      e.target.value
                    )
                  }
                  placeholder="Institution"
                  className="mb-2"
                />
                <Input
                  type="number"
                  value={certification.year}
                  onChange={(e) =>
                    handleCertificationChange(
                      index,
                      "year",
                      parseInt(e.target.value)
                    )
                  }
                  placeholder="Year"
                  className="mb-2"
                />
              </div>
            ))}
            <Button onClick={addCertification} className="mt-4">
              Add Awards
            </Button>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
          <Button onClick={nextStep}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default MidlleInfo;
