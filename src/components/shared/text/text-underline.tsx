"use client";
import styled from "@emotion/styled";
export const UnderlinedTitle = styled.p<{
    colors?: string;
    underlineColor?: string;
    underline?: string;
}>`
  & {
    font-family: "Roboto";
    font-size: 19px;
    width: fit-content;
    color: ${(props) => props.colors || "#0231a8"};
    height: 25px;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    position: relative;
margin-top:30px;
  }
  &:after {
    content: "";
    position: absolute;
    left: ${(props) => props.underline || "0"};
    top: 75%;
    width: 14px;
    border-bottom: 4px solid ${(props) => props.underlineColor || "#0fc3ed"};
    padding-bottom: 4px;
  }
  @media screen and (max-width: 710px) {
    &:after {
      top: 85% !important;
    }
  }
`;
