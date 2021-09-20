import React, { Component } from "react";
import ReactModal from 'react-modal';
import styles from '../styles/Navbar.module.css';
import SignedIn from "./loginStatus";

export default class Navbar extends Component { 
    constructor () {
        super();
        this.state = {
            showModal: false
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }
    
    render() {
        return (
            <div className={styles.container}>
                <h1>{"Who's Fooling Who"}</h1>
                <div className={styles.login}>
                    <SignedIn></SignedIn>
                    <ReactModal 
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                        // className="Modal"
                        // overlayClassName="Overlay"
                    >
                        <button onClick={this.handleCloseModal}>Close Modal</button>
                    </ReactModal>
                </div>
            </div>
        );
    }
}