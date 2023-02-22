import tw, { styled } from "twin.macro";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Commit } from "components";
import { ICommit } from "hooks/useFetchCommits";

const List = styled.div`
  ${tw`bg-white shadow-2xl mt-[125px] lg:mx-24`}
`;

const ListEndItem = styled.div`
  ${tw`text-center p-6`}
`;

const Loading = styled.div`
  ${tw`text-white text-5xl font-bold grow flex items-center justify-center`}
`;

interface ICommitListProps {
  hasMore: boolean;
  commits: ICommit[] | null | undefined;
  next: () => void;
}

function CommitList({ hasMore, commits, next }: ICommitListProps) {
  // Initial Setup
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore) next();
  }, [inView, hasMore, next]);

  if (!commits) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <List>
      {commits?.map(({ id, ...commitProps }) => (
        <Commit key={id} {...commitProps} />
      ))}
      {hasMore && <ListEndItem ref={ref}>Loading...</ListEndItem>}
    </List>
  );
}

export default CommitList;
