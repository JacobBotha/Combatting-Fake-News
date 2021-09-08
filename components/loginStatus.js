import React, { Component } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import ReactModal from 'react-modal';
import styles from '../styles/Navbar.module.css'

export default function LoginStatus() {
    const { data: session } = useSession()
    if (session) {
      return (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    }
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }
  