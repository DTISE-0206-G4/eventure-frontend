import { FC } from "react";

interface TicketCardProps {
  title: string;
  available: number;
  sold: number;
  price: string;
  onEdit: () => void;
  isReleased: boolean;
  onRelease: () => void;
  isClosed: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const TicketCard: FC<TicketCardProps> = ({
  title,
  available,
  sold,
  price,
  onEdit,
  onRelease,
  onClose,
  onDelete,
  isReleased,
  isClosed,
}) => {
  return (
    <div className="border border-platinum hover:cursor-pointer hover:bg-azureish-white rounded-lg py-2 px-5 text-center w-fit">
      <div className="font-semibold text-lg">{title}</div>
      <div>Available : {available}</div>
      <div>Sold : {sold}</div>
      <div>{price}</div>
      <div className="flex gap-2 mt-2 flex-wrap justify-center">
        <button
          className={`${
            isReleased ? "bg-slate-500" : "bg-true-blue"
          } rounded-lg py-2 px-5 text-white`}
          onClick={onEdit}
          disabled={isReleased ? true : false} // Disable edit button if released
        >
          Edit
        </button>
        <button
          className={`${
            isReleased ? "bg-slate-500" : "bg-true-blue"
          } rounded-lg py-2 px-5 text-white`}
          onClick={onRelease}
          disabled={isReleased ? true : false} // Disable release button if already released
        >
          {isReleased ? "Released" : "Release"}{" "}
          {/* Change button text based on release status */}
        </button>
        <button
          className={`${
            isClosed ? "bg-slate-500" : "bg-red-700"
          } rounded-lg py-2 px-5 text-white `}
          onClick={onClose}
        >
          Close
        </button>
        <button
          // className="border border-red-500 rounded-lg py-2 px-5 text-white bg-red-700"
          className={`${
            isReleased ? "bg-slate-500" : "bg-red-700"
          } rounded-lg py-2 px-5 text-white `}
          onClick={onDelete}
          disabled={isReleased ? true : false}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
