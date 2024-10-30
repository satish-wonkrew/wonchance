"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Spinner from "@/components/ui/spinner";
import Confetti from "react-confetti";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "react-datepicker/dist/react-datepicker.css";
import { PhoneInput } from "@/components/ui/phone-input";
import { FaWhatsapp } from "react-icons/fa";
import OTPInput from "@/components/ui/OTPInput";
import DatePicker from "react-datepicker";
import DOBPicker from "@/components/etc/DateofBirth";
const Login = () => {
  const [input, setInput] = useState({
    whatsappNumber: "",
    otp: "",
  });
  const [profileInput, setProfileInput] = useState({
    firstName: "",
    lastName: "",
    ageGroup: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    role: "talent", // Add a role field to the profileInput state
  });
  console.log("====================================");
  console.log(profileInput);
  console.log("====================================");
  const [step, setStep] = useState("sendOtp");
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedRole, setSelectedRole] = useState("talent");
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const { user } = useUser(); // Custom hook for user data
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userProfile = JSON.parse(localStorage.getItem("user"));
          if (userProfile && userProfile.email) {
            await router.push("/");
          } else if (userProfile) {
            setStep("profileUpdate");
          } else {
            setStep("sendOtp");
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          setError("Unable to fetch profile data. Please try again.");
        }
      } else {
        setStep("sendOtp");
      }
    };
    initializeUser();
  }, [router]);

  useEffect(() => {
    if (user && step === "profileUpdate") {
      setProfileInput({
        fitstName: user.profile?.firstName || "",
        lastName: user.profile?.lastName || "",
        ageGroup: user.ageGroup || "",
        email: user.email || "",
        gender: user.gender || "",
        dateOfBirth: user.profile?.dateOfBirth || "",
        role: user.role || "talent",
      });
      setSelectedRole(user.role || "talent"); // Set role if it exists
    }
  }, [user, step]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // Hide confetti after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const startTimer = () => {
    setTimer(60);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/send-otp`,
        { whatsappNumber: input.whatsappNumber },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) {
        setStep("verifyOtp");
        startTimer();
        toast.success(res.data.message);
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(
        error.response?.data?.message || "An error occurred while sending OTP."
      );
      toast.error(
        error.response?.data?.message || "An error occurred while sending OTP."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const verifyOtp = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/verify-otp`,
        { whatsappNumber: input.whatsappNumber, otp: input.otp },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) {
        const userData = res.data.user;
        const token = res.data.token;
        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);

        setShowConfetti(true);

        // Redirect based on user profile status
        setTimeout(() => {
          if (!userData.email) {
            setStep("profileUpdate");
            /// Reload Page
            // setTimeout(() => {
            //   window.location.reload();
            // }, 200);
          } else if (
            userData.firstName &&
            userData.email &&
            userData.gender &&
            userData.role
          ) {
            if (userData.role === "talent") {
              router.push("/casting-call");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              router.push("/");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          } else {
            router.push("/");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
          toast.success("Logged in successfully!");
        }, 3000);
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while verifying OTP."
      );
      toast.error(
        error.response?.data?.message ||
          "An error occurred while verifying OTP."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateProfileWithRole = async () => {
    dispatch(setLoading(true));

    try {
      const token = localStorage.getItem("token");
      const userDatas = localStorage.getItem("user");

      if (!userDatas || !token) {
        throw new Error("No token available.");
      }

      const users = JSON.parse(userDatas);
      const id = users?.profile?._id || users?._id; // Optional chaining for safety

      // Ensure required data is available
      if (!profileInput) {
        throw new Error("Profile data or role selection is missing.");
      }

      const payload = { ...profileInput, role: selectedRole };

      const res = await axios.put(
        `${USER_API_END_POINT}/logupdate/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success
      if (res?.data?.success) {
        const updatedUser = res.data.user;
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully!");

        // Redirect based on the role
        handleRedirect(selectedRole);
      } else {
        handleError(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while updating the profile.";
      handleError(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Helper functions to keep the main logic clean

  const handleRedirect = (role) => {
    if (role === "talent") {
      router.push("/userForm");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (role === "crew") {
      router.push("/waitting");
    } else {
      router.push("/waitting"); // Default path
    }
  };

  const handleError = (message) => {
    setError(message);
    toast.error(message);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (step === "sendOtp") {
      sendOtp();
    } else if (step === "verifyOtp") {
      verifyOtp();
    } else if (step === "profileUpdate") {
      updateProfileWithRole();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div
        className="relative bg-cover bg-center lg:h-auto h-64 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url('/Img/Login.png')`,
          borderRadius: "0 10px 10px 0",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80"></div>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 lg:p-12 max-w-lg w-full space-y-8 relative">
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={500}
              gravity={0.3}
            />
          )}
          <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white tracking-wide">
            {step === "sendOtp"
              ? "Login or Sign Up"
              : step === "verifyOtp"
              ? "OTP Verification"
              : "Complete Your Profile"}
          </h1>

          <form onSubmit={submitHandler}>
            {step === "sendOtp" && (
              <div className="w-full">
                <div className="flex items-center">
                  <FaWhatsapp className="text-green-500 mr-2 h-6 w-6" />
                  <Label>WhatsApp Number</Label>
                </div>

                <div className="flex items-center p-2">
                  <PhoneInput
                    placeholder="Whatsapp Number"
                    value={input.whatsappNumber}
                    defaultCountry="IN"
                    onChange={(phone) =>
                      setInput({ ...input, whatsappNumber: phone })
                    }
                    className="flex-1" // Ensures the PhoneInput takes the remaining space
                  />
                </div>

                <p className="text-red-500 text-sm">{error}</p>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6"
                >
                  {loading ? <Spinner /> : "Send OTP"}
                </Button>
              </div>
            )}

            {step === "verifyOtp" && (
              <>
                <Label>OTP</Label>
                <Input
                  type="text"
                  value={input.otp}
                  onChange={(e) => setInput({ ...input, otp: e.target.value })}
                  required
                  placeholder="Enter the OTP"
                />
                {/* <div className="flex flex-col items-center">
                  <h2 className="text-lg mb-4">Enter OTP</h2>
                  <OTPInput
                    value={input.otp}
                    type=""
                    onChange={(e) =>
                      setInput({ ...input, otp: e.target.value })
                    }
                  />
                  <button
                    onClick={() => console.log(otp)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Verify OTP
                  </button>
                </div> */}
                {timer > 0 && (
                  <p className="text-gray-600 text-sm">
                    Resend OTP in {timer} seconds
                  </p>
                )}
                {timer === 0 && (
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="text-blue-600"
                  >
                    Resend OTP
                  </button>
                )}
                <p className="text-red-500 text-sm">{error}</p>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6"
                >
                  {loading ? <Spinner /> : "Verify OTP"}
                </Button>
              </>
            )}

            {step === "profileUpdate" && (
              <>
                <div className="flex flex-row justify-between gap-2">
                  <div className="block w-full my-2">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      value={profileInput.firstName}
                      onChange={(e) =>
                        setProfileInput({
                          ...profileInput,
                          firstName: e.target.value,
                        })
                      }
                      required
                      placeholder="Enter your User name"
                    />
                  </div>
                  <div className="block w-full my-2">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      value={profileInput.lastName}
                      onChange={(e) =>
                        setProfileInput({
                          ...profileInput,
                          lastName: e.target.value,
                        })
                      }
                      required
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profileInput.email}
                  onChange={(e) =>
                    setProfileInput({ ...profileInput, email: e.target.value })
                  }
                  required
                  placeholder="Enter your email"
                  className="rounded-full "
                />
                {/* <div className="my-2">
                  <Label className="block my-2">Date of Birth</Label>
                  <DOBPicker
                    // value={formData.profile?.dateOfBirth} // Ensure this is a string or null
                    onDateChange={(date) => {
                      if (date) {
                        setProfileInput({
                          ...profileInput,
                          dateOfBirth: date.toISOString().split("T")[0],
                        });
                      }
                    }}
                  />
                </div> */}
                <Label>Gender</Label>
                {/* Radio Button */}
                <div className="flex gap-2">
                  <input
                    type="radio"
                    value="male"
                    checked={profileInput.gender === "male"}
                    onChange={(e) =>
                      setProfileInput({
                        ...profileInput,
                        gender: e.target.value,
                      })
                    }
                    required
                  />
                  <span>Male</span>
                  <input
                    type="radio"
                    value="female"
                    checked={profileInput.gender === "female"}
                    onChange={(e) =>
                      setProfileInput({
                        ...profileInput,
                        gender: e.target.value,
                      })
                    }
                    required
                  />
                  <span>Female</span>
                  <input
                    type="radio"
                    value="other"
                    checked={profileInput.gender === "other"}
                    onChange={(e) =>
                      setProfileInput({
                        ...profileInput,
                        gender: e.target.value,
                      })
                    }
                    required
                  />
                  <span>Other</span>
                </div>

                {/* Profile Type Adult Or Kid Radio Buutn */}
                <Label className="mt-3">My Self or Child</Label>
                <span className="text-red-600">*</span>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    value="adult"
                    checked={profileInput.ageGroup === "adult"}
                    onChange={(e) =>
                      setProfileInput({
                        ...profileInput,
                        ageGroup: e.target.value,
                      })
                    }
                    required
                  />
                  <span>Adult</span>
                  <input
                    type="radio"
                    value="kid"
                    checked={profileInput.ageGroup === "kid"}
                    onChange={(e) =>
                      setProfileInput({
                        ...profileInput,
                        ageGroup: e.target.value,
                      })
                    }
                    required
                  />
                  <span>Kid</span>
                </div>

                {/* <Input
                  type="date"
                  value={
                    profileInput.dateOfBirth
                      ? new Date(profileInput.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setProfileInput({
                      ...profileInput,
                      dateOfBirth: e.target.value, // Date in 'YYYY-MM-DD' format
                    })
                  }
                  required
                /> */}

                {/* <Label>Role</Label> */}
                <div className="flex gap-4 mb-4 hidden">
                  <label>
                    <input
                      type="radio"
                      value="talent"
                      checked={selectedRole === "talent"}
                      onChange={() => setSelectedRole("talent")}
                      required
                      className="hidden"
                    />
                    Talent
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="talent"
                      onChange={() => setSelectedRole("crew")}
                      required
                      className="hidden"
                    />
                    Crew
                  </label>
                </div>
                <p className="text-red-500 text-sm">{error}</p>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6"
                >
                  {loading ? <Spinner /> : "Update Profile"}
                </Button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
