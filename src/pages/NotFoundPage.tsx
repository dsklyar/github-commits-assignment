import tw, { styled } from "twin.macro";
import { PageLayout } from "components";


const Title = styled.span`
  ${tw`text-white text-5xl font-bold`}
`;

function NotFoundPage() {
  return (
    <PageLayout centered>
      <Title>404 - Page not found.</Title>
    </PageLayout>
  );
}

export default NotFoundPage;
