import styles from "../done/done.module.css";
import { useDrag } from "react-dnd";
import logoCloseBtn from '../../assets/delete-pin.png';
import { useContext } from 'react';
import BoardContext from '../../services/boardContext.jsx';
import AcceptDeleteTask from '../modal/accept-delete-task/accept-delete-task.jsx';

function Done({ text }) {
  const { setAcceptDeleteWindow, setChoosenTask, setDeleteColumn } = useContext(BoardContext);

  const [{ isDraggingStart }, dragRef] = useDrag({
    type: 'done',
    item: text,
    collect: (monitor) => ({
      isDraggingStart: monitor.isDragging(),
    })
  })

  const deleteThisTask = () => {
    setAcceptDeleteWindow(true);
    setChoosenTask(text);
    setDeleteColumn('done');
  };

  return (
    <>
      <article className={`${styles.done} ${isDraggingStart ? styles.hidden : null}`} ref={dragRef}>
        {text.task}
        <img src={logoCloseBtn} alt="Delete icon" className={`${styles.deletePin}`} onClick={deleteThisTask}></img>
      </article>
      <AcceptDeleteTask />
    </>
  );
}

export default Done;
