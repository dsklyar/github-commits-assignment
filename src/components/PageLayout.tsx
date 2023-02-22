import tw, { styled } from "twin.macro";

const PageLayout = styled.div<{ centered?: boolean }>`
  ${tw`flex flex-col h-screen`}
  ${({ centered = false }) => centered && tw` justify-center items-center`}
`;

export default PageLayout;
