import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

export interface IOptions {
  owner?: string;
  repository?: string;
  startPage?: number;
}

interface IApiCommit {
  commit?: {
    author?: {
      name?: string;
      date?: string;
    };
    message?: string;
  };
  html_url: string;
  node_id: string;
}

export interface ICommit {
  id: string;
  author: string;
  message: string;
  date: string | null;
  url: string;
}
export function transform(data: IApiCommit[]): ICommit[] {
  return data.map((datum) => ({
    id: datum.node_id,
    author: datum?.commit?.author?.name || "Unknown",
    date: datum?.commit?.author?.date || null,
    message: datum?.commit?.message || "Unknown",
    url: datum.html_url,
  }));
}

function useFetchCommits({ owner, repository, startPage = 1 }: IOptions) {
  const [page, setPage] = useState(startPage);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [commits, setCommits] = useState<ICommit[] | null>(null);

  const next = useCallback(() => setPage((prev) => prev + 1), []);

  const fetchCommits = async (pageToFetch = 0) =>
    fetch(
      `https://api.github.com/repos/${owner}/${repository}/commits?per_page=30&page=${pageToFetch}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    ).then((res) => res.json());

  const { data } = useQuery(
    [owner, repository, page],
    () => fetchCommits(page),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (!Array.isArray(data) && data?.message) {
      setError(data.message);
      return;
    }
    if (!data?.length) {
      setHasMore(false);
    } else {
      setCommits((prev) => [...(prev || []), ...transform(data)]);
      setHasMore(true);
    }
  }, [data]);

  return {
    next,
    page,
    hasMore,
    error,
    commits,
  };
}

export default useFetchCommits;
