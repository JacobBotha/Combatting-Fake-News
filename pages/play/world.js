import React, { useState, useEffect, useRef } from "react";
import LevelIcon from "../../components/levelIcon";
import styles from "../../styles/World.module.css";

export default function World({ levels }) {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);
  
  const iconSize = 90;

  const lines = () => {
    const lines =[]
    for (let index = 0; index < levels.length -1; index++) {
      const level = levels[index];
      lines.push( 
          <line 
            x1={parseInt(level.position.left)/100 * dimensions.width + iconSize/2} 
            x2={parseInt(levels[index+1].position.left)/100 * dimensions.width + iconSize/2} 
            y1={parseInt(level.position.top)/100 * dimensions.height + iconSize/2} 
            y2={parseInt(levels[index+1].position.top)/100 * dimensions.height + iconSize/2}
            stroke="white"
            strokeWidth="8"
            strokeDasharray="16 16"
            key={level.levelNumber}
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
              <LevelIcon levelIcon={level.levelIcon} iconPosition={level.imagePosition} levelName={level.levelName} namePosition={level.namePosition} levelNumber={level.levelNumber} isAvailable={level.isAvailable}></LevelIcon>
            </div>
          )
        }) }
        <svg preserveAspectRatio="none" viewBox={"0 0 " + dimensions.width + " " + dimensions.height} className={styles.svgContentResponsive}>
          {lines()}
        </svg>
    </div>
  );
}

export async function getServerSideProps() {
//   const res = await fetch("http://localhost:3000/api/quizzes/2622dddd5a7838aa21c7b208bea4614bee5957bd9cd97841c170736e7d2222c6");
//   const results = await res.json();
  const levels = [{
      levelNumber: 1,
      levelName: 'Consider the source',
      levelIcon: 'images/Level1.svg',
      isAvailable: true,
      position: {
        top: "16%",
        left: "1%",
      },
      namePosition: "right",
      imagePosition: "bottom"
  },{
      levelNumber: 2,
      levelName: 'Read beyond the headline',
      levelIcon: 'images/Level2.svg',
      isAvailable: true,
      position: {
        top: "40%",
        left: "22%"
      },
      namePosition: "left",
      imagePosition: "top"
  },{
      levelNumber: 3,
      levelName: 'Check the authors',
      levelIcon: 'images/Level3.svg',
      isAvailable: true,
      position: {
        top: "74%",
        left: "34%"
      },
      namePosition: "bottom",
      imagePosition: "left"

  },{
      levelNumber: 4,
      levelName: 'Access the supporting sources',
      levelIcon: 'images/Level4.svg',
      isAvailable: false,
      position: {
        top: "11%",
        left: "39%"
      },
      namePosition: "right",
      imagePosition: "left"

  },{
      levelNumber: 5,
      levelName: 'Check the date of publication',
      levelIcon: 'images/Level5.svg',
      isAvailable: false,
      position: {
        top: "63%",
        left: "50%"
      },
      namePosition: "bottom",
      imagePosition: "left"

  },{
      levelNumber: 6,
      levelName: 'Ask if it is a joke',
      levelIcon: 'images/Level6.svg',
      isAvailable: false,
      position: {
        top: "29% ",
        left: "63%"
      },
      namePosition: "top",
      imagePosition: "right"
  },{
      levelNumber: 7,
      levelName: 'Review your own biases',
      levelIcon: 'images/Level7.svg',
      isAvailable: false,
      position: {
        top: "70%",
        left: "72%"
      },
      namePosition: "bottom",
      imagePosition: "right"

  },{
      levelNumber: 8,
      levelName: 'Ask experts',
      levelIcon: 'images/Level8.svg',
      isAvailable: false,
      position: {
        top: "20%",
        left: "86%"
      },
      namePosition: "top",
      imagePosition: "left"

  }]
  return {
    props: {
      levels: levels
    },
  }
}
