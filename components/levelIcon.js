import { React, Component } from "react";
import styles from '../styles/LevelIcon.module.css';
require('typeface-baloo-tamma')
import Image from 'next/image';
import Link from 'next/link';
import { height } from "@mui/system";

export default class LevelIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            iconPosition: props.level.imagePosition,
            namePosition: props.level.namePosition,
            levelNumber : props.level.levelNumber,
            levelName: props.level.levelName,
            isAvailable: props.level.isAvailable,
            levelIcon: props.level.image,
            iconSize: props.iconSize
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

                "backgroundColor": "transparent"
            };
        }

        if(position === "bottom") {
            return {
                position: "absolute",
                height: "20%",
                width: "20%",
                top: "100%",
                left:"-40%",

                "backgroundColor": "transparent"
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

        return;
    }

    cursorType() {
        return (this.state.isAvailable ? "pointer" : "default");
    }

    render() {
        return (
            <div style={{width: this.state.iconSize, height: this.state.iconSize}}>
                <div onClick={this.props.enterLevel} style={{cursor: this.cursorType()}}  className={`${styles.outerCircle} ${this.state.isAvailable ? null : styles.unavailable}`}><a className={styles.innerCircle}>{this.state.levelNumber}</a></div>
                <div className={this.state.isAvailable ? null : styles.unavailable} style={this.positionStyle(this.state.namePosition)}>
                    <h3 className={styles.text}>{this.state.levelName}</h3>
                </div>
                <div className={`${this.imagePositions(this.state.iconPosition)} ${this.state.isAvailable ? null : styles.unavailable}`}>
                    <div className={styles.image}>
                        <Image className={styles.transparent} src={"/"+this.state.levelIcon} alt="" layout='fill'/>
                    </div>
                </div>
            </div>
        );
    }
}