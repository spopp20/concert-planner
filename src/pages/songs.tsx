import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import BackButton from "../components/BackButton";

const Songs: NextPage = () => {
  const tableData = trpc.useQuery(["song.getAll"]);
  
  return (
    <>
      <BackButton />
      <p className="text-2xl text-gray-700 flex justify-center">Songs</p>

      <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
        {tableData.data ? (
          <ul>
            {tableData.data.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </>
  );
};

export default Songs;
