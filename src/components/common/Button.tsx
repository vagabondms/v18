import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;

  color: #fff;

  &:hover {
    background: #0057ff;
  }

  ${({ active }) =>
    active &&
    css`
      background: #0057ff;
    `};

  transition: all 0.3s ease-in-out;
`;

export default Button;
