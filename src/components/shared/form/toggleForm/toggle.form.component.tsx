import { useEffect, useState } from "react";
import style from "./toggle.module.css";

interface ToggleProps {
  defaultChecked?: boolean;
  onChange?: any;
  register: any;
  fieldName: string;
  readOnly?: any;
  required?: boolean;
}
const Toggle: React.FC<ToggleProps> = ({
  defaultChecked,
  onChange,
  register,
  fieldName,
  readOnly,
  required,
}) => {
  // Utilisation de useState pour gérer l'état isChecked
  const [isChecked, setChecked] = useState(defaultChecked ?? false);

  // Mise à jour de l'état si les propriétés changent
  useEffect(() => {
    setChecked(defaultChecked ?? false);
  }, [defaultChecked]);

  const handleToggle = () => {
    const newValue = !isChecked;
    setChecked(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <label className={style.switchBox}>
      <input
        type="checkbox"
        checked={isChecked} // Utilisation de l'état local isChecked
        disabled={readOnly}
        {...register(fieldName as any, {
          required: false,
          value: isChecked,
          onChange: handleToggle,
        })}
      />
      <span
        className={`${style.slider} ${readOnly ? style.slideInactif : ""}`}
      ></span>
    </label>
  );
};

export default Toggle;
