"use client";

import { useState } from "react";
import { SignupForm } from "./_components/signupForm";
import { signup } from "./actions";
import { useRouter } from "next/navigation";
import { revalidatePath } from 'next/cache';
import { UserInfoForm } from "./_components/userInfoForm";

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
  const [nextForm, setNextForm] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to toggle which form user is on 
  const toggleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // todo: instead of just submitting need to add user setup logic here
    // ie show next form and then submit on completion of that one

    if (formData.password != formData.confirmPassword) {
      // todo: display error
      return;
    }

    const buttonName = e.nativeEvent.submitter.name;

    // We toggle forms only when previous button is clicked or when we're on signup form
    if (buttonName == 'previousButton' || !nextForm) {
      setNextForm(!nextForm);
    } else {
      handleSubmit(e);
    }

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await signup(formData);
      if (user) {
        revalidatePath('/', 'layout');
        router.push("/");
      }
    } catch (error) {
      router.push("/error");
    }

  };

  return (
    <div className="bg-lightBlue min-h-screen flex flex-col gap-6 justify-center items-center">
      <div className="text-5xl font-bold">Sign Up</div>
      {!nextForm ? 
        <SignupForm
          formData={formData}
          handleInputChange={handleInputChange}
          toggleForm={toggleForm}
        /> : 
        <UserInfoForm
          formData={formData}
          handleInputChange={handleInputChange}
          toggleForm={toggleForm}
        /> }
    </div>
  );
}
