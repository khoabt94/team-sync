import { AxiosError } from "axios";

import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export type Pagination = {
  total: number;
  page: number;
  size: number;
};

export type BaseError = {
  errorCode: string;
  message: string;
  errors?: Array<{ message: string }>;
};

export type QueryFunctionCtx = QueryFunctionContext<QueryKey, Pick<Pagination, "page" | "size">>;

export type QueryProps<
  Response,
  Input = null,
  OmittedProps = Omit<UseQueryOptions<Response, AxiosError>, "queryKey" | "queryFn">,
> = Input extends null ? OmittedProps : OmittedProps & { input: Input };

export type InfiniteQueryProps<Response, Input = never> = Omit<
  UndefinedInitialDataInfiniteOptions<
    Response,
    BaseError,
    InfiniteData<Response>,
    QueryKey,
    Pick<Pagination, "page" | "size">
  >,
  "queryKey" | "queryFn" | "getPreviousPageParam" | "getNextPageParam" | "initialPageParam"
> & {
  input: Input;
};

export type MutationProps<Response, Input = never> = Omit<
  UseMutationOptions<Response, AxiosError<BaseError>, Input>,
  "mutationFn"
>;

export type CloudFunctionResponse<T> = {
  data: T;
  hasError: boolean;
};
