import styles from "../in-progress/in-progress.module.css";
import { useDrag } from "react-dnd";

function InProgress({ text }) {

  const [{ isDraggingStart }, dragRef] = useDrag({
    type: 'progress',
    item: text,
    collect: (monitor) => ({
      isDraggingStart: monitor.isDragging(),
    })
  })

  return (
    <article className={`${styles.inProgress} ${isDraggingStart ? styles.hidden : null}`} ref={dragRef}>
      {text.task}
    </article >
  );
}

export default InProgress;
