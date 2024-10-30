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
        dateOfBirth: user.profile?.dateOfBirth || "",
        gender: user.gender || "",
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
      const id = users?.id || users?.profile?.id; // Optional chaining for safety
      console.log("====================================++++++");
      console.log(id);
      console.log("====================================");

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
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div
        className="relative bg-cover bg-center lg:h-auto h-64 overflow-hidden"
        style={{
          backgroundImage: `url('/Img/Login.png')`,
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
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white tracking-wide leading-tight 
             transition-all duration-200 ease-in-out mb-4 md:mb-6"
          >
            {step === "sendOtp"
              ? "Login"
              : step === "verifyOtp"
              ? "OTP Verification"
              : "Complete Your Profile"}
          </h1>

          <form onSubmit={submitHandler}>
            {step === "sendOtp" && (
              <div className="w-full bg-white shadow-lg rounded-lg p-3 sm:p-4 md:p-6 lg:p-8 mx-auto max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
                {/* Header with Icon and Title */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <FaWhatsapp className="text-green-500 mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                    WhatsApp Number
                  </h2>
                </div>

                {/* Input Field */}
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
                  <PhoneInput
                    placeholder="Enter WhatsApp Number"
                    value={input.whatsappNumber}
                    defaultCountry="IN"
                    onChange={(phone) =>
                      setInput({ ...input, whatsappNumber: phone })
                    }
                    className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-xs sm:text-sm mb-2">
                    {error}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-3 sm:mt-4 py-2 sm:py-2.5 md:py-3 rounded-lg text-white font-medium 
                          ${
                            loading
                              ? "bg-gray-400"
                              : "bg-slate-900 hover:bg-slate-800"
                          } 
                          transition-all duration-200 ease-in-out shadow-sm focus:outline-none 
                          focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm sm:text-base`}
                >
                  {loading ? <Spinner /> : "Send OTP"}
                </button>
              </div>
            )}

            {step === "verifyOtp" && (
              <div className="w-full bg-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8">
                <div className="mb-4">
                  <label className="block text-gray-800 font-semibold text-lg md:text-xl mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={input.otp}
                    onChange={(e) =>
                      setInput({ ...input, otp: e.target.value })
                    }
                    required
                    autoFocus
                    placeholder="Enter the OTP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 text-gray-700"
                  />
                </div>

                {/* Countdown Timer or Resend Button */}
                <div className="text-center mt-2">
                  {timer > 0 ? (
                    <p className="text-sm font-semibold text-gray-600 bg-gray-100 inline-block px-4 py-2 rounded-lg">
                      Resend OTP in{" "}
                      <span className="text-blue-500">{timer}</span> seconds
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors duration-150"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                {/* Verify OTP Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-6 py-2 md:py-3 rounded-lg text-white font-medium transition-all duration-200 ease-in-out 
                             ${
                               loading
                                 ? "bg-gray-400"
                                 : "bg-blue-500 hover:bg-blue-600"
                             } 
                             shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {loading ? <Spinner /> : "Verify OTP"}
                </button>
              </div>
            )}

            {step === "profileUpdate" && (
              <>
                <div className="w-full bg-white shadow-md rounded-lg p-4 md:p-6 lg:p-8 mx-auto max-w-lg">
                  {/* Heading */}
                  {/* <h1 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-6">
                    Complete Your Profile
                  </h1> */}

                  <div className="flex flex-col gap-4">
                    {/* Profile Type Selection */}
                    <Label className="mt-2 text-lg">
                      Signing up for <span className="text-red-600">*</span>
                    </Label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
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
                          className="mr-2"
                        />
                        <span>Myself</span>
                      </label>
                      <label className="flex items-center">
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
                          className="mr-2"
                        />
                        <span>My Child</span>
                      </label>
                    </div>

                    <div className="max-md:block flex gap-5">
                      {/* First Name */}
                      <div className="my-2">
                        <Label>
                          First Name <span className="text-red-600">*</span>
                        </Label>
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
                          placeholder="Enter your first name"
                          className="mt-1 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      {/* Last Name */}
                      <div className="my-2">
                        <Label>
                          Last Name <span className="text-red-600">*</span>
                        </Label>
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
                          className="mt-1 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="my-2">
                      <Label>
                        Email <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        type="email"
                        value={profileInput.email}
                        onChange={(e) =>
                          setProfileInput({
                            ...profileInput,
                            email: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter your email"
                        className="mt-1 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="my-2">
                      <Label className="block my-2">Date of Birth</Label>
                      <DOBPicker
                        value={profileInput?.dateOfBirth}
                        onDateChange={(date) => {
                          if (date) {
                            setProfileInput({
                              ...profileInput,
                              dateOfBirth: date.toISOString().split("T")[0],
                            });
                          }
                        }}
                      />
                    </div>

                    {/* Gender */}
                    <div className="my-2">
                      <Label>
                        Gender <span className="text-red-600">*</span>
                      </Label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
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
                            className="mr-2"
                          />
                          <span>Male</span>
                        </label>
                        <label className="flex items-center">
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
                            className="mr-2"
                          />
                          <span>Female</span>
                        </label>
                        <label className="flex items-center">
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
                            className="mr-2"
                          />
                          <span>Other</span>
                        </label>
                      </div>
                    </div>

                    {/* Hidden Role Selection */}
                    <div className="hidden gap-4">
                      <label className="flex items-center">
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
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="crew"
                          onChange={() => setSelectedRole("crew")}
                          required
                          className="hidden"
                        />
                        Crew
                      </label>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-6 py-3 rounded-lg text-white font-medium bg-slate-900 hover:bg-slate-800 transition-all duration-200 shadow-md focus:ring-2 focus:ring-slate-500"
                    >
                      {loading ? <Spinner /> : "Update Profile"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
