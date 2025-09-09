import { MdSupervisedUserCircle } from "react-icons/md";

type CardType = {
  id: number;
  title: string;
  number: number;
  change: number;
};

const Card = ({ item }: { item: CardType }) => {
  return (
    <div className="bg-bgSoft p-5 rounded-xl flex gap-5 cursor-pointer">
      <MdSupervisedUserCircle size={24} />
      <div className="flex flex-col gap-5">
        <span className="">{item.title}</span>
        <span className="text-2xl font-medium">{item.number}</span>
        <span className="text-sm font-light">
          <span
            className={`${item.change > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {item.change}%
          </span>
          {item.change > 0 ? " more" : " less"} than previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
