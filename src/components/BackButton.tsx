import { NextPage } from "next";
import { useRouter } from "next/router";

/**
 * Button to go pack to the previous page
 */
const BackButton: NextPage = () => {
    const router = useRouter();

    return (
        <button type="button" onClick={() => router.back()} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Go back
        </button>
    );
};

export default BackButton;
