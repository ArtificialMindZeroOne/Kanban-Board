import styles from "../backlog-list/backlog-list.module.css";
import { useDrag } from 'react-dnd';

function BacklogList({ text }) {

  const [{ isDraggingStart }, dragRef] = useDrag({
    type: 'backlog',
    item: text,
    collect: (monitor) => ({
      isDraggingStart: monitor.isDragging(),
    })
  })

  return (
    <article className={`${styles.backlogList} ${isDraggingStart ? styles.hidden : null}`} ref={dragRef}>
      {text.task}
    </article>
  );
}

export default BacklogList;
