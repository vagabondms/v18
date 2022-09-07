import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledGlobalLoader = styled.div`
  height: 2px;
  width: 100%;
  display: flex;
  flex-shrink: 0;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 9999;

  .global-loader-fill {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200%;
    transform: translateX(0);
    opacity: 0;
    transition: transform 2s ease, opacity 1s ease;
    background: linear-gradient(
      to right,
      rgba(52, 82, 255, 0.93) 0%,
      rgba(255, 16, 83, 0.92) 99%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  .global-loader-fill::after {
    display: block;
    content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.2);
  }

  .global-loader-fill.is-initing {
    .global-loader-fill {
      transition: none;
      opacity: 1;
      animation: Indeterminate 5s ease-out;
      animation-fill-mode: forwards;
    }
  }

  &.is-loading {
    .global-loader-fill {
      transition: none;
      opacity: 1;
      animation: Indeterminate 10s ease-out;
      animation-fill-mode: forwards;
    }
  }

  @keyframes Indeterminate {
    0% {
      transform: translateX(-100%);
    }
    20% {
      transform: translateX(-10%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

interface GlobalLoaderProps {
  isLoading: boolean;
}

function GlobalLoader({ isLoading }: GlobalLoaderProps) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isLoading) {
      setVisible(true);
    } else {
      timeout = setTimeout(() => {
        setVisible(false);
      }, 500);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading]);

  return isVisible ? (
    <StyledGlobalLoader
      className={`global-loader ${isLoading ? "is-loading" : null}`}
    >
      <div className="global-loader-fill" />
    </StyledGlobalLoader>
  ) : (
    <></>
  );
}

export default GlobalLoader;
