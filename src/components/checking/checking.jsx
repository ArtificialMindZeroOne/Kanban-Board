import styles from "../checking/checking.module.css";
import { useDrag } from "react-dnd";
import logoCloseBtn from '../../assets/delete-pin.png';
import { useContext } from 'react';
import BoardContext from '../../services/boardContext.jsx';
import AcceptDeleteTask from '../modal/accept-delete-task/accept-delete-task.jsx';

function Checking({ text }) {
  const { setAcceptDeleteWindow, setChoosenTask, setDeleteColumn } = useContext(BoardContext);

  const [{ isDraggingStart }, dragRef] = useDrag({
    type: 'checking',
    item: text,
    collect: (monitor) => ({
      isDraggingStart: monitor.isDragging(),
    })
  })

  const deleteThisTask = () => {
    setAcceptDeleteWindow(true);
    setChoosenTask(text);
    setDeleteColumn('checking');
  };

  return (
    <>
      <article className={`${styles.checking} ${isDraggingStart ? styles.hidden : null}`} ref={dragRef}>
        {text.task}
        <img src={logoCloseBtn} alt="Delete icon" className={`${styles.deletePin}`} onClick={deleteThisTask}></img>
      </article>
      <AcceptDeleteTask />
    </>
  );
}

export default Checking;
