import { QueryProps } from "@api/type";
import { useQuery } from "@tanstack/react-query";

export type ExampleInput = {
  name: string;
};

export type ExampleResponse = {
  message: string;
};

export type UseExampleProps = QueryProps<ExampleResponse, ExampleInput>;

export const EXAMPLE_KEY = "example";

export async function fetchFn(_input: ExampleInput): Promise<ExampleResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // const { data } = await client<ExampleResponse>({
  //   method: "GET",
  //   url: "/api/example",
  // });

  return {
    message: "Hello World",
  };
}

export function useExampleQuery({ input, ...options }: UseExampleProps) {
  return useQuery({
    queryKey: [EXAMPLE_KEY, ...Object.values(input)],
    queryFn: () => fetchFn(input),
    ...options,
  });
}
