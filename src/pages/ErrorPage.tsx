import { PageLayout } from "components";
import tw, { styled } from "twin.macro";

const Title = styled.span`
  ${tw`text-white text-5xl font-bold`}
`;

function ErrorPage() {
  return (
    <PageLayout centered>
      <Title>Sorry we encountered an error...</Title>
    </PageLayout>
  );
}

export default ErrorPage;
