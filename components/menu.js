import React, { useState } from "react";
import styles from '../styles/Menu.module.css';
import SignedIn from "./loginStatus";

import Image from 'next/image';



export default function Menu(props) { 
    const [muted, setMuted] = useState(props.muted);
    
    return (
        <div>
            <div className={styles.container}>            
                <Image src='/images/Level1.svg' layout='fill' alt=''></Image>
            </div>
            <Image src={muted ? '/images/muted.png' : '/images/sound.png'} width="100" height="100" onClick={() => setMuted(!muted)}></Image>
            <div className={styles.dropdown}>
                <SignedIn></SignedIn>
            </div>
        </div>
    );
}