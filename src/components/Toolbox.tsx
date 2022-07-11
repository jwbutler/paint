import { ToolType } from '../lib/tools';
import styles from './Toolbox.module.css';

type Props = {
  tool: ToolType,
  setTool: (tool: ToolType) => void;
};

const Toolbox = ({ tool, setTool }: Props) => {
  const _tool = tool;
  const ToolButton = ({ tool }: { tool: ToolType }) => {
    const selected = (tool === _tool);
    return (
      <button
        className={selected ? `${styles.tool} ${styles.selected}` : styles.tool}
        onClick={() => setTool(tool)}
      >
        {tool}
      </button>
    );
  };
  
  return (
    <div className={styles.toolbox}>
      <ToolButton tool="draw" />
      <ToolButton tool="line" />
      <ToolButton tool="box" />
      <ToolButton tool="rect" />
      <ToolButton tool="ellipse" />
      <ToolButton tool="fill" />
    </div>
  );
};

export default Toolbox;
