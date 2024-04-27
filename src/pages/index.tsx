import styles from '../../styles/Home.module.css'
import Head from 'next/head';

import { GetServerSideProps, GetStaticProps } from 'next'
import { getSession } from 'next-auth/react'

import { signIn } from 'next-auth/react'
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../services/firebaseConnection'

interface HomeProps{
  links:number
}

export default function Home({ links }: HomeProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Share with Shary</title>
      </Head>
      <p className={styles.infoHomeSpan}><span>+{links}</span> Shared links</p>
      <h1>Share with <span>Shary</span></h1>
      <p>The place where you can share your profile with ease! And do you know the best? It's easy to make and super quick!</p>
      <button onClick={() => signIn("google")}>Start now</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session?.user) {
    return {
      redirect: {
        destination: '/myprofile',
        permanent: false,
      }
    }
  }

  const linksRef = collection(db, "links")
  const linksSnapshot = await getDocs(linksRef)

  return {
    props: {
      links: linksSnapshot.size || 0
    }
  };
}
