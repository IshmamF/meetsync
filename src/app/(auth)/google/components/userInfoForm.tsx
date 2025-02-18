
interface SignupFormProps {
  formData: Record<string, string>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export const UserInfoForm: React.FC<SignupFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  loading,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
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
        <div className='flex justify-between mb-2'>
            <div className='text-2xl font-bold flex items-center'>Google Calendar</div>
            <div className="flex items-center justify-center">
                <button type="submit" className="px-4 py-2 border flex gap-2 rounded-2xl bg-black dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                  <>
                      <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                      {loading ? (<span className="text-white">Connecting...</span>) : (<span className="text-white">Connect</span>)}
                  </>
                </button>
            </div>
        </div>
      </form>
    </div>
  );
};
