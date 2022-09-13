import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import styled from "styled-components";

import Button from "../common/Button";

const StyledMenu = styled.ul`
  display: flex;
`;

type MenuContextValue = {
  selected?: string;
  clickHandler(value: string): void;
};

const MenuContext = React.createContext<MenuContextValue | null>(null);

interface MenuProps extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
  selected?: string;
  onChange(value: string): void;
}

const Menu = ({ children, selected, onChange, ...args }: MenuProps) => {
  const clickHandler = (value: string) => {
    onChange(value);
  };

  return (
    <MenuContext.Provider
      value={{
        selected,
        clickHandler,
      }}
    >
      <StyledMenu {...args}>{children}</StyledMenu>
    </MenuContext.Provider>
  );
};

interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  value: string;
}

const MenuItem = ({ children, value, className, ...args }: MenuItemProps) => {
  const menuContext = React.useContext(MenuContext);

  if (!menuContext) {
    throw new Error();
  }

  const { selected, clickHandler } = menuContext;

  const isItemSelected = selected === value;

  return (
    <li className={className}>
      <Button
        disabled={isItemSelected}
        active={isItemSelected}
        onClick={() => clickHandler(value)}
        {...args}
      >
        {children}
      </Button>
    </li>
  );
};

Menu.MenuItem = MenuItem;
export default Menu;
