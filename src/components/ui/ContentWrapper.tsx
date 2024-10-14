import { Article, Event, Job, Profile, Project } from "@/common/constants";
import { ReactNode } from "react";

interface IContentWrapperProps {
  data: Event[] | Project[] | Job[] | Profile[] | Article[];
  children: ReactNode;
}

const ContentWrapper: React.FC<IContentWrapperProps> = ({ data, children }) => {
  return (
    <div
      className={`w-full grid ${
        data?.length === 1
          ? "!grid-cols-1"
          : data?.length === 2
          ? "!grid-cols-2"
          : ""
      } grid-cols-2 md:grid-cols-2 2xl:grid-cols-3 gap-5`}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
