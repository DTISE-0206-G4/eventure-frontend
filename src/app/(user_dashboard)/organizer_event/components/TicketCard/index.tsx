import { FC } from "react";

interface TicketCardProps {
  title: string;
  available: number;
  sold: number;
  price: string;
  onEdit: () => void;
  onRelease: () => void;
  onClose: () => void;
  
}

const TicketCard: FC<TicketCardProps> = ({
  title,
  available,
  sold,
  price,
  onEdit,
  onRelease,
  onClose,
  
}) => {
  return (
    <div className="border border-red-600 rounded-lg py-2 px-5 text-center w-fit">
      <div className="font-semibold text-lg">{title}</div>
      <div>Available : {available}</div>
      <div>Sold: {sold}</div>
      <div>{price}</div>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-true-blue rounded-lg py-2 px-5 text-white"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-true-blue rounded-lg py-2 px-5 text-white"
          onClick={onRelease}
        >
          Release
        </button>
        <button
          className="border border-red-500 rounded-lg py-2 px-5 text-red-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TicketCard;