import styled from "styled-components";
import Arrow from "../../../lib/icons/Arrow";
import Menu from "../../template/Menu";

const MenuList = [
  "Best of Behance",
  "Graphic Design",
  "Photography",
  "Illustration",
  "3D Art",
  "UI/UX",
  "Motion",
  "Architecture",
  "Product Design",
  "Fashion",
  "Advertising",
  "Fine Arts",
  "Crafts",
  "Game Design",
  "Sound",
  "Creative Challenges",
];

const StyledMenuItem = styled(Menu.MenuItem)`
  -webkit-box-align: center;
  align-items: center;
  border-radius: 3px;
  display: inline-flex;
  justify-content: center;
  min-height: 65px;
  min-width: 150px;
  width: 14vw;
  overflow: hidden;
  text-align: center;
  user-select: none;
  white-space: nowrap;

  margin: 0 8px;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const MenuWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const ArrowButton = styled.button`
  z-index: 2;
  position: absolute;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  height: 40px;
  width: 40px;

  border-radius: 50%;
  border: none;
  box-shadow: 0 2px 3px rgb(25 25 25 / 25%);

  cursor: pointer;
  top: 50%;

  &[class*="left"] {
    transform: rotate(180deg) translateY(+50%);
  }

  &[class*="right"] {
    transform: translateY(-50%);
    right: 0;
  }
`;

const CategoryFilter = ({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange(value: string): void;
}) => {
  return (
    <MenuWrapper>
      <ArrowButton className="arrow-button_left">
        <Arrow className="arrow-icon" />
      </ArrowButton>
      <Menu selected={selected} onChange={onChange}>
        {MenuList.map((listItem) => {
          return <StyledMenuItem value={listItem}>{listItem}</StyledMenuItem>;
        })}
      </Menu>
      <ArrowButton className="arrow-button_right">
        <Arrow className="arrow-icon" />
      </ArrowButton>
    </MenuWrapper>
  );
};

export default CategoryFilter;
