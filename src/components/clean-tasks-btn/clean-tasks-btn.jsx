import styles from "../clean-tasks-btn/clean-tasks-btn.module.css";
import { useContext } from 'react';
import BoardContext from '../../services/boardContext.jsx';

function CleanTasksBtn() {
    const { setBacklog, setInProgress, setChecking, setDone } = useContext(BoardContext);

    const cleanAllTasks = () => {
        setBacklog([]);
        setInProgress([]);
        setChecking([]);
        setDone([]);
    };

    return (
        <div className={`${styles.col}`} onClick={cleanAllTasks}>
            <div className={`${styles.container - 4}`}>
                <div className={`${styles.btn} ${styles.btn_four}`}>
                    <span>clean all tasks</span>
                </div>
            </div>
        </div>
    )
}

export default CleanTasksBtn;
