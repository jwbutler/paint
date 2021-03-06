import Menu, { type MenuData } from './Menu';

type Props = {
  clearCanvas: () => void,
  saveImage: () => void,
  loadImage: () => Promise<void>,
  undo: () => void
};

const MenuController = ({ clearCanvas, saveImage, loadImage, undo }: Props) => {
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
        { label: 'Undo', onSelect: undo }
      ]
    }
  ];
  
  return (
    <Menu data={data} />
  );
};

export default MenuController;
