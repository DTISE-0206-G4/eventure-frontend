import { FC } from "react";

interface DicountCardProps {
  title: string;
  description: string;
  amount: number;
  isPercentage: boolean;
  available: number;
  code: string;
  expiredAt: string;
  isReleased: boolean;
  isClosed: boolean;
  onEdit: () => void;
  onRelease: () => void;
  onClose: () => void;
  onDelete: () => void;
}

const DicountCard: FC<DicountCardProps> = ({
  title,
  description,
  amount,
  isPercentage,
  available,
  code,
  expiredAt,
  isReleased,
  isClosed,
  onEdit,
  onRelease,
  onClose,
  onDelete
}) => {
  return (
    <div className="border border-red-600 rounded-lg py-2 px-5 text-center w-fit">
      <div className="font-semibold text-lg">{title}</div>
      <div>{description}</div>
      <div>Amount: {amount}</div>
      <div>Available: {available}</div>
      <div>Code: {code}</div>
      <div>Expired At: {expiredAt}</div>
      {/* <div>{price}</div> */}
      <div className="flex gap-2 mt-2 flex-wrap justify-center">
      <button
          className={`${isReleased ? "bg-slate-500" : "bg-true-blue"} rounded-lg py-2 px-5 text-white`}
          onClick={onEdit}
          disabled={isReleased ? true : false} // Disable edit button if released
        >
          Edit
        </button>
        <button
          className={`${isReleased ? "bg-slate-500" : "bg-true-blue"} rounded-lg py-2 px-5 text-white`}
          onClick={onRelease}
          disabled={isReleased ? true : false} // Disable release button if already released
        >
          {isReleased ? "Released" : "Release"} {/* Change button text based on release status */}
        </button>
        <button
          className="border border-red-500 rounded-lg py-2 px-5 text-red-500"
          onClick={onClose}
        >
          Close
        </button>
        <button
          // className="border border-red-500 rounded-lg py-2 px-5 text-white bg-red-700"
          className={`${isReleased ? "bg-slate-500" : "bg-red-700"} border border-red-500 rounded-lg py-2 px-5 text-white `}
          onClick={onDelete}
          disabled={isReleased ? true : false} 
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DicountCard;