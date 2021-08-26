import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../../styles/Home.module.css'

export default function SoloMenu() {
  return (
    <div className={styles.container}>
        <h1>Choose Mode</h1> 
        <Link href="/play/solo/easy">
            <button>Easy Mode</button>
        </Link>
        <Link href="/play/solo/hard">
            <button>Hard Mode</button>
        </Link>
    </div>
  )
}
