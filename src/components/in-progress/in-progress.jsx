import styles from "../in-progress/in-progress.module.css";
import { useDrag } from "react-dnd";
import logoCloseBtn from '../../assets/delete-pin.png';
import { useContext } from 'react';
import BoardContext from '../../services/boardContext.jsx';
import AcceptDeleteTask from '../modal/accept-delete-task/accept-delete-task.jsx';

function InProgress({ text }) {
  const { inProgress, setInProgress, setAcceptDeleteWindow, setChoosenTask } = useContext(BoardContext);

  const [{ isDraggingStart }, dragRef] = useDrag({
    type: 'progress',
    item: text,
    collect: (monitor) => ({
      isDraggingStart: monitor.isDragging(),
    })
  })

  const deleteThisTask = () => {
    setAcceptDeleteWindow(true);
    setChoosenTask(text);
  };

  return (
    <>
      <article className={`${styles.inProgress} ${isDraggingStart ? styles.hidden : null}`} ref={dragRef}>
        {text.task}
        <img src={logoCloseBtn} alt="deleteIon" className={`${styles.deletePin}`} onClick={deleteThisTask}></img>
      </article >
      <AcceptDeleteTask setter={setInProgress} column={inProgress} />
    </>
  );
}

export default InProgress;
