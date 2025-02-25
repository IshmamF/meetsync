"use client";

import { useState } from "react";
import { SignupForm } from "./_components/signupForm";
import { signup, checkUsernameExists } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      toast.error("Passwords do not match", {duration:2000});
      return;
    }

    const usernameExists = await checkUsernameExists(formData.name);

    if (!usernameExists.success) {
      toast.error(usernameExists.error!);
      return;
    }


    if (usernameExists.exists) {
      toast.error('username already exists');
      return;
    }

    try {
      const message = await signup(formData);
      if (message == 'success') {
        router.push("/google");
      } else {
        toast.error(`${message}`, {duration:2000});
      }
    } catch (error) {
      toast.error("Something went wrong: " + String(error), {duration:2000});
    }
  };

  return (
    <>
      <div className="bg-lightBlue min-h-screen flex flex-col gap-6 justify-center items-center">
        <div>
          <div className="text-5xl font-bold text-jetBlack pb-4 text-center">Sign Up</div>
          <SignupForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
