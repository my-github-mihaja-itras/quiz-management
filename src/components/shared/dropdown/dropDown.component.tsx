import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import style from "./dropdown.module.css";

import IconThreeDot from "../icons/iconThreeDot";

const Dropdown = ({ children, id, isOpen, onToggle }: any) => {

  const dropdownRef = useRef<HTMLDivElement>(null);

  // handle click outside the dropdown component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle(id);
      }
    };
  
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id, isOpen, onToggle]);


  return (
    <div ref={dropdownRef} className={style.dropdown} key={id}>
      <button className={style.actionBtn} onClick={() => onToggle(id)}>
        <IconThreeDot />
      </button>
      {isOpen && (
        <div className={style.dropdownMenu}>
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              key: index,
              className: style.dropdownItem,
            })
          )}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Dropdown;
