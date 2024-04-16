"use client";
import { useState } from 'react';
import style from './head-manu.module.css';
import { TabMenu } from '../form.interfaces';


export default function HeadMenu( { tabs, getActive } : { tabs: TabMenu, getActive: any}) {
  const [active , setActive] = useState<number>(0);

  const handleActive = (index: number) => {
    setActive(index);
    getActive(index);
  }

  return (
    <div className={style.container}>
        { tabs.menus.map((menu, index) => 
          <p 
            key={index}
            className={ index === active? style.activeTab : style.tab}
            onClick={() => handleActive(index)}
          >{menu}</p>
        )}
    </div>
  )
}