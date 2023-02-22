import tw, { styled } from "twin.macro";
import { useParams } from "react-router-dom";
import { CommitList, PageLayout } from "components";
import useFetchCommits from "hooks/useFetchCommits";

const Header = styled.div`
  ${tw`text-center text-3xl py-8 text-white font-bold bg-background fixed w-full z-10 shadow-2xl`}
`;

const Error = styled.div`
  ${tw`text-white text-5xl font-bold grow flex items-center justify-center`}
`;

function CommitsPage() {
  // Initial Setup
  const { owner, repository } = useParams<"owner" | "repository">();
  const { commits, next, hasMore, error } = useFetchCommits({
    owner,
    repository,
  });

  return (
    <PageLayout>
      <Header>
        Showing results for: /{owner}/{repository}
      </Header>
      {error ? (
        <Error>{error}</Error>
      ) : (
        <CommitList commits={commits} hasMore={hasMore} next={next} />
      )}
    </PageLayout>
  );
}

export default CommitsPage;
