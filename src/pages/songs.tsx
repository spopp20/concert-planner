import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Songs: NextPage = () => {
    const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  
    return (
      <>
          <p className="text-2xl text-gray-700">Songs</p>
          <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
            {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
          </div>
      </>
    );
  };
  
  export default Songs;
  