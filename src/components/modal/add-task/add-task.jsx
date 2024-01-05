import styles from "../add-task/add-task.module.css";
import logoCloseBtn from '../../../assets/closeBtn.png';
import { useContext } from 'react';
import BoardContext from '../../../services/boardContext.jsx';
import { v4 as uuid } from 'uuid';

function AddTask() {
    const { modalView, setModalView, backlog, setBacklog, text, setText } = useContext(BoardContext);

    const closeModal = () => {
        setModalView(false);
        setText('');
    };

    const addNewTask = (e) => {
        e.preventDefault();
        setBacklog([...backlog, { id: uuid(), task: text }]);
        setModalView(false);
        setText('');
    }

    return (
        <>
            <div className={`${styles.back} ${modalView ? styles.showBack : null}`} onClick={closeModal}></div>
            <div className={`${styles.modal} ${modalView ? styles.show : null}`}>
                <form className={`${styles.form}`}>
                    <h1 className={`${styles.title}`}>Enter the task text</h1>
                    <textarea className={`${styles.textarea}`} value={text}
                        onChange={e => setText(e.target.value)}>{text}</textarea>
                    <img src={logoCloseBtn} alt="Close button image" className={`${styles.closeBtn}`} onClick={closeModal}></img>
                    <span className={`${styles.buttonBlock} ${text.length >= 6 ? '' : styles.disabled}`} onClick={addNewTask}><button className={`${styles.buttonForm}`} type="submit">+</button></span>
                </form>
            </div>

        </>
    );
}

export default AddTask;
