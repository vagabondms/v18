import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Arrow from "../../../lib/icons/Arrow";
import Menu from "../../template/Menu";

const MenuList = [
  "Illustrator",
  "InDesign",
  "XD",
  "Premirere Prop",
  "After Effects",
  "Illustrator Draw",
  "Photoshow Sketch",
  "Photoshop Mix",
  "Stock",
  "Dimension",
  "Capture",
  "Substance 3D Designer",
  "Substance 3D Painter",
  "Substance 3D Sampler",
  "Substance 3D Stager",
  "Fresco",
  "Aero",
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
  "Photoshop",
  "Creative Challenges",
  "LightRoom",
];

const MenuWrapper = styled.div`
  width: 100%;
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

const StyledMenu = styled(Menu)`
  display: flex;
  justify-content: center;
`;

const StyledMenuItem = styled(Menu.MenuItem)<{ $transform: number }>`
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
  ${({ $transform }) => {
    return $transform !== 0
      ? `
      transform : translateX(${$transform}%)`
      : `
    transform : translateX(${$transform}%);
    transition : transform .5s cubic-bezier(0.19,1,0.22,1);
    `;
  }}
`;

const Window = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CategoryFilter = ({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange(value: string): void;
}) => {
  /*.map((listItem, index, array) => {
    return {
      ...listItem,
      prev: array[index - 1] ?? array[array.length - 1],
      next: array[index + 1] ?? array[0],
    };
  });
  */

  const [menuList, setMenuList] = useState(MenuList);

  /*
    selected 값에 따라 tab 위치가 변경됨.
    transform 거리도 변경되어야함.
   */

  /**
   * diff를 받아서 이동하고 selectedItem을 지정해주는 함수
   */
  const moveTab = (diff: number) => {
    setMenuList((prev) => {
      if (diff > 0) {
        const left = prev.slice(diff);
        const right = prev.slice(0, diff);
        return [...left, ...right];
      } else if (diff < 0) {
        const left = prev.slice(diff);
        const right = prev.slice(0, diff);
        return [...left, ...right];
      }
      return prev;
    });
  };

  const [transform, setTransform] = useState(0);

  useEffect(() => {
    transform !== 0 && setTransform(0);
  }, [transform]);

  return (
    <MenuWrapper>
      <ArrowButton
        className="arrow-button_left"
        onClick={() => {
          moveTab(-1);
          setTransform(-100);
          onChange(menuList[Math.floor(menuList.length / 2) - 1]);
        }}
      >
        <Arrow className="arrow-icon" />
      </ArrowButton>
      <ArrowButton
        className="arrow-button_right"
        onClick={() => {
          moveTab(1);
          setTransform(+100);
          onChange(menuList[Math.floor(menuList.length / 2) + 1]);
        }}
      >
        <Arrow className="arrow-icon" />
      </ArrowButton>
      <Window>
        <StyledMenu className="items">
          {menuList.map((listItem, index) => {
            return (
              <StyledMenuItem
                $transform={transform}
                selected={listItem === selected}
                onClick={() => {
                  const currentIdx = menuList.findIndex(
                    (listItem) => listItem === selected
                  );
                  const diff: number = index - currentIdx;
                  setTransform(diff * 100);
                  moveTab(diff);
                  onChange(listItem);
                }}
                className={`menu-item`}
              >
                {listItem}
              </StyledMenuItem>
            );
          })}
        </StyledMenu>
      </Window>
    </MenuWrapper>
  );
};

export default CategoryFilter;
