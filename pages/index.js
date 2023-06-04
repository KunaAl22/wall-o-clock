import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getSession, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Layout from '../components/layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { data: session } = useSession();
  function handleSignOut() {
    signOut();
  }

  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [displayedTag, setDisplayedTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 

      try {
        const response = await fetch(`/api/wallpapers${selectedTag ? `?tag=${selectedTag}` : ''}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [selectedTag]);

  const convertBase64ToImage = (base64Data) => {
    return `data:image/jpeg;base64,${base64Data}`;
  };

  useEffect(() => {
    setDisplayedTag(selectedTag ? selectedTag : 'All');
  }, [selectedTag]);

  function timeAgo(createdAt) {
    const currentTime = new Date().getTime();
    const uploadTime = new Date(createdAt).getTime();
    const difference = currentTime - uploadTime;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (hours < 24) {
      return `${hours} hours`;
    } else if (days < 30) {
      return `${days} days`;
    } else if (months < 12) {
      return `${months} months`;
    } else {
      return `${years} years`;
    }
  }

  function TagButtons({ selectedTag, setSelectedTag }) {
    const tags = [
      { name: '', label: 'All' },
      { name: 'nature', label: 'nature' },
      { name: 'abstract', label: 'abstract' },
      { name: 'dark', label: 'dark' },
      { name: '4K', label: '4K' },
      { name: 'cartoon', label: 'cartoon' },
      { name: 'desktop', label: 'desktop' },
      { name: 'anime', label: 'anime' },
    ];

    return (
      <div className={styles.tagButtons}>
        {tags.map((tag) => (
          <button
            key={tag.name}
            className={`${styles.button} ${selectedTag === tag.name ? styles.selectedButton : ''}`}
            onClick={() => setSelectedTag(tag.name)}
          >
            {tag.label}
          </button>
        ))}
      </div>
    );
  }

  function Guest({ setSelectedTag }) {
    return (
      <main className="container mx-auto text-center py-20">
        <div className="flex justify-center">
        <p className="text-center text-gray-400">
          <Link href="/login">
            <button className={styles.buttontop}>upload image</button>
          </Link>
        </p>
        <p className="text-center text-gray-400">
          <Link href="/login">
            <button className={styles.buttontop}>login</button>
          </Link>
        </p>
        <h2 className={styles.tags}>
          tags
        </h2>
        </div>
        <TagButtons selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      </main>
    );
  }

  function User({ session, handleSignOut, setSelectedTag }) {
    return (
      <main className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold">Hi there!</h3>

        <div className="details">
          <h4>{session.user.name}</h4>
        </div>
        <p>
          <Link href="/addwallpaper">
            <button className={styles.buttontop}>ADD WALLPAPER</button>
          </Link>
        </p>

        <p className="text-center text-gray-400">
          <Link href="/profile">
            <button className={styles.buttontop}>VISIT PROFILE</button>
          </Link>
        </p>
        <div className="flex justify-center">
          <button onClick={handleSignOut} className={styles.buttontop}>Sign Out</button>
        </div>
        <p className={styles.tags}>Tags:</p>
        <TagButtons selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      </main>
    );
  }


  return (
    <div>
      <Head>
        <title>Wall</title>
      </Head>
      <div className={styles.header}>
  <h2>
    <span>Wall</span> O'<span>Clock</span>
  </h2>
</div>



      
      <div className={styles.row}>
        
        <div className={styles.leftcolumn}>
          {isLoading ? (
            <h1 className={styles.loading}>
              <div className={styles.center}>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
                <div className={styles.wave}></div>
              </div>
            </h1>
          ) : Array.isArray(data) ? (
            data.map((item) => (
              <div className={styles.card} key={item._id}>
                <div className={styles.card__header}>
                  <img className={styles.card__image} src={convertBase64ToImage(item.image)} alt="Wallpaper" />
                </div>
                <div className={styles.card__body}>
                  
                  <p>  {item.description}</p>
                  <span class={styles.tagred} >Tags: {item.tags}</span>
                </div>
                <div className={styles.card__footer}>
                  <div className={styles.user}>
                    <h5 className={styles.user__info}>
                        <span >By: {item.owner}</span>
                        <h4 >Uploaded {timeAgo(item.createdAt)} ago</h4>
                      </h5>
                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className={styles.rightcolumn}>
          <div className={styles.cardright}>
            {session ? (
              <User session={session} handleSignOut={handleSignOut} setSelectedTag={setSelectedTag} />
            ) : (
              <Guest setSelectedTag={setSelectedTag} />
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
      <h2>Developed by <a href="https://kunaal22.github.io/KunaAl22/">kunal</a></h2>

      </div>
    </div>
  );
}


Home.Layout = Layout;
