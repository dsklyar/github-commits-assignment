import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as TailwindStyles } from "twin.macro";

const CustomStyles = createGlobalStyle`
  body {
    ${tw`bg-background `}
  }
`;

const AppStyles = () => (
  <>
    <TailwindStyles />
    <CustomStyles />
  </>
);

export default AppStyles;
