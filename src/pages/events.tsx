import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Events: NextPage = () => {
  const events = trpc.useQuery(["event.getAll"]);

  return (
    <>
      <p className="text-2xl text-gray-700">Events</p>
      <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
        {events.data ? (
          <ul>
            {events.data.map((event) => (
              <li key={event.id}>{event.name}</li>
            ))}
          </ul>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </>
  );
};

export default Events;
