'use client';

import { UserInfoForm } from './components/userInfoForm';
import {SaveUserPrefData} from './actions';
import { signIn } from "next-auth/react";
import { useState } from 'react';

export default function CalendarPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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

      if (loading) return;

      setLoading(true);

      const response = await SaveUserPrefData(formData);
      if (response.error) {
        console.error(response.error);
        setLoading(false);
        return;
      }

      await signIn("google", { callbackUrl: process.env.NEXTAUTH_URL });

  };

  return (
    <div className="bg-lightBlue min-h-screen flex flex-col gap-6 justify-center items-center">
      <div className="text-5xl font-bold text-jetBlack pb-4">Information</div>
      <UserInfoForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      loading={loading}/>
    </div>
  )
}
