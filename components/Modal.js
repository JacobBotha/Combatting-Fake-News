import React, { useState } from "react"
import { Children } from "react";
import styled from "styled-components";
import Image from "next/dist/client/image";

const ModalBackgroud = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalBox = styled.div`
    width: 50%;
    height: 80%;
    background: #B7AACB;
    opacity: 100%;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items:center;
    padding-left: 50px;
    padding-right: 50px;
    text-align: center;
`
const CloseButton = styled.div`
    margin-left:97%;
    margin-top: 3%;
    width: 30px;
    height: 30px;
    cursor: pointer;
`

export default function Modal({children, closeModal}) {
    return (
        <ModalBackgroud>
            <ModalBox>
                <CloseButton onClick={closeModal}>
                    <Image style={{cursor: "pointer"}} src="/images/close.svg" width="30px" height="30px"></Image>
                </CloseButton>
                {children}
            </ModalBox>
        </ModalBackgroud>
    )
}