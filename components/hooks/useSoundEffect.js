import { useEffect, useState } from "react";

export default function useSoundEffect(url) {
    const [audio, setAudio] = useState(null);
    // const [playing, setPlaying] = useState(false);

    const start = () => {
        if (audio !== null) {
            audio.currentTime = 0;
            audio.play();
        }
    };

    // const ended = () => setPlaying(false);

    useEffect(() => {
        if (audio === null) {
            let a = new Audio(url)
            // a.onended = ended;
            setAudio(a)
        }
    });

    // useEffect(() => {
    //     if (window.localStorage.getItem("muted")) {
    //         audio.muted = true;
    //     }

    //     if (playing) {
    //         audio.currentTime = 0;
    //         audio.play();
    //     }
        
    // }, [playing]);


    return [start];
}