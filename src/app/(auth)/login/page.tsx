"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "./_components/loginForm";
import { revalidatePath } from 'next/cache';
import { login } from "./actions";
import { toast } from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const info = await login(formData);
      if (info.success) {
        revalidatePath('/', 'layout');
        router.push("/");
      } else {
        toast.error(info.errorMsg!, {duration:2000});
      }
    } catch (error) {
      toast.error("Something went wrong: " + String(error), {duration:2000});
    }
  };

  return (
    <div className="bg-lightBlue min-h-screen flex flex-col gap-6 justify-center items-center">
      <div className="text-5xl font-bold text-jetBlack">Log In</div>
      <LoginForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
