import React, { useEffect, useState } from "react";
import Form from "../../components/Form.jsx";
import { otpValidationSchema } from "../../validationSchemas";
import { useRegisterMutation, useResendotpMutation } from "../../redux/slices/userApiSlices.js";
import { errorToast, successToast } from "../../components/toast/index.js";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/slices/authUser.js";
const VerifyOtp = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState(295);
  const [resendOtp] = useResendotpMutation();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1 )
    }, 1000)
    

    return () => clearInterval(timer);
  }, [timeLeft])


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  const formFields = [
    {
      name: "otp",
      label: "OTP",
      placeholder: "Enter One Time Password",
      type: "text",
      required: true,
    },
    {
      name: "referral",
      label: "Referral",
      placeholder: "Enter referral code (optional)",
      type: "text",
    },
  ];

 
  
  const handleResend = async () => {
    try {
      const result = await resendOtp({id});
      successToast("OTP resent successfully");
      setTimeLeft(295);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to resend OTP";
      errorToast(errorMessage);
      console.log(error); 
    }
  };


  const extraLinks = [
    {
      text: `${timeLeft === 0 ? "" : "OTP expires in " + formatTime(timeLeft)}`,
      linkText: `${
        timeLeft === 0 ? "OTP Expired. Please request a new one." : ""
      }`,
      onclick: handleResend,
    },
  ];


  const handleSubmit = async (data) => {
    try {
      const res = await register({ data, id }).unwrap();
      dispatch(userLogin({ ...res }));
      successToast("User registered successfull");
      navigate("/user");
    } catch (error) {
      errorToast(
        error?.data?.message || error.message || "Failed to register user"
      );
      console.log(error);
    }
  };
  return (
    <div className="mt-56">
      <Form
        title="Verilfy OTP"
        fields={formFields}
        onSubmit={handleSubmit}
        extraLinks={extraLinks}
        buttonText="Submit"
        validationRules={otpValidationSchema}
      />
    </div>
  );
};

export default VerifyOtp;
