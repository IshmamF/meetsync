"use client";

interface LoginFormProps {
  formData: Record<string, string>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
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
        <label className="text-2xl font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label className="text-2xl font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="border-2 border-jetBlack text-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button className="w-full mt-3 h-14 flex justify-center items-center rounded-md bg-darkBlue text-lightBlue hover:text-jetBlack hover:bg-gold transition-colors duration-300">
          <p className="font-bold text-base md:text-xl">Log In</p>
        </button>
      </form>
    </div>
  );
};
