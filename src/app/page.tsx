import EventFilter from "./components/EventFilter";
import EventList from "./components/EventList";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="my-5">
        <div className="font-semibold text-xl">Search for Events</div>
        <div className="flex gap-5 justify-between mt-5">
          <EventFilter />
          <EventList />
        </div>
      </div>
    </div>
  );
}
