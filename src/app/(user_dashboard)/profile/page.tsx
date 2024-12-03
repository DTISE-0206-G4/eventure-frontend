import Image from "next/image";

const ProfilePage = () => {
  return (
    <>
      <div className="font-semibold text-xl">Profile Settings</div>
      <div className="mt-5 flex flex-col gap-2">
        <div className="text-lg font-medium text-slate-gray">Profile Image</div>
        <div className="flex gap-5">
          <Image
            className="rounded-md"
            src="/images/default-profile.jpg"
            width={150}
            height={150}
            alt="User Profile"
          />
          <div className="flex flex-col justify-center gap-5">
            <button className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold">
              Change image
            </button>
            <button className="bg-white rounded-lg px-5 py-2 border border-platinum text-red-500 font-semibold">
              Delete image
            </button>
            {/* <div>Gora Asep</div>
                <div className="text-slate-gray text-xs">ATTENDEE</div> */}
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <div className="text-lg font-medium text-slate-gray">
          Profile Details
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div>
            <label
              className="block text-slate-gray text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-azureish-white"
              name="name"
              type="text"
              placeholder="Your email"
              defaultValue={"test@email.com"}
              disabled
            ></input>
          </div>
          <div>
            <label
              className="block text-slate-gray text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border border-platinum rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="name"
              type="text"
              placeholder="Your name"
              defaultValue={"Gora Asep"}
            ></input>
          </div>
          <div>
            <label
              className="block text-slate-gray text-sm font-bold mb-2"
              htmlFor="description"
            >
              Profile Description
            </label>
            <textarea
              name="description"
              id=""
              className="shadow appearance-none border border-platinum rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <div className="text-lg font-medium text-slate-gray">
            Refferal Code Setting
          </div>
          <div className="flex gap-5 justify-start">
            <div>
              <label
                className="block text-slate-gray text-sm font-bold mb-2"
                htmlFor="referralCode"
              >
                Refferal Code
              </label>
              <div className="flex gap-5 items-center">
                <input
                  className="shadow appearance-none border border-platinum rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  name="referralCode"
                  type="text"
                  placeholder="Referral Code"
                  defaultValue={"GORAASEPUHUY"}
                ></input>
                <button className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap">
                  Check availability
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button className="bg-true-blue text-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap">
            Save changes
          </button>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
