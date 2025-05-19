import React from "react";
import styled from "styled-components";

const Checkbox = styled.input`
  min-width: 20px;
  height: 20px;
  position: relative;
  appearance: none;
  border: 1px solid var(--grayD);
  border-radius: 2px;
  margin: 0;
  cursor: pointer;
  &:checked {
    background: var(--main);
    border: none;
  }
  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 11px;
    border: solid var(--light);
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -70%) rotate(45deg);
  }

  @media screen and (max-width: 1024px) {
    min-width: 16px;
    height: 16px;
    &:checked::after {
      width: 5px;
      height: 9px;
    }
  }

  @media screen and (max-width: 768px) {
    min-width: 20px;
    height: 20px;
    &:checked::after {
      width: 6px;
      height: 11px;
    }
  }

  @media screen and (max-width: 375px) {
    min-width: 16px;
    height: 16px;
    &:checked::after {
      width: 5px;
      height: 9px;
    }
  }
`;

const CustomCheckbox = ({ checked, onChange, className }) => {
  return (
    <Checkbox
      type="checkbox"
      className={className}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default CustomCheckbox;
