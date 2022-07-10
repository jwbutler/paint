import { ReactNode, useState } from 'react';
import styles from './Menu.module.css';

type MenuData = {
  title: string,
  items: {
    label: string,
    onSelect: () => void
  }[]
};

type Props = {
  data: MenuData[];
};

const Menu = ({ data }: Props) => {
  const [selectedHeader, setSelectedHeader] = useState<string | null>(null);

  type HeaderProps = {
    label: string,
    children?: ReactNode
  };
  
  const Header = ({ label, children }: HeaderProps) => {
    const isOpen = selectedHeader === label;
    const handleClick = () => {
      if (isOpen) {
        setSelectedHeader(null);
      } else {
        setSelectedHeader(label);
      }
    };
    return (
      <>
        <button
          className={styles.header}
          onClick={handleClick}
        >
          {label}
        </button>
        {isOpen && (
          <div className={styles.subMenu}>
            {children}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.menu}>
      {data.map(menuData => (
        <Header label={menuData.title} key={menuData.title}>
          {menuData.items.map(item => (
            <Item label={item.label} onClick={item.onSelect} key={item.label} />
          ))}
        </Header>
      ))}
    </div>
  );
};

type ItemProps = {
  label: string,
  onClick: () => void
};

const Item = ({ label, onClick }: ItemProps) => {
  return (
    <button
      className={styles.item}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Menu;
export type { MenuData };
