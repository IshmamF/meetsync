"use client";

type SignupFormData = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
};

interface SignupFormProps {
  formData: SignupFormData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[300px] md:w-[400px] text-jetBlack"
      >
        <label className="text-2xl font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <label className="text-2xl font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="username"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label className="text-2xl font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <label className="text-2xl font-bold mb-2" htmlFor="password">
          Confirm Password
        </label>
        <input
          className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <div className="flex gap-2 items-center justify-center w-full mt-3">
          <div className="w-3 h-3 rounded-full bg-black"></div>
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
        </div>
        <button className="w-full mt-3 h-14 flex justify-center items-center rounded-md bg-darkBlue text-lightBlue hover:text-jetBlack hover:bg-gold transition-colors duration-300">
          <p className="font-bold text-base md:text-xl">Next</p>
        </button>
      </form>
    </div>
  );
};
