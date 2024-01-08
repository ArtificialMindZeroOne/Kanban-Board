import styles from "../add-task/add-task.module.css";
import logoCloseBtn from '../../../assets/closeBtn.png';
import logoMicro from '../../../assets/micro.png';
import recordLogo from '../../../assets/record-logo.gif';
import { useContext, useRef, useEffect, useState } from 'react';
import BoardContext from '../../../services/boardContext.jsx';
import { v4 as uuid } from 'uuid';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


function AddTask() {
    const { modalView, setModalView, backlog, setBacklog, text, setText, disabledBtn, setDisabledBtn, setAcceptDeleteWindow, setAcceptDeleteAllWindow } = useContext(BoardContext);
    const [toggleValueMicro, setToggleValueMicro] = useState(false);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const textArea = useRef();

    window.onkeydown = function (e) {
        if (e.keyCode == 27) {
            setAcceptDeleteWindow(false);
            setAcceptDeleteAllWindow(false);
            setModalView(false);
            setText('');
            if (toggleValueMicro === true) {
                setToggleValueMicro(false);
                SpeechRecognition.stopListening();
                resetTranscript();
            }
        }
    };

    const closeModal = () => {
        if (toggleValueMicro === true) {
            setToggleValueMicro(false);
            SpeechRecognition.stopListening();
        }
        setModalView(false);
        resetTranscript();
    };

    const addNewTask = (e) => {
        e.preventDefault();
        setBacklog([...backlog, { id: uuid(), task: textArea.current.value }]);
        setModalView(false);
        resetTranscript();
    };

    const handleVoiceStart = () => {
        setToggleValueMicro(!toggleValueMicro);
        if (toggleValueMicro === false) {
            SpeechRecognition.startListening({ continuous: true });
        } else {
            SpeechRecognition.stopListening({ continuous: false });
        }
    }

    useEffect(() => {
        textArea.current.value = ([`${text} ${transcript}`].join('').replace(/(^[\s]+|[\s]+$)/g, ''))
    }, [transcript]);

    useEffect(() => {
        setDisabledBtn([textArea.current.value]);
    }, [text, transcript]);

    useEffect(() => {
        setText([`${text}`].join('').replace(/(^[\s]+|[\s]+$)/g, ''));
    }, [listening])

    useEffect(() => {
        textArea.current.focus();
    }, [modalView]);

    return (
        <>
            <div className={`${styles.back} ${modalView ? styles.showBack : null}`} onClick={closeModal}></div>
            <div className={`${styles.modal} ${modalView ? styles.show : null}`}>
                <form className={`${styles.form}`}>
                    <h1 className={`${styles.title}`}>Enter the task text</h1>
                    <textarea className={`${styles.textarea}`} minlength="6"
                        onChange={e => {
                            setText(e.target.value);
                            resetTranscript();
                        }} ref={textArea} id="textArea" placeholder="Write the task and you can also press microphone for voice record"></textarea>
                    <img src={logoCloseBtn} alt="Close button image" className={`${styles.closeBtn}`} onClick={closeModal}></img>
                    <img src={recordLogo} alt="Record logo" className={`${styles.record} ${toggleValueMicro ? '' : styles.hidden}`}></img>
                    <img
                        src={logoMicro}
                        alt="Microphone logo"
                        className={`${styles.micro} ${toggleValueMicro === true ? styles.red : ''}`}
                        onClick={handleVoiceStart}
                    />
                    <span className={`${styles.buttonBlock} ${disabledBtn.toString('').replace(/\s*/g, "").length >= 6 && toggleValueMicro === false ? '' : styles.disabled}`} onClick={addNewTask}><button className={`${styles.buttonForm}`} type="submit">+</button></span>
                </form>
            </div>

        </>
    );
}

export default AddTask;
