"use client";

import { useState } from "react";
import { SignupForm } from "./_components/signupForm";
import { signup } from "./actions";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    transport: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // todo: instead of just submitting need to add user setup logic here
    // ie show next form and then submit on completion of that one
    handleSubmit(e);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      // todo: display error
      return;
    }

    try {
      const user = await signup(formData);
      if (user) router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-lightBlue min-h-screen flex flex-col gap-6 justify-center items-center">
      <div className="text-5xl font-bold">Sign Up</div>
      <SignupForm
        formData={formData}
        handleInputChange={handleInputChange}
        toggleNext={toggleNext}
      />
      ;
    </div>
  );
}
