import Link from "next/link";

/**
 *  Parameters definition for ActionCard
 */
type ActionCardProps = {
  title: string;
  linkName: string;
  description: string;
  pageRoute: string;
};

/**
 * ActionCard displays a card with a link to an action
 * @param title string Title of the card
 * @param linkName string Name of the action Link
 * @param description string Description of the actions
 * @param pageRoute string Route to the page
 * @returns ReactComponent
 */
const ActionCard = ({
  title,
  linkName,
  description,
  pageRoute,
}: ActionCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <Link href={pageRoute}>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          {linkName}
        </button>
      </Link>
    </section>
  );
};

export default ActionCard;
