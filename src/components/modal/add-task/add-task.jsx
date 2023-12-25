import styles from "../add-task/add-task.module.css";
import logoCloseBtn from '../../../assets/closeBtn.png';
import { useContext, useEffect, useRef, useState } from 'react';
import BoardContext from '../../../services/boardContext.jsx';
import { v4 as uuid } from 'uuid';

function AddTask() {
    const [text, setText] = useState('');
    const { modalView, setModalView, backlog, setBacklog } = useContext(BoardContext);
    const [id, setId] = useState(1);
    const textArea = useRef();

    const closeModal = () => {
        setModalView(false)
        setText('');
    };

    window.onkeydown = function (e) {
        if (e.keyCode == 27) {
            setModalView(false)
            setText('');
        }
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
                    <img src={logoCloseBtn} alt="closeBtnImg" className={`${styles.closeBtn}`} onClick={closeModal}></img>
                    <span className={`${styles.buttonBlock}`} onClick={addNewTask}><button className={`${styles.buttonForm}`} type="submit">+</button></span>
                </form>
            </div>

        </>
    );
}

export default AddTask;
