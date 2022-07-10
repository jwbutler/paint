import Menu, { type MenuData } from './Menu';

type Props = {
  clearCanvas: () => void,
  saveImage: () => void,
  loadImage: () => Promise<void>
};

const MenuController = ({ clearCanvas, saveImage, loadImage }: Props) => {
  const data: MenuData[] = [
    {
      title: 'File',
      items: [
        { label: 'New', onSelect: clearCanvas },
        { label: 'Save', onSelect: saveImage },
        { label: 'Load', onSelect: loadImage },
      ]
    }
  ];
  
  return (
    <Menu data={data} />
  );
};

export default MenuController;
