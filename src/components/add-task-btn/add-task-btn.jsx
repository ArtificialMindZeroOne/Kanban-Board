import styles from "../add-task-btn/add-task-btn.module.css";
import { useContext } from 'react';
import BoardContext from '../../services/boardContext.jsx';

function AddTaskBtn() {
    const { modalView, setModalView } = useContext(BoardContext);

    const openModal = () => {
        setModalView(true)
    };

    return (
        <><a href="#" onClick={openModal}><button className={`${styles.button}`}>add task</button></a></>
    );
}

export default AddTaskBtn;
