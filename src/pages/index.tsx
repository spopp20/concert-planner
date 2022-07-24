import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import ActionCard from "../components/ActionCard";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Music Planner</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Music <span className="text-purple-300">Planner </span>
        </h1>
        <p className="text-2xl text-gray-700">Application Actions:</p>
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
        <ActionCard
            title="Select Songs"
            description="Use a searchable song database to add, edit, and find songs"
            linkName="Songs"
            pageRoute="songs"
          />
          <ActionCard
            title="Select Instruments"
            description="Find and select your primary and secondary instruments for a session"
            linkName="Instruments"
            pageRoute="instruments"
          />
          <ActionCard
            title="Select Events"
            description="Add a concert event or add and edit an event"
            linkName="Events"
            pageRoute="events"
          />
        </div>
      </main>
    </>
  );
};

export default Home;
