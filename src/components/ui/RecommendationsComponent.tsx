import { Article, Job, Event, Profile, Project } from "@/common/constants";
import { SkeletonCard } from "./SkeletonLoader";

type RecommendationData = Article | Project | Profile | Event | Job;

interface IRecommendationsComponentProps {
  isLoading: boolean;
  recommendations: RecommendationData[];
  render: (data: RecommendationData) => React.ReactNode;
  title: string;
}

const RecommendationsComponent: React.FC<IRecommendationsComponentProps> = ({
  isLoading,
  recommendations,
  render,
  title,
}) => {
  return (
    <>
      {isLoading && <SkeletonCard />}
      {!isLoading && (
        <div className="p-4 bg-white rounded-lg border border-gray-300">
          <h3 className="font-app-medium mb-3 text-gray-700">{title}</h3>
          <div className="space-y-4">
            {recommendations &&
              recommendations.length > 0 &&
              [...recommendations].slice(0, 4).map((data) => {
                return (
                  <div
                    key={data.id}
                    className="border-b border-b-gray-200 py-3"
                  >
                    {render(data)}
                  </div>
                );
              })}
            {recommendations.length == 0 && (
              <div className="text-sm text-gray-600 pt-2">
                Looks like there is nothing to show.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationsComponent;
