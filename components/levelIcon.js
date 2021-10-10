import { React, Component } from "react";
import styles from '../styles/LevelIcon.module.css';
require('typeface-baloo-tamma')
import Image from 'next/image';

export default class LevelIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            iconPosition: props.iconPosition,
            namePosition: props.namePosition,
            levelNumber : props.levelNumber,
            levelName: props.levelName,
            isAvailable: props.isAvailable,
            levelIcon: props.levelIcon
        }; 
    }

    positionStyle(position) {
        if(position === "left") {
            return {
                position: "absolute",
                height: "20%",
                width: "20%",
                right: "250%",
                top: "20%",

                "backgroundColor": "transparent"
            };
        }

        if(position === "right") {
            return {
                position: "absolute",
                height: "20%",
                width: "20%",
                left: "100%",
                top: "15%",

                "backgroundColor": "transparent"
            };
        }

        if(position === "top") {
            return {
                position: "absolute",
                height: "20%",
                width: "20%",
                top: "-25%",

                "background-color": "transparent"
            };
        }

        if(position === "bottom") {
            return {
                position: "absolute",
                height: "20%",
                width: "20%",
                top: "100%",
                left:"0px",

                "background-color": "transparent"
            };
        }

        return;
    }

    imagePositions(position) {
        if(position === "left") {
            return styles.textLeft;
        }

        if(position === "right") {
            return styles.textRight;
        }

        if(position === "top") {
            return styles.textTop;
        }

        if(position === "bottom") {
            return styles.textBottom;       
        }

        return     
    }

    render() {
        return (
            <div className={this.state.isAvailable ? styles.circleContainer : styles.unavailable}>
                <div className={styles.outerCircle}><div className={styles.innerCircle}>{this.state.levelNumber}</div></div>
                <div style={this.positionStyle(this.state.namePosition)}>
                    <h3 className={styles.text}>{this.state.levelName}</h3>
                </div>
                <div className={this.imagePositions(this.state.iconPosition)}>
                    <div className={styles.image}>
                        <Image className={styles.transparent} src={"/"+this.state.levelIcon} layout='fill'/>
                    </div>
                </div>
            </div>
        );
    }
}