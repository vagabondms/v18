import React, { HTMLAttributes, useContext } from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";

const StyledMenu = styled.ul`
  display: flex;

  li {
    margin: 0 8px;
  }
`;

interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  selected?: string;
}

const Menu = ({ children, selected, ...args }: MenuProps) => {
  return (
    <MenuContext.Provider
      value={{
        selected: selected ?? null,
      }}
    >
      <StyledMenu {...args}>{children}</StyledMenu>
    </MenuContext.Provider>
  );
};

interface MenuItemProps extends LinkProps {}

const MenuItem = ({ children, to, ...args }: MenuItemProps) => {
  const { selected } = useMenuContext();

  return (
    <li>
      <Link to={to} {...args}>
        <Button active={selected === to}>{children}</Button>
      </Link>
    </li>
  );
};

Menu.MenuItem = MenuItem;
export default Menu;

interface MenuContextValue {
  selected: string | null;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

const useMenuContext = () => {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw Error("err");
  }

  return menuContext;
};
