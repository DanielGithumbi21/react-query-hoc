import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

export interface WithQueryConfig<TData, TError = Error> {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  LoadingComponent?: React.ComponentType;
  ErrorComponent?: React.ComponentType<{ error: TError }>;
  EmptyComponent?: React.ComponentType;
  queryOptions?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">;
}

export interface WithQueryProps<TData, TError = Error> {
  data: TData;
  refetch: UseQueryResult<TData, TError>["refetch"];
  isRefetching: boolean;
}
