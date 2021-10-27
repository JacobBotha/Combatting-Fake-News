import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LevelIcon from "../../components/levelIcon";
import styles from "../../styles/World.module.css";
import cookieCutter from "cookie-cutter";
import ReactAudioPlayer from "react-audio-player";

export default function World(props) {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });
  const [levels, setLevels] = useState([]);
  const enterSound = useRef(null)
  const router = useRouter();

  useEffect(() => {
    if (levels.length === 0) {
      let alteredlevels = [...props.levels];
      console.log(alteredlevels)
      alteredlevels.sort((a, b) => a.levelNumber - b.levelNumber).forEach((level, index, levels) => {
        if (cookieCutter.get(level.link) === "complete") {
          if (index < levels.length) levels[index + 1]["isAvailable"] = true;
          level["isAvailable"] = true;
        }
        return level;
      });
      setLevels(alteredlevels);
    }
  });

  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: window.innerWidth -10,
        height: window.innerHeight -10
      });
    }
  }, [targetRef]);  

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

  const enterLevel = (link) => {
    if (enterSound !== null && window.localStorage.getItem("muted") !== "true") {
      enterSound.current.audioEl.current.play();
    }
    router.push("/play/" + link);
  }

  return (
    <div className={styles.worldMap} ref={targetRef}>
        { levels.map(function(level) {
          return (
            <div key={level.levelNumber} className={level.isAvailable ? styles.container : styles.containerUnavailable} style={level.position}>
              <LevelIcon enterLevel={() => enterLevel(level.link)} level={level}></LevelIcon>
            
            </div>
          )
        }) }
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
