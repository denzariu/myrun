import Image from "next/image";
import styles from "./page.module.css";
import title from "../assets/images/title.png"

export default function Home() {
  return (
    <main className={styles.main}>
      <Image src={title}
        alt="bg"
        width={821}
        height={215}
        className={styles.image}
      />
      <div className={styles.content}>

      </div>
    </main>
  );
}
