import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LevelIcon from "../../components/levelIcon";
import styles from "../../styles/World.module.css";
import cookieCutter from "cookie-cutter";
import ReactAudioPlayer from "react-audio-player";
import Modal from "../../components/Modal";
import Image from "next/dist/client/image";

/**
 * Displays all of the available quizes for the world. The levels are passed
 * through the props after retrieving it from the api in the getServerSide props
 * function. The function uses the 
 */
export default function World(props) {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });
  const [levels, setLevels] = useState([]);
  const [endWorld, setEndWorld] = useState(false);
  const enterSound = useRef(null);
  const finishSound = useRef(null);
  const router = useRouter();

  useEffect(() => {
    //Initialise the world levels.
    if (levels.length === 0) {
      let alteredlevels = [...props.levels];

      //Sort the levels by level number
      alteredlevels.sort((a, b) => a.levelNumber - b.levelNumber).forEach((level, index, levels) => {
        //Check cookies if the level has been completed, and make available if it has
        if (cookieCutter.get(level.link) === "complete") {
          console.log(index, levels.length)
          if (index < levels.length -1) levels[index + 1]["isAvailable"] = true;
          level["isAvailable"] = true;
        }
        return level;
      });

      //Set the level state
      setLevels(alteredlevels);

      //Check if the last world has been complete
      if(cookieCutter.get(alteredlevels.at(-1).link) === "complete" && window.localStorage.getItem("EndWorld") !== "true") {
        window.localStorage.setItem("EndWorld", "true")
        finishSound.current.audioEl.current.play();
        setEndWorld(true);
      }
    }
  });

  useEffect(() => {
    //Assign demensions for the page for the line SVG
    if (targetRef.current) {
      setDimensions({
        width: window.innerWidth -10,
        height: window.innerHeight -10
      });
    }
  }, [targetRef]);  

  /**
   * The lines that are displayed to connect the world map. The position of
   * each lines start and end is based on the position from the database, the
   * size of the icons, and the screen dimenstion.
   * 
   * @returns Array of SVG lines
   */
  const lines = () => {
    const lines =[]
    for (let index = 0; index < levels.length -1; index++) {
      const level = levels[index];
      let iconSize = dimensions.width/10;
      if (iconSize > 120) {
        iconSize = 120;
      } else if (iconSize < 70) {
        iconSize = 70;
      }
      lines.push( 
          <line 
            x1={parseInt(level.position.left)/100 * dimensions.width + iconSize/2} 
            x2={parseInt(levels[index+1].position.left)/100 * dimensions.width + iconSize/2} 
            y1={parseInt(level.position.top)/100 * dimensions.height + iconSize/2} 
            y2={parseInt(levels[index+1].position.top)/100 * dimensions.height + iconSize/2}
            stroke="white"
            strokeWidth="4"
            strokeDasharray="16 16"
            key={level.levelNumber}
            opacity={levels[index+1].isAvailable ? '100%' : '50%'}
          />
      )
    }

    return lines;
  };

  /**
   * Redirict to a quiz
   * @param {String} slug - The unique string identifying the quiz
   */
  const enterLevel = (slug, available) => {
    if (available) {
      if (enterSound !== null && window.localStorage.getItem("muted") !== "true") {
        enterSound.current.audioEl.current.play();
      }
      router.push("/play/" + slug);
    }

  }

  // The modal when all levels have been completed
  const endWorldModal  = <Modal closeModal={() => setEndWorld(false)}>
    <h1 style={{color: "#EFD55E", fontSize: "3.5em"}}>Congratulations!!!</h1>
    <Image src="/images/Level1.svg" width="300" height="300"></Image>
    <p style={{color: "white", fontSize:"2em"}}>You finished the last level and have saved all your friends! Please check back in the future when more stories are available.</p>
  </Modal>

  return (
    <div className={styles.worldMap} ref={targetRef}>
        { levels.map(function(level) {
          // The icon for each level
          return (
            <div key={level.levelNumber} className={level.isAvailable ? styles.container : styles.containerUnavailable} style={level.position}>
              <LevelIcon enterLevel={() => enterLevel(level.link, level.isAvailable)} level={level}></LevelIcon>
            
            </div>
          )
        }) }
        {endWorld ? endWorldModal : null}
        <ReactAudioPlayer src="/sounds/enter.wav" ref={finishSound}/>
        <ReactAudioPlayer src="/sounds/enter.wav" ref={enterSound}/>
        <div className={styles.svgContainer}> 
        <svg preserveAspectRatio="none" viewBox={"0 0 " + dimensions.width + " " + dimensions.height} className={styles.svgContentResponsive}>
          {lines()}
        </svg>
        </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8081/api/quizzes");
  const levels =  await res.json();
  return {
    props: {
      levels: levels
    },
  }
}
