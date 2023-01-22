import React from "react";
import {Link} from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {

  return (
    <div className={styles.fondoImg}>
        <div className={styles.containerLand}>
        <Link to="/home">
                <button className={styles.btnLanding}>
                    <img  src="https://fontmeme.com/permalink/221111/03fc789a173a13a4064d3af7498c4256.png" alt="pirates-of-the-caribbean-font" border="0"/>
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Landing