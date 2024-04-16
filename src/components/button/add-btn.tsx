"use client";
import styled from "@emotion/styled";

interface AddButtonProps {
  colors?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  uppercase?: boolean;
}

export const AddButton = styled.button<AddButtonProps>`
  all: unset;
  display: block;
  width: ${(props) => (props.width ? props.width : "360px")};
  height: ${(props) => (props.height ? props.height : "60px")};
  flex-shrink: 0;
  color: #ffff;
  background-color: ${(props) => props.colors || "#0FC3ED"};
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "")};
  font-family: "Lato";
  border-radius: 5px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  cursor: pointer;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  @media screen and (max-width: 780px) {
    min-width: 80%;
    font-size: 16px;
  }
`;
