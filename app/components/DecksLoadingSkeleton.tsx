import { Skeleton } from "@radix-ui/themes";

const DecksLoadingSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Skeleton width="250px" height="126px" />
      <Skeleton width="250px" height="126px" />
      <Skeleton width="250px" height="126px" />
      <Skeleton width="250px" height="126px" />
    </div>
  );
};

export default DecksLoadingSkeleton;
