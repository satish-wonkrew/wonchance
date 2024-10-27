
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Spinner from "@/components/ui/spinner";

// const CompanyAndProjectForm = ({
//   profileInput,
//   setProfileInput,
//   handleSubmit,
//   loading,
// }) => {
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setProfileInput((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   return (
//     <>
//       <Label htmlFor="companyName">Company Name</Label>
//       <Input
//         type="text"
//         id="companyName"
//         value={profileInput.companyName}
//         onChange={handleChange}
//       />
//       <Label htmlFor="projectName">Project Name</Label>
//       <Input
//         type="text"
//         id="projectName"
//         value={profileInput.projectName}
//         onChange={handleChange}
//       />
//       <Label htmlFor="roleDescription">Role Description</Label>
//       <Input
//         type="text"
//         id="roleDescription"
//         value={profileInput.roleDescription}
//         onChange={handleChange}
//       />
//       <Label htmlFor="additionalField1">Additional Field 1</Label>
//       <Input
//         type="text"
//         id="additionalField1"
//         value={profileInput.additionalField1}
//         onChange={handleChange}
//       />
//       <Label htmlFor="additionalField2">Additional Field 2</Label>
//       <Input
//         type="text"
//         id="additionalField2"
//         value={profileInput.additionalField2}
//         onChange={handleChange}
//       />
//       {/* Add other fields as needed */}
//       <Button onclick={
//         () => handleSubmit()
//       } type="submit" className="w-full mt-4" disabled={loading}>
//         {loading ? <Spinner /> : "Submit"}
//       </Button>
//     </>
//   );
// };

// export default CompanyAndProjectForm;
