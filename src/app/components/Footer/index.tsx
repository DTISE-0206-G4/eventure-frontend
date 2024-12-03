import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="my-5">
      <span className="block text-center text-sm text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} Eventure.inc, All rights reserved.{" "}
      </span>
    </div>
  );
};
export default Footer;
