import { Tool } from '../lib/types';
import styles from './Toolbox.module.css';

type Props = {
  tool: Tool,
  setTool: (tool: Tool) => void;
};

const Toolbox = ({ tool, setTool }: Props) => {
  const _tool = tool;
  const ToolButton = ({ tool }: { tool: Tool }) => {
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
      <ToolButton tool="fill" />
    </div>
  );
};

export default Toolbox;
