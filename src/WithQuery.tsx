import React from "react";
import { useQuery } from "@tanstack/react-query";
import { WithQueryConfig, WithQueryProps } from "./types";

const DefaultLoadingComponent = () => <div>Loading...</div>;
const DefaultErrorComponent = ({ error }: { error: Error }) => (
  <div>Error: {error.message}</div>
);
const DefaultEmptyComponent = () => <div>No data available</div>;

export function withQuery<TData, TError = Error>({
  queryKey,
  queryFn,
  LoadingComponent = DefaultLoadingComponent,
  ErrorComponent = DefaultErrorComponent,
  EmptyComponent = DefaultEmptyComponent,
  queryOptions = {},
}: WithQueryConfig<TData, TError>) {
  return function withQueryHOC(
    WrappedComponent: React.ComponentType<WithQueryProps<TData, TError>>
  ) {
    return function WithQueryComponent(
      props: Omit<
        WithQueryProps<TData, TError>,
        "data" | "refetch" | "isRefetching"
      >
    ) {
      const { data, isLoading, isError, error, refetch, isRefetching } =
        useQuery({
          queryKey,
          queryFn,
          ...queryOptions,
        });

      if (isLoading) return <LoadingComponent />;
      if (isError) return <ErrorComponent error={error as TError} />;
      if (!data || (Array.isArray(data) && data.length === 0))
        return <EmptyComponent />;

      return (
        <WrappedComponent
          {...props}
          data={data}
          refetch={refetch}
          isRefetching={isRefetching}
        />
      );
    };
  };
}
