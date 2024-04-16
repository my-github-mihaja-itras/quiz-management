// ScrollableContainer.tsx

import React, { useEffect, useState } from "react";
import style from "./ScrollableContainer.module.css";

interface ScrollableContainerProps {
  // Ajoutez les propriétés nécessaires ici
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = (props) => {
  const [actualComm, setActualComm] = useState<number | null>();
  const handleItemClick = (index: number) => {
    index !== actualComm ? setActualComm(index) : setActualComm(null);

    // Obtenez la référence à l'élément DOM du conteneur
    const container = document.getElementById("scrollable-container");

    // Obtenez la référence à l'élément DOM de l'élément cliqué
    const item = document.getElementById(`item-${index}`);

    // Assurez-vous que le conteneur et l'élément existent avant de faire défiler
    if (container && item) {
      // Calculez la position de l'élément par rapport à la partie visible du conteneur
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      // Si l'élément est en dessous de la partie visible, faites défiler vers le haut
      if (itemRect.bottom > containerRect.bottom) {
        container.scrollTo({
          top: container.scrollTop + itemRect.bottom - containerRect.bottom,
          behavior: "smooth",
        });
      }

      // Si l'élément est au-dessus de la partie visible, faites défiler vers le haut
      if (itemRect.top < containerRect.top) {
        container.scrollTo({
          top: container.scrollTop - (containerRect.top - itemRect.top),
          behavior: "smooth",
        });
      }
    }
  };

 
  return (
    <div id="scrollable-container" className={style.scrollableContainer}>
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          id={`item-${index}`}
          className={style.scrollableItem}
          onClick={() => handleItemClick(index)}
        >
          Contenu de l'élément {index}
          {index === actualComm ? (
            <div className={style.comment}>
              un commentaire {index}
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScrollableContainer;
