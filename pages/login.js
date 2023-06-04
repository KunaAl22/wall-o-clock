import Head from 'next/head'
import styles from '../styles/Form.module.css';
import { useState } from 'react';
import { signIn, signOut } from "next-auth/react"

export default function Login(){

    const [show, setShow] = useState(false)

    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google', { callbackUrl : "http://localhost:3000"})
    }

    return (
<div>
<div className={styles.header}>
        <h2>Wall O'Clock</h2>
      </div>
      <Head>
        <title>Login</title>
      </Head>

      <section className={styles.section}>
        <div>
          <h3  className={styles.title}>You have to login first!!!</h3>
        </div>

        <form className={`${styles.form} ${styles.flex} ${styles.flexCol} ${styles.gap}`}>
          <div className={styles.inputButton}>
            <button type="button" onClick={handleGoogleSignin} className={`${styles.buttonCustom} ${styles.largeButton}`}>
              Sign In with Google
            </button>
          </div>
        </form>
      </section>
    </div>



    )
}