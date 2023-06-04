import Head from 'next/head';
import { getSession, useSession, signOut } from "next-auth/react"
import styles from '../styles/Form.module.css';

export default function Profile() {

    const { data: session } = useSession()

    function handleSignOut(){
      signOut()
    }

    return (
      <div>
        <div className={styles.header}>
        <h2>Wall O'Clock</h2>
      </div>  
        <Head>
          <title>profile</title>
        </Head>
        {session ? User({ session, handleSignOut }) : Guest()}
      
      </div>
    );
  }
  
function User({ session, handleSignOut }){
  return(
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Profile</h3>

          <div className={styles.section}>
            <h3>name: {session.user.name}</h3>
            <h3>email address: {session.user.email}</h3>
          </div>

          <div className={styles.form}>
          <div className={styles.inputButton}>
          <button type="button" onClick={handleSignOut} className={`${styles.buttonCustom} ${styles.largeButton}`}>
          Sign Out
            </button>

          </div>
          </div>
      </main>
  )
}
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>all geneeral wallpapers</h3>

          <div className='flex justify-center'>
          <p>
            for uploading:
            </p>
          </div>
      </main>
  )
} 