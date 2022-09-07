import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import styled from "styled-components";
import Button from "../common/Button";

const StyledMenu = styled.ul`
  display: flex;
`;

interface MenuProps extends HTMLAttributes<HTMLUListElement> {}

const Menu = ({ children, ...args }: MenuProps) => {
  return <StyledMenu {...args}>{children}</StyledMenu>;
};

interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

const MenuItem = ({
  children,
  className,
  selected,
  ...args
}: MenuItemProps) => {
  return (
    <li className={className}>
      <Button active={selected} {...args}>
        {children}
      </Button>
    </li>
  );
};

Menu.MenuItem = MenuItem;
export default Menu;
