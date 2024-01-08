import styles from "../board/board.module.css";
import StatusOne from "../status-one/status-one.jsx";
import StatusTwo from "../status-two/status-two.jsx";
import StatusThree from "../status-three/status-three.jsx";
import StatusFour from "../status-four/status-four.jsx";
import Backlog from "../backlog/backlog.jsx";
import InProgress from "../in-progress/in-progress.jsx";
import Checking from "../checking/checking.jsx";
import Done from "../done/done.jsx";
import { useState } from "react";
import BoardContext from '../../services/boardContext.jsx';
import { useDrop } from 'react-dnd';
import AddTaskBtn from '../add-task-btn/add-task-btn.jsx';
import AddTask from '../modal/add-task/add-task.jsx';
import CleanTasksBtn from '../clean-tasks-btn/clean-tasks-btn.jsx';

function Board() {
    const [backlog, setBacklog] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [checking, setChecking] = useState([]);
    const [done, setDone] = useState([]);
    const [modalView, setModalView] = useState(false);
    const [acceptDeleteWindow, setAcceptDeleteWindow] = useState(false);
    const [acceptDeleteAllWindow, setAcceptDeleteAllWindow] = useState(false);
    const [text, setText] = useState('');
    const [disabledBtn, setDisabledBtn] = useState([]);
    const [deleteColumn, setDeleteColumn] = useState();
    const [choosenTask, setChoosenTask] = useState();

    window.onkeydown = function (e) {
        if (e.keyCode == 27) {
            setAcceptDeleteWindow(false);
            setAcceptDeleteAllWindow(false);
            setModalView(false);
            setText('');
        }
    };

    const [{ isDraggingOverBacklog }, dropRef1] = useDrop({
        accept: ['checking', 'progress', 'done'],
        drop(data) {
            setBacklog([...backlog, data]);
            setInProgress(inProgress.filter((item) => item.id !== data.id));
            setChecking(checking.filter((item) => item.id !== data.id));
            setDone(done.filter((item) => item.id !== data.id));
        },
        collect: (monitor) => ({
            isDraggingOverBacklog: monitor.isOver(),
        })
    });

    const [{ isDraggingOverInProgress }, dropRef2] = useDrop({
        accept: ['checking', 'backlog', 'done'],
        drop(data) {
            setInProgress([...inProgress, data]);
            setBacklog(backlog.filter((item) => item.id !== data.id));
            setChecking(checking.filter((item) => item.id !== data.id));
            setDone(done.filter((item) => item.id !== data.id));
        },
        collect: (monitor) => ({
            isDraggingOverInProgress: monitor.isOver(),
        })
    });

    const [{ isDraggingOverChecking }, dropRef3] = useDrop({
        accept: ['progress', 'backlog', 'done'],
        drop(data) {
            setChecking([...checking, data]);
            setBacklog(backlog.filter((item) => item.id !== data.id));
            setInProgress(inProgress.filter((item) => item.id !== data.id));
            setDone(done.filter((item) => item.id !== data.id));
        },
        collect: (monitor) => ({
            isDraggingOverChecking: monitor.isOver({ shallow: true }),
        })
        
    });

    const [{ isDraggingOverDone }, dropRef4] = useDrop({
        accept: ['progress', 'backlog', 'checking'],
        drop(data) {
            setDone([...done, data]);
            setBacklog(backlog.filter((item) => item.id !== data.id));
            setInProgress(inProgress.filter((item) => item.id !== data.id));
            setChecking(checking.filter((item) => item.id !== data.id));
        },
        collect: (monitor) => ({
            isDraggingOverDone: monitor.isOver(),
        })
    });
 
    return (
        <BoardContext.Provider value={{ backlog, setBacklog, inProgress, setInProgress, modalView, setModalView, checking, setChecking, done, setDone, acceptDeleteWindow, setAcceptDeleteWindow, text, setText, acceptDeleteAllWindow, setAcceptDeleteAllWindow, disabledBtn, setDisabledBtn, deleteColumn, setDeleteColumn, choosenTask, setChoosenTask }}>
            <CleanTasksBtn />
            <AddTask />
            <section className={styles.board}>
                <AddTaskBtn />

                <div className={styles.titles}>
                    <StatusOne />
                    <StatusTwo />
                    <StatusThree />
                    <StatusFour />
                </div>

                <div className={styles.statusList}>
                    <div className={`${styles.statusList__column} ${isDraggingOverBacklog ? styles.canDrop : null}`} ref={dropRef1}>
                        {backlog.map((el) => (
                            <Backlog key={el.id} text={el} />
                        ))}
                    </div>
                    <div className={`${styles.statusList__column} ${isDraggingOverInProgress ? styles.canDrop : null}`} ref={dropRef2}>
                        {inProgress.map((el) => (
                            <InProgress key={el.id} text={el} />
                        ))}
                    </div>
                    <div className={`${styles.statusList__column} ${isDraggingOverChecking ? styles.canDrop : ''}`} ref={dropRef3}>
                        {checking.map((el) => (
                            <Checking key={el.id} text={el} />
                        ))}
                    </div>
                    <div className={`${styles.statusList__column} ${isDraggingOverDone ? styles.canDrop : null}`} ref={dropRef4}>
                        {done.map((el) => (
                            <Done key={el.id} text={el} />
                        ))}
                    </div>
                </div>

            </section>
        </BoardContext.Provider>
    );
}

export default Board;
