import { IPagination } from "@/app/dashboard/events/page";
import { Project, Event, Profile, Job, Article } from "@/common/constants";
import { useRef } from "react";

interface IPaginationComponentProps {
  data: Project[] | Event[] | Profile[] | Job[] | Article[];
  total: number;
  setPagination: any;
  limit: number;
}

const PaginationComponent: React.FC<IPaginationComponentProps> = ({
  data,
  total,
  setPagination,
  limit,
}) => {
  const paginationRef = useRef(limit);
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
        {data.length < total ? "Load more" : "You have reached the end"}
      </button>
    </div>
  );
};

export default PaginationComponent;
