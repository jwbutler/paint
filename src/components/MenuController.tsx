import Menu, { type MenuData } from './Menu';

type Props = {
  clearCanvas: () => void,
  saveImage: () => void,
  loadImage: () => Promise<void>
  resizeCanvas: () => void,
};

const MenuController = ({ clearCanvas, saveImage, loadImage, resizeCanvas }: Props) => {
  const data: MenuData[] = [
    {
      title: 'File',
      items: [
        { label: 'New', onSelect: clearCanvas },
        { label: 'Save', onSelect: saveImage },
        { label: 'Load', onSelect: loadImage },
      ]
    },
    {
      title: 'Edit',
      items: [
        { label: 'Resize', onSelect: resizeCanvas }
      ]
    }
  ];
  
  return (
    <Menu data={data} />
  );
};

export default MenuController;
