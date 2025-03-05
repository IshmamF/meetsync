import React from "react";

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      className="w-full placeholder:text-slate-400 text-black text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      placeholder={placeholder}
    />
  );
}

export default Input;
