import { FC } from "react";
import { Checkbox, Label } from "flowbite-react";
const EventFilter: FC = () => {
  return (
    <div>
      <div>
        <div className="font-medium">Categories</div>
        <div className="flex items-center gap-2 my-2">
          <Checkbox
            id="Online"
            className="text-true-blue focus:ring-true-blue border-blue-300"
          />
          <Label htmlFor="Online" className="flex text-slate-gray">
            Online
          </Label>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Checkbox id="Offline" className="text-true-blue  border-blue-300" />
          <Label htmlFor="Offline" className="flex text-slate-gray">
            Offline
          </Label>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Checkbox id="Concert" className="text-true-blue  border-blue-300" />
          <Label htmlFor="Concert" className="flex text-slate-gray">
            Concert
          </Label>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Checkbox
            id="MeetNGreet"
            className="text-true-blue  border-blue-300"
          />
          <Label htmlFor="MeetNGreet" className="flex text-slate-gray">
            MeetNGreet
          </Label>
        </div>

        <div className="flex items-center gap-2 my-2">
          <Checkbox id="Seminar" className="text-true-blue  border-blue-300" />
          <Label htmlFor="Seminar" className="flex text-slate-gray">
            Seminar
          </Label>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Checkbox
            id="Exhibition"
            className="text-true-blue  border-blue-300"
          />
          <Label htmlFor="Exhibition" className="flex text-slate-gray">
            Exhibition
          </Label>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Checkbox id="Sport" className="text-true-blue  border-blue-300" />
          <Label htmlFor="Sport" className="flex text-slate-gray">
            Sport
          </Label>
        </div>
      </div>
      <div className="mt-5">
        <div className="font-medium">Price Range</div>
        <div className="my-2">
          <label
            className="block text-slate-gray text-sm font-bold mb-2"
            htmlFor="from"
          >
            From
          </label>
          <input
            className="shadow appearance-none border border-platinum rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            name="from"
            type="number"
            placeholder="0"
          ></input>
        </div>
        <div className="my-2">
          <label
            className="block text-slate-gray text-sm font-bold mb-2"
            htmlFor="from"
          >
            To
          </label>
          <input
            className="shadow appearance-none border border-platinum rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            name="to"
            type="number"
            placeholder="0"
          ></input>
        </div>
      </div>
      <div className="mt-5">
        <div className="font-medium">Location</div>
        <div className="my-2">
          <label
            className="block text-slate-gray text-sm font-bold mb-2"
            htmlFor="province"
          >
            Province
          </label>
          <select
            name="province"
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>Japan</option>
          </select>
        </div>
        <div className="my-2">
          <label
            className="block text-slate-gray text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <select
            name="city"
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>Japan</option>
          </select>
        </div>
      </div>
      <div className="mt-10">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full">
          Confirm changes
        </button>
        <button className="hover:underline text-true-blue font-medium py-2 px-4 rounded w-full">
          Reset to default
        </button>
      </div>
    </div>
  );
};

export default EventFilter;
