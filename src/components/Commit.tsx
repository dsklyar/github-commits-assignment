import tw, { styled } from "twin.macro";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { ICommit } from "hooks/useFetchCommits";

const Container = styled.div`
  ${tw`grid grid-cols-3 p-6 border-b border-stroke`}
`;
const Meta = styled.span`
  ${tw`font-bold last:text-end`}
`;

const CommentLink = styled(Link)`
  ${tw`text-link overflow-hidden text-ellipsis whitespace-pre-wrap`}
`;

interface ICommitProps extends Omit<ICommit, "id"> {}

function Commit({ date, message, author, url }: ICommitProps): JSX.Element {
  const formattedDate = date
    ? dayjs(date).format("MMMM D, YYYY [at] h:mm A")
    : "Unknwon";

  return (
    <Container>
      <Meta>{formattedDate}</Meta>
      <CommentLink to={url} target="_blank" rel="noopener noreferrer">
        {message}
      </CommentLink>
      <Meta>{author}</Meta>
    </Container>
  );
}

export default Commit;
