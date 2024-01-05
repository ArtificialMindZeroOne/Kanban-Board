import styles from "../accept-delete-task/accept-delete-task.module.css";
import logoCloseBtn from '../../../assets/closeBtn.png';
import { useContext } from 'react';
import BoardContext from '../../../services/boardContext.jsx';

function AcceptDeleteTask({ setter, column }) {
    const { acceptDeleteWindow, setAcceptDeleteWindow, choosenTask } = useContext(BoardContext);

    const closeModal = (e) => {
        setAcceptDeleteWindow(false);
        e.preventDefault();
    };

    const deleteThisTask = (e) => {
        e.preventDefault();
        setter([...column.filter((el) => el !== choosenTask)]);
        setAcceptDeleteWindow(false);
    };

    return (
        <>
            <div className={`${styles.back} ${acceptDeleteWindow ? styles.showBack : ''}`} onClick={closeModal}></div>
            <div className={`${styles.modal} ${acceptDeleteWindow ? styles.show : ''}`}>
                <form className={`${styles.form}`} onSubmit={deleteThisTask}>
                    <h1 className={`${styles.title}`}>This task will be deleted, are you agree?</h1>
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

export default AcceptDeleteTask;
