import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Songs: NextPage = () => {
  const songs = trpc.useQuery(["song.getAll"]);

  return (
    <>
      <p className="text-2xl text-gray-700">Songs</p>
      <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
        {songs.data ? (
          <ul>
            {songs.data.map((song) => (
              <li key={song.id}>{song.title}</li>
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
