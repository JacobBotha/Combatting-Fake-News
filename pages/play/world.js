import React, { useState, useEffect, useRef } from "react";
import LevelIcon from "../../components/levelIcon";
import styles from "../../styles/World.module.css";
import cookieCutter from "cookie-cutter";

export default function World(props) {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });
  const [levels, setLevels] = useState([]);

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
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
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

  return (
    <div className={styles.worldMap} ref={targetRef}>
        { levels.map(function(level) {
          return (
            <div key={level.levelNumber} className={level.isAvailable ? styles.container : styles.containerUnavailable} style={level.position}>
              <LevelIcon level={level}></LevelIcon>
            </div>
          )
        }) }
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
