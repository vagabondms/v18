import styled from "styled-components";
import { TitleFull, TitleShortened } from "../../../lib/icons/Title";

const Container = styled.div`
  padding: 8px 24px;
  display: flex;
  height: 55px;
  align-items: center;

  .title_short {
    display: none;
  }

  @media screen and (max-width: 1080px) {
    .title_full {
      display: none;
    }
    .title_short {
      display: block;
    }
  }
`;

const Header = () => {
  return (
    <Container>
      <TitleFull className="title_full" height="16px" width="82px" />
      <TitleShortened className="title_short" width="24px" />
    </Container>
  );
};

export default Header;
