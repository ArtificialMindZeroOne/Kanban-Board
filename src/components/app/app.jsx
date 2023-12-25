import styles from "../app/app.module.css";
import Header from "../header/header.jsx";
import Board from "../board/board.jsx";

function App() {

  return (
    <main className={styles.app}>
      <Header />
      <Board />
    </main>
  );
}

export default App;
