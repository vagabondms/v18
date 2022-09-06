import React, {
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
  useContext,
} from "react";

import styled from "styled-components";
import Button from "../common/Button";

const StyledMenu = styled.ul`
  display: flex;

  li {
    margin: 0 8px;
  }
`;

interface MenuProps extends Omit<HTMLAttributes<HTMLUListElement>, "onChange"> {
  selected: string | null;
  onChange(value: string): void;
}

const Menu = ({ children, selected, onChange, ...args }: MenuProps) => {
  return (
    <MenuContext.Provider
      value={{
        selected: selected ?? null,
        onChange: onChange,
      }}
    >
      <StyledMenu {...args}>{children}</StyledMenu>
    </MenuContext.Provider>
  );
};

interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  value: string;
}

const MenuItem = ({ children, value, ...args }: MenuItemProps) => {
  const { selected, onChange } = useMenuContext();

  return (
    <li {...args}>
      <Button
        active={selected === value}
        onClick={() => {
          onChange(value);
        }}
      >
        {children}
      </Button>
    </li>
  );
};

Menu.MenuItem = MenuItem;
export default Menu;

interface MenuContextValue {
  selected: string | null;
  onChange(value: string): void;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

const useMenuContext = () => {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw Error("err");
  }

  return menuContext;
};
