import React, { useEffect, useState } from "react";
import styles from '../styles/Menu.module.css';
import SignedIn from "./loginStatus";

import Image from 'next/image';

/**
 * The Menu with the logo and the mute button. The mute status is stored
 * in local storage so even when the user quits the page. The status is 
 * saved.
 * 
 * @param {*} props 
 * @returns 
 */
export default function Menu(props) { 
    const [muted, setMuted] = useState(null);

    useEffect(() => {
        if (muted === null) {
            let localValue = window.localStorage.getItem("muted");
            console.log("Initial value: ", localValue)
            if (localValue === "false") {
                setMuted(false);
            } else if (localValue === "true"){
                setMuted(true);
            } else {
                setMuted(false);
            }
        }
    });

    const muteSound = () => {
        console.log(muted);
        window.localStorage.setItem("muted", !muted);
        setMuted(!muted);
        console.log(" Set Storage : ", window.localStorage.getItem("muted"))
    }
    
    return (
        <div>
            <div className={styles.avatar}>
                <Image src='/images/Level1.svg'width="100%" height="100%"  alt=''></Image>
            </div>
            <div className={styles.speaker}>
                <Image src={muted ? '/images/mute.svg' : '/images/speaker.svg'} width="100%" height="100%" onClick={muteSound}></Image>
            </div>
            <div className={styles.dropdown}>
                <SignedIn></SignedIn>
            </div>
        </div>
    );
}