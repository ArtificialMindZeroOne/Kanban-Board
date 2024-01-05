import styles from "../backlog/backlog.module.css";
import { useDrag } from 'react-dnd';
import logoCloseBtn from '../../assets/delete-pin.png';
import { useContext, useEffect } from 'react';
import BoardContext from '../../services/boardContext.jsx';
import AcceptDeleteTask from '../modal/accept-delete-task/accept-delete-task.jsx';

function Backlog({ text }) {
  const { backlog, setBacklog, setAcceptDeleteWindow, setChoosenTask } = useContext(BoardContext);


  const [{ isDraggingStart }, dragRef] = useDrag({
    type: 'backlog',
    item: text,
    collect: (monitor) => ({
      isDraggingStart: monitor.isDragging(),
    })
  });

  const deleteThisTask = () => {
    setAcceptDeleteWindow(true);
    setChoosenTask(text);
  };

  return (
    <>
      <article className={`${styles.backlog} ${isDraggingStart ? styles.hidden : null}`} ref={dragRef}>
        {text.task}
        <img src={logoCloseBtn} alt="Delete icon" className={`${styles.deletePin}`} onClick={deleteThisTask}></img>
      </article>
      <AcceptDeleteTask setter={setBacklog} column={backlog} />
    </>
  );
}

export default Backlog;
