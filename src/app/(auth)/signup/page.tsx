"use client";

import { useState } from "react";
import { SignupForm } from "./_components/signupForm";
import { signup } from "./actions";
import { useRouter } from "next/navigation";
import { revalidatePath } from 'next/cache';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      // todo: display error
      return;
    }

    try {
      const user = await signup(formData);
      if (user) {
        revalidatePath('/', 'layout');
        router.push("/calendar");
      }
    } catch (error) {
      router.push("/error");
    }
  };

  return (
    <div className="bg-lightBlue min-h-screen flex flex-col gap-6 justify-center items-center">
      <div className="text-5xl font-bold text-jetBlack">Sign Up</div>
        <SignupForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        /> 
        {/* <UserInfoForm
          formData={formData}
          handleInputChange={handleInputChange}
          toggleForm={toggleForm}
          setButtonClicked={setButtonClicked}
        /> */}
    </div>
  );
}
