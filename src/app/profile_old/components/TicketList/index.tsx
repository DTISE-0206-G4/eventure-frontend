import { FC } from "react";

const TicketList: FC = () => {
  return (
    <>
      <div className="bg-slate-500 p-5 rounded-lg w-full">
        <div>Ticket Konser</div>
        <div>Konser wibu</div>
        <button className="bg-white rounded-lg p-5">Details</button>
      </div>
    </>
  );
};

export default TicketList;
