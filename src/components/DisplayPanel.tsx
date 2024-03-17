import {ReactNode, useState} from "react";
import styles from './DisplayPanel.module.css';

const DisplayPanel = ({title, children}: { title: string, children: ReactNode }) => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <div className={styles.displayPanel} style={{backgroundColor: show ? '#ffc0a0' : 'lightgray'}}>
      <h3>{title}</h3>
      <button onClick={toggle}>Show/Hide</button>
      {show && children}
    </div>
  );
}

export default DisplayPanel;
