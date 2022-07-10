import Menu, { type MenuData } from './Menu';

type Props = {
  clearCanvas: () => void,
  saveCanvas: () => void,
  loadCanvas: () => void
};

const MenuController = ({ clearCanvas, saveCanvas, loadCanvas }: Props) => {
  const data: MenuData[] = [
    {
      title: 'File',
      items: [
        { label: 'New', onSelect: clearCanvas },
        { label: 'Save', onSelect: saveCanvas },
        { label: 'Load', onSelect: loadCanvas },
      ]
    }
  ];
  
  return (
    <Menu data={data} />
  );
};

export default MenuController;
