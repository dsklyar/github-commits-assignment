import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import useFetchCommits, { transform } from "./useFetchCommits";

import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

const createInput = (pageCount = 5) => {
  let total: any = [];
  let count = 0;

  const createApiEntry = (id: number) => ({
    node_id: `${id}`,
    commit: {
      author: {
        name: "Mock Developer",
        date: "Mock Date",
      },
      message: "Mock Message",
    },
    html_url: "Mock URL",
  });

  const next = () => {
    const retval = [...Array(pageCount).keys()].map((i) =>
      createApiEntry(i + count)
    );
    count += pageCount;
    total = [...total, ...retval];
    return total;
  };

  return {
    next,
    count,
  };
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: React.PropsWithChildren<{}>) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("hook", () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("should perform valid transform", () => {
    const { next } = createInput(1);
    const total = next();

    const result = transform(total);
    expect(result).toStrictEqual([
      {
        id: "0",
        author: "Mock Developer",
        date: "Mock Date",
        message: "Mock Message",
        url: "Mock URL",
      },
    ]);
  });

  it("should populate commits with transform", async () => {
    const options = {
      owner: "m3db",
      repository: "m3",
      startPage: 1,
    };
    const { next } = createInput(1);
    const total = next();
    fetchMock.mockResponse(JSON.stringify(total));

    const { result } = renderHook(() => useFetchCommits(options), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.commits).not.toBe(null));
    expect(result.current.commits).toStrictEqual([
      {
        id: "0",
        author: "Mock Developer",
        date: "Mock Date",
        message: "Mock Message",
        url: "Mock URL",
      },
    ]);
  });

  it("should set hasMore to false when response is empty", async () => {
    const options = {
      owner: "m3db",
      repository: "m3",
      startPage: 1,
    };
    fetchMock.mockResponse(JSON.stringify([]));

    const { result } = renderHook(() => useFetchCommits(options), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.page).toBe(1));
    expect(result.current.hasMore).toBe(false);
  });

  it("should be able to move to the next page", async () => {
    const options = {
      owner: "m3db",
      repository: "m3",
      startPage: 1,
    };
    const { next } = createInput(1);
    const total = next();
    fetchMock.mockResponse(JSON.stringify(total));

    const { result } = renderHook(() => useFetchCommits(options), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.next();
    });

    await waitFor(() => expect(result.current.page).toBe(2));
  });

  it("should return an error", async () => {
    const options = {
      owner: "m3db",
      repository: "m3",
      startPage: 1,
    };
    fetchMock.mockResponse(JSON.stringify({ message: "Not Found" }));

    const { result } = renderHook(() => useFetchCommits(options), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.error).toBe("Not Found"));
  });
});
