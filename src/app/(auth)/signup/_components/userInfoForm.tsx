"use client";

interface SignupFormProps {
  formData: Record<string, string>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleForm: (event: React.FormEvent<HTMLFormElement>) => void;
  setButtonClicked: (value: string | ((buttonClicked: string) => string)) => void;
}

export const UserInfoForm: React.FC<SignupFormProps> = ({
  formData,
  handleInputChange,
  toggleForm,
  setButtonClicked
}) => {
  return (
    <div>
      <form
        onSubmit={toggleForm}
        className="flex flex-col w-[300px] md:w-[400px] text-jetBlack"
      >
        <label className="text-2xl font-bold mb-2" htmlFor="name">
          Address
        </label>
        <input
          className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="address"
          name="address"
          type="text"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <label className="text-2xl font-bold mb-2" htmlFor="email">
          Transport
        </label>
        <input
          className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="transport"
          name="transport"
          type="text"
          placeholder="Enter your preferred mode of transport"
          value={formData.transport}
          onChange={handleInputChange}
          required
        />
        <div className="flex gap-2 items-center justify-center w-full mt-3">
            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            <div className="w-3 h-3 rounded-full bg-black"></div>
        </div>
        <div className="flex gap-4">
            <button id='previous' onClick={() => setButtonClicked('previous')} name='previousButton' value='Toggles form' className="w-full mt-3 h-14 flex justify-center items-center rounded-md bg-darkBlue text-lightBlue hover:text-jetBlack hover:bg-gold transition-colors duration-300">
                <p className="font-bold text-base md:text-xl">Previous</p>
            </button>
            <button id='submit' onClick={() => setButtonClicked('submit')} name='submitButton' value='Submits form' className="w-full mt-3 h-14 flex justify-center items-center rounded-md bg-darkBlue text-lightBlue hover:text-jetBlack hover:bg-gold transition-colors duration-300">
                <p className="font-bold text-base md:text-xl">Submit</p>
            </button>
        </div>
      </form>
    </div>
  );
};
