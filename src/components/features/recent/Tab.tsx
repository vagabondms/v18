import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";
import Arrow from "../../../lib/icons/Arrow";
import Menu from "../../template/Menu";

const MenuList = [
  "Creative Challenges",
  "LightRoom",
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
];

const MenuWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
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

const StyledMenuItem = styled(Menu.MenuItem)<{ $transform?: number }>`
  display: inline-flex;
  align-items: center;
  border-radius: 3px;
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

const Tab = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange(value: string): void;
}) => {
  const { menuList, adjustList, findIndex } = useMenuList(MenuList);

  const [transform, setTransform] = useState(0);

  const prevSelected = useRef(selected);

  useEffect(() => {
    if (prevSelected.current !== selected) {
      const currentIdx = findIndex(selected);
      const prevIdx = findIndex(prevSelected.current);

      const diff = currentIdx - prevIdx;

      prevSelected.current = selected;

      flushSync(() => setTransform(diff * 100));
      adjustList(diff);
    }
  }, [selected, menuList, adjustList, findIndex]);

  useEffect(() => {
    // TODO Transform 제대로
    transform !== 0 && setTransform(0);
  }, [transform]);

  return (
    <MenuWrapper>
      <ArrowButton
        className="arrow-button_left"
        onClick={() => {
          const currentIdx = findIndex(selected);
          onChange(menuList[currentIdx - 1]);
        }}
      >
        <Arrow className="arrow-icon" />
      </ArrowButton>
      <ArrowButton
        className="arrow-button_right"
        onClick={() => {
          const currentIdx = findIndex(selected);
          onChange(menuList[currentIdx + 1]);
        }}
      >
        <Arrow className="arrow-icon" />
      </ArrowButton>

      <StyledMenu selected={selected} onChange={onChange}>
        {menuList.map((listItem) => {
          return (
            <StyledMenuItem
              key={listItem}
              value={listItem}
              $transform={transform}
            >
              {listItem}
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </MenuWrapper>
  );
};

export default Tab;

const useMenuList = <T,>(initialList: T[]) => {
  const [menuList, setMenuList] = useState(initialList);

  const adjustList = useCallback((diff: number) => {
    setMenuList((prev) => {
      const left = prev.slice(diff);
      const right = prev.slice(0, diff);
      return [...left, ...right];
    });
  }, []);

  const findIndex = useCallback(
    (value: T) => {
      // 범용적으로 사용하려면 T에 대한 타입이 정확하게 이루어져야함. (reference 타입일 경우 찾지 못함)
      return menuList.findIndex((listItem) => listItem === value);
    },
    [menuList]
  );

  return {
    menuList,
    adjustList,
    findIndex,
  };
};
