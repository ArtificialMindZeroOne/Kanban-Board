import styles from "../accept-delete-all-task/accept-delete-all-task.module.css";
import logoCloseBtn from '../../../assets/closeBtn.png';
import { useContext } from 'react';
import BoardContext from '../../../services/boardContext.jsx';

function AcceptDeleteAllTask({ setter, column }) {
    const { setBacklog, setInProgress, setChecking, setDone, acceptDeleteAllWindow, setAcceptDeleteAllWindow, choosenTask } = useContext(BoardContext);

    const closeModal = (e) => {
        setAcceptDeleteAllWindow(false);
        e.preventDefault();
    };

    const deleteThisTask = (e) => {
        e.preventDefault();
        setBacklog([]);
        setInProgress([]);
        setChecking([]);
        setDone([]);
        setAcceptDeleteAllWindow(false);
    };

    return (
        <>
            <div className={`${styles.back} ${acceptDeleteAllWindow ? styles.showBack : ''}`} onClick={closeModal}></div>
            <div className={`${styles.modal} ${acceptDeleteAllWindow ? styles.show : ''}`}>
                <form className={`${styles.form}`} onSubmit={deleteThisTask}>
                    <h1 className={`${styles.title}`}>All tasks will be deleted, are you agree?</h1>
                    <img src={logoCloseBtn} alt="closeBtnImg" className={`${styles.closeBtn}`} onClick={closeModal}></img>
                    <div className={`${styles.btnsBlock}`}>
                        <span className={`${styles.buttonBlock}`} onClick={closeModal}><button className={`${styles.buttonForm}`} type="submit">No</button></span>
                        <span className={`${styles.buttonBlock}`}><button className={`${styles.buttonForm}`} type="submit">Yes</button></span>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AcceptDeleteAllTask;
