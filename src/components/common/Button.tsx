import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 16px 20px;
  border: none;
  cursor: pointer;

  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 50px;

  &:hover {
    background: #fff;
    color: black;
  }

  ${({ active }) =>
    active &&
    css`
      background: #fff;
      color: black;
    `};

  transition: all 0.3s ease-in-out;
`;

export default Button;
