import Image from "next/image";

const ProfileImageSection = () => {
  return (
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
        </div>
      </div>
    </div>
  );
};

export default ProfileImageSection;
