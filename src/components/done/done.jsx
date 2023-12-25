import styles from "../done/done.module.css";
import { useDrag } from "react-dnd";

function Done({ text }) {

  const [{ isDraggingStart }, dragRef] = useDrag({
    type: 'done',
    item: text,
    collect: (monitor) => ({
      isDraggingStart: monitor.isDragging(),
    })
  })

  return (
    <article className={`${styles.done} ${isDraggingStart ? styles.hidden : null}`} ref={dragRef}>
      {text.task}
    </article>
  );
}

export default Done;
