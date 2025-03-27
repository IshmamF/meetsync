import {
  AddressAutofill,
  AddressAutofillRetrieveResponse,
} from "@mapbox/search-js-react";

type UserFormData = {
  address: string;
  transport: string;
};

interface UserInfoFormProps {
  formData: UserFormData;
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({
  formData,
  setFormData,
  handleInputChange,
  handleSubmit,
  loading,
}) => {
  const handleAddress = (res: AddressAutofillRetrieveResponse) => {
    const address = res.features[0]?.properties.place_name || "Unknown address";
    // we have to wait just a small amount for maxbox to input the half address
    // so then we can replace it with the full. I couldn't find another way around that
    setTimeout(() => {
      setFormData((prevData) => ({
        ...prevData,
        address,
      }));
    }, 1);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[300px] md:w-[400px] text-jetBlack"
      >
        <label className="text-2xl font-bold mb-2" htmlFor="address">
          Address
        </label>
        {/* @ts-ignore */}
        <AddressAutofill
          onRetrieve={handleAddress}
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
        >
          <input
            className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5 w-full"
            id="address"
            name="address"
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </AddressAutofill>

        <label className="text-2xl font-bold mb-2" htmlFor="transport">
          Transport
        </label>
        <select
          id="transport"
          value={formData.transport}
          name="transport"
          onChange={handleInputChange}
          required
          className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="transit">Transit</option>
          <option value="cycling">Cycling</option>
          <option value="driving">Driving</option>
          <option value="walking">Walking</option>
        </select>
        <div className="flex gap-2 items-center justify-center w-full mt-3">
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
          <div className="w-3 h-3 rounded-full bg-black"></div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="text-2xl font-bold flex items-center">
            Google Calendar
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-4 py-2 border flex gap-2 rounded-2xl bg-black dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <>
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                {loading ? (
                  <span className="text-white">Connecting...</span>
                ) : (
                  <span className="text-white">Connect</span>
                )}
              </>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
