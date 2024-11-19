import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { withQuery } from "../WithQuery";

const queryClient = new QueryClient();

describe("withQuery HOC", () => {
  const mockData = ["item1", "item2"];
  const mockQueryFn = jest.fn().mockResolvedValue(mockData);

  const TestComponent = withQuery<string[]>({
    queryKey: ["test"],
    queryFn: mockQueryFn,
  })(({ data }) => (
    <div data-testid="test-component">
      {data.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  ));

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    queryClient.clear();
    mockQueryFn.mockClear();
  });

  it("shows loading state initially", () => {
    render(<TestComponent />, { wrapper });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders data when query resolves", async () => {
    render(<TestComponent />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId("test-component")).toBeInTheDocument();
    });
    expect(screen.getByText("item1")).toBeInTheDocument();
    expect(screen.getByText("item2")).toBeInTheDocument();
  });
});
