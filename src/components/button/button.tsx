"use client";
import styled from "@emotion/styled";
export const FullButton = styled.button<{ colors?: string }>`
  all: unset;
  display: block;
  width: 360px;
  height: 60px;
  flex-shrink: 0;
  color: #ffff;
  background-color: ${(props) => props.colors || "#0FC3ED"};
  text-transform: uppercase;
  font-family: "Lato";
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  font-style: normal;
font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
  @media screen and (max-width:780px){
    min-width:80%;
    font-size: 16px;
  }
 

}`;
