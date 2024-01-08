import styles from "../accept-delete-task/accept-delete-task.module.css";
import logoCloseBtn from '../../../assets/closeBtn.png';
import { useContext } from 'react';
import BoardContext from '../../../services/boardContext.jsx';

function AcceptDeleteTask() {
    const { acceptDeleteWindow, setAcceptDeleteWindow, setBacklog, backlog, inProgress, setInProgress, deleteColumn, choosenTask, checking, setChecking, done, setDone } = useContext(BoardContext);

    const closeModal = (e) => {
        e.preventDefault();
        setAcceptDeleteWindow(false);
    };

    const deleteThisTask = (e) => {
        e.preventDefault();
        if (deleteColumn === 'backlog') {
            setBacklog([...backlog.filter((el) => el !== choosenTask)]);
        } else if (deleteColumn === 'inProgress') {
            setInProgress([...inProgress.filter((el) => el !== choosenTask)]);
        } else if (deleteColumn === 'checking') {
            setChecking([...checking.filter((el) => el !== choosenTask)]);
        } else if (deleteColumn === 'done') {
            setDone([...done.filter((el) => el !== choosenTask)]);
        }
        setAcceptDeleteWindow(false);
    };

    return (
        <>
            <div className={`${styles.back} ${acceptDeleteWindow ? styles.showBack : ''}`} onClick={closeModal}></div>
            <div className={`${styles.modal} ${acceptDeleteWindow ? styles.show : ''}`}>
                <form className={`${styles.form}`} onSubmit={deleteThisTask}>
                    <h1 className={`${styles.title}`}>This task will be deleted, are you agree?</h1>
                    <img src={logoCloseBtn} alt="Close button icon" className={`${styles.closeBtn}`} onClick={closeModal}></img>
                    <div className={`${styles.btnsBlock}`}>
                        <span className={`${styles.buttonBlock}`} onClick={closeModal}><button className={`${styles.buttonForm}`} type="submit">No</button></span>
                        <span className={`${styles.buttonBlock}`}><button className={`${styles.buttonForm}`} type="submit">Yes</button></span>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AcceptDeleteTask;
