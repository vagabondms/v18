import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin: 40px 40px 60px;
`;

const TabTitle = styled.h1`
  font-size: 70px;
  display: inline-block;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 0.9;
`;

const TabExplanation = styled.h2`
  font-size: 23px;
`;

const TabDetail = ({ selected }: { selected: string }) => {
  return (
    <Container>
      <Wrapper>
        <TabTitle>{selected}</TabTitle>
        <TabExplanation></TabExplanation>
      </Wrapper>
    </Container>
  );
};

export default TabDetail;
