import styles from "../checking/checking.module.css";
import { useDrag } from "react-dnd";

function Checking({ text }) {

  const [{ isDraggingStart }, dragRef] = useDrag({
    type: 'checking',
    item: text,
    collect: (monitor) => ({
      isDraggingStart: monitor.isDragging(),
    })
  })

  return (
    <article className={`${styles.checking} ${isDraggingStart ? styles.hidden : null}`} ref={dragRef}>
      {text.task}
    </article>
  );
}

export default Checking;
