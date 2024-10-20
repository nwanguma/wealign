import { useRef } from "react";
import {
  Project,
  Event,
  Profile,
  Job,
  Article,
  Notification,
  IPagination,
} from "@/common/constants";

interface IPaginationComponentProps {
  data: Project[] | Event[] | Profile[] | Job[] | Article[] | Notification[];
  total: number;
  setPagination: any;
  limit: number;
  tag?: string;
}

const PaginationComponent: React.FC<IPaginationComponentProps> = ({
  data,
  total,
  setPagination,
  limit,
  tag,
}) => {
  const paginationRef = useRef<number>(limit);
  const fixedLimit = paginationRef.current;

  return (
    <div className="w-full flex items-center justify-center">
      <button
        disabled={data.length === total}
        onClick={() =>
          setPagination((prev: IPagination) => ({
            page: prev.page,
            limit: prev.limit + fixedLimit,
          }))
        }
        className="cursor-pointer p-2 text-xs-sm border text-gray-700 border-gray-300 bg-slate-50 rounded"
      >
        {data.length < total
          ? "Load more" + " " + tag
          : "You have reached the end"}
      </button>
    </div>
  );
};

export default PaginationComponent;
