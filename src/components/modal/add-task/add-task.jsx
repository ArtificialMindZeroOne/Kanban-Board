import styles from "../add-task/add-task.module.css";
import logoCloseBtn from '../../../assets/closeBtn.png';
import logoMicro from '../../../assets/micro.png';
import { useContext, matchReply, useState, useRef, useEffect } from 'react';
import BoardContext from '../../../services/boardContext.jsx';
import { v4 as uuid } from 'uuid';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';






function AddTask() {
    const { modalView, setModalView, backlog, setBacklog, text, setText } = useContext(BoardContext);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const textArea = useRef();

    const closeModal = () => {
        setModalView(false);
        setText('');
        resetTranscript();
        SpeechRecognition.stopListening()
    };

    const addNewTask = (e) => {
        e.preventDefault();
        setText('');
        setBacklog([...backlog, { id: uuid(), task: textArea.current.value }]);
        setModalView(false);
        resetTranscript();
        SpeechRecognition.stopListening()
    };


    const handleVoice = () => {
        SpeechRecognition.startListening();
    }

    useEffect(() => {
        textArea.current.value = [`${text} ${transcript}`].join('').replace(/(^[\s]+|[\s]+$)/g, '');;
    }, [transcript]);


    const handleVoiceStop = () => {
        SpeechRecognition.stopListening()
    };

    return (
        <>
            <div className={`${styles.back} ${modalView ? styles.showBack : null}`} onClick={closeModal}></div>
            <div className={`${styles.modal} ${modalView ? styles.show : null}`}>
                <form className={`${styles.form}`}>
                    <h1 className={`${styles.title}`}>Enter the task text</h1>
                    <textarea className={`${styles.textarea}`}
                        onChange={e => setText(e.target.value)} ref={textArea}></textarea>
                    <img src={logoCloseBtn} alt="Close button image" className={`${styles.closeBtn}`} onClick={closeModal}></img>
                    <img
                        src={logoMicro}
                        alt="Microphone logo"
                        className={`${styles.micro}`}
                        onClick={handleVoice}
                    />

                    <button onClick={handleVoiceStop}>Stop</button>
                    <span className={`${styles.buttonBlock} ${text.toString().length >= 0 ? '' : styles.disabled}`} onClick={addNewTask}><button className={`${styles.buttonForm}`} type="submit">+</button></span>
                </form>
            </div>

        </>
    );
}

export default AddTask;
