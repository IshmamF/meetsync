"use client";

import { useState } from "react";
import { SignupForm } from "./_components/signupForm";

export default function Signup() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const toggleNext = () => {
    console.log("next");
  };
  return (
    <div>
      <SignupForm
        formData={formData}
        handleInputChange={handleInputChange}
        toggleNext={toggleNext}
      />
      ;
    </div>
  );
}
