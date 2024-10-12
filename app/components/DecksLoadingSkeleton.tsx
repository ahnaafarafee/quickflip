import { Skeleton } from "@radix-ui/themes";

const DecksLoadingSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Skeleton width="full" height="186px" />
      <Skeleton width="full" height="186px" />
      <Skeleton width="full" height="186px" />
      <Skeleton width="full" height="186px" />
    </div>
  );
};

export default DecksLoadingSkeleton;
