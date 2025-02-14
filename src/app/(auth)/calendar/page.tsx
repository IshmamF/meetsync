'use client'

import { CalendarOAuth } from "./actions";
import { UserInfoForm } from './components/userInfoForm';
import { useState } from 'react'
import { useRouter } from "next/navigation";

export default function CalendarPage() {
    const router = useRouter();
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

        const url = await CalendarOAuth();
        router.push(url)
    };

  return (
    <UserInfoForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
    />
  )
}
