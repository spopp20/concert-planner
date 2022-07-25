import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import BackButton from "../components/BackButton";

const Instruments: NextPage = () => {
    const instruments = trpc.useQuery(["instrument.getAll"], );

  return (
    <>
      <BackButton />
      <p className="text-2xl text-gray-700">Instruments</p>
      <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
        {instruments.data ? (
          <ul>
            {instruments.data.map((instrument) => (
              <li key={instrument.id}>{instrument.name}</li>
            ))}
          </ul>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </>
  );
  };
  
  export default Instruments;
  