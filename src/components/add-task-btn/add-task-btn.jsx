import styles from "../add-task-btn/add-task-btn.module.css";
import { useContext } from 'react';
import BoardContext from '../../services/boardContext.jsx';

function AddTaskBtn() {
    const { setModalView, setText, setDisabledBtn } = useContext(BoardContext);

    const openModal = () => {
        document.getElementById('textArea').value = '';
        setText('');
        setDisabledBtn([]);
        setModalView(true);
    };

    return (
        <><a href="#" onClick={openModal}><button className={`${styles.button}`}>add task</button></a></>
    );
}

export default AddTaskBtn;
