import styles from "../clean-tasks-btn/clean-tasks-btn.module.css";
import { useContext } from 'react';
import BoardContext from '../../services/boardContext.jsx';
import AcceptDeleteAllTask from '../modal/accept-delete-all-task/accept-delete-all-task.jsx';

function CleanTasksBtn() {
    const { backlog, inProgress, checking, done, setAcceptDeleteAllWindow } = useContext(BoardContext);

    const deleteAllTasks = () => {
        setAcceptDeleteAllWindow(true);
    };

    return (
        <>
            <div className={`${styles.col} ${backlog.length > 0 || inProgress.length > 0 || checking.length > 0 || done.length > 0 ? '' : styles.disabled}`} onClick={deleteAllTasks}>
                <div className={`${styles.container - 4}`}>
                    <div className={`${styles.btn} ${styles.btn_four}`}>
                        <span>clean all tasks</span>
                    </div>
                </div>
            </div>
            <AcceptDeleteAllTask />
        </>
    )
}

export default CleanTasksBtn;
