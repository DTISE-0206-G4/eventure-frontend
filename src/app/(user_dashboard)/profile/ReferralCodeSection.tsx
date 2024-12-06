const ReferralCodeSection = ({ profile }: any) => {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <div className="text-lg font-medium text-slate-gray">
        Referral Code Setting
      </div>
      <div className="flex gap-5 justify-start">
        <div className="w-full">
          <label
            className="block text-slate-gray text-sm font-bold mb-2"
            htmlFor="referralCode"
          >
            Referral Code
          </label>
          <div className="flex gap-5 w-full">
            <input
              className="shadow appearance-none border border-platinum rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-azureish-white"
              name="referralCode"
              type="text"
              placeholder="Referral Code"
              value={profile?.referralCode}
              disabled
            />
            <button className="bg-white rounded-lg px-5 py-2 border border-platinum font-semibold text-nowrap">
              Change referral code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCodeSection;
