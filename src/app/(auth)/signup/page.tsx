"use client";

import { useState } from "react";
import { SignupForm } from "./_components/signupForm";
import { signup } from "./actions";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";



export default function Signup() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
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
      // todo: display error
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const message = await signup(formData);
      if (message == 'success') {
        router.push("/calendar");
      } else {
        //console.error(response.error?.message);
        setErrorMsg(message);

      }
    } catch (error) {
      throw error;
      //router.push("/error");
    }
  };

  return (
    <>
      {errorMsg &&
        (<div className="flex justify-center items-center">
          <Alert className='fixed top-14 bg-white max-w-sm text-center animate-fadeIn' variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {errorMsg}
            </AlertDescription>
          </Alert>
        </div>)
      }
      <div className="bg-lightBlue min-h-screen flex flex-col gap-6 justify-center items-center">
        <div>
          <div className="text-5xl font-bold text-jetBlack pb-4">Sign Up</div>
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
