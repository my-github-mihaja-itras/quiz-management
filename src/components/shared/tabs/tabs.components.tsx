import { useEffect, useState } from "react";
import style from "./tabs.module.css";
import IconArrowLeft from "../icons/iconArrowLeft";
import { useRouter } from "next/navigation";

interface TabsConstant {
  label: string;
  content: any;
}

interface TabsProps<T> {
  tabsConstant: TabsConstant[];
  onChangePage?: any;
}

const Tabs: React.FC<TabsProps<any>> = ({ tabsConstant, onChangePage }) => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  const onClick = () => {
    router.back();
  };

  useEffect(() => {
    onChangePage && onChangePage(activeTab);
  }, [activeTab]);
  return (
    <div className={style.container}>
      <div className={style.tabsHeader}>
        <button className={style.btnBack} type="button" onClick={onClick}>
          <IconArrowLeft />
        </button>
        <div className={style.navTabs}>
          {tabsConstant.map((tab, index) => (
            <div
              key={index}
              className={`${index === activeTab ? style.tabActive : style.tab}`}
              onClick={() => handleTabClick(index)}
            >
              <span className={style.label}> {tab.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={style.tabContent}>{tabsConstant[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
