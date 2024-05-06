import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
// @refresh reset
function Header() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.logo}>
        <a href='https://denzariu.github.io'>Denzariu</a>
      </h1>

      <ul className={styles.ul}>
        <li className={styles.li}><Link href="/">Home</Link></li>
        <li className={styles.li}><Link href="/artworks">Artworks</Link></li>
        <li className={styles.li}><Link href="/">Artists</Link></li>
      </ul>
      
    </nav>
  )
}
export default Header