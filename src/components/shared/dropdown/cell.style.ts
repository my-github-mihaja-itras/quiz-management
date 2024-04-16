"use client";
import styled from "@emotion/styled";

export const BadgeCell = styled.div<{ bg?: string; color?: string }>`
  width: 150px;
  height: 24px;
  min-width: 150px;
  border-radius: 6px;
  background: ${(props) => props.bg || "#c5c2bd "} !important;
  color: ${(props) => props.color || "#818181"};
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: end;
  cursor: pointer;
  padding: 0 10px;
`;

export const StyledCell = styled.div<{
  bg?: string;
  color?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  gap?: string;
}>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 24px;
  border-radius: 6px;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: end;
  cursor: pointer;
  text-wrap: nowrap;
  gap: ${(props) => props.gap};
`;

export const GroupCell = styled.div<{ color?: string }>`
  position: relative;
  border-radius: 10px;
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  font-family: "Roboto";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  display: inline-block;
  text-transform: capitalize;
  margin: 3px;
  padding: 4px;
  cursor: pointer;
  min-width: 46px;

  & > span {
    display: none;
    position: absolute;
    width: 8em;
    block-size: fit-content;
    bottom: 130%;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #272833;
    background: #272833;
    color: #fff;
    text-align: center;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: #272833 transparent transparent transparent;
    }
  }

  &:hover > span {
    display: block;
  }
`;

export const RoleCell = styled.div<{ bg?: string; color?: string }>`
  position: relative;
  border-radius: 10px;
  color: ${(props) => props.color};
  background: ${(props) => props.bg};
  font-family: "Roboto";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  display: inline-block;
  text-transform: capitalize;
  margin: 3px;
  padding: 4px;
  cursor: pointer;
  min-width: 46px;

  & > span {
    display: none;
    position: absolute;
    width: 8em;
    block-size: fit-content;
    bottom: 130%;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #272833;
    background: #272833;
    color: #fff;
    text-align: center;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: #272833 transparent transparent transparent;
    }
  }

  &:hover > span {
    display: block;
  }
`;

export const BeansCell = styled.div<{ bg?: string; color?: string }>`
  display: flex;
  width: 50px;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color || "#5c5c5c"};
  background: ${(props) => props.bg || "transparent"};
  border: 1px solid ${(props) => props.color || "#c5c5c5"};
  border-radius: 5px;
  font-family: "Roboto";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;
