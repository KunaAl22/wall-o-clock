import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Head from 'next/head';
import styles from '../styles/addwall.module.css';
import { useSession } from 'next-auth/react';

export default function AddWallpaper() {
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('tags', tags);
      formData.append('description', description);
      formData.append('likes', '0');
      formData.append('owner', session.user.name);
      formData.append('email', session.user.email);

      // Convert the selected image to base64
      if (selectedImage) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImage);
        reader.onloadend = () => {
          const base64Image = reader.result.split(',')[1];
          formData.append('image', base64Image);

          // Send the form data to the API
          sendFormData(formData);
        };
      } else {
        // If no image is selected, send the form data without the image field
        sendFormData(formData);
      }
    } catch (error) {
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  const sendFormData = async (formData) => {
    try {
      const response = await fetch('/api/addwallpaper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to a regular object
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Data saved successfully');
        setTimeout(() => {
          setSuccessMessage('');
          router.push('/');
        }, 1500);
      } else {
        setSuccessMessage('');
        console.error('Failed to save data:', data.message);
      }
    } catch (error) {
      setSuccessMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <Layout home>
      <Head>
        <title>upload</title>
      </Head>
      <div>
        
        {successMessage && (
          <div className={styles.popup}>
            
            {successMessage}
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.upload}> Upload</h2>
            <div className={styles.form__group}>
                <label htmlFor="tags" className={styles.form__label}>Category:</label>
                <select id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className={styles.form__select}>
                <option value="nature">___</option>
                <option value="nature">Nature</option>
                <option value="dark">Dark</option>
                <option value="4K">4K</option>
                <option value="cartoon">Cartoon</option>
                <option value="abstract">Abstract</option>
                <option value="desktop">Desktop</option>
                <option value="anime">Anime</option>
                </select>
            </div>
            <div className={styles.form__group}>
                <label htmlFor="description" className={styles.form__label}>Description:</label>
                <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={300}
                className={styles.form__textarea}
                ></textarea>
            </div>
            <div className={styles.form__group}>
                <label htmlFor="image" className={styles.form__label}>Image:</label>
                <input type="file" id="image" onChange={(e) => setSelectedImage(e.target.files[0])} className={styles.form__file} />
            </div>

            <button type="submit" className={styles.form__button}>Submit</button>
            </form>

      </div>
    </Layout>
  );
}
