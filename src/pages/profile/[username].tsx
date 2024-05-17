import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import styles from './styles.module.css'

import Link from 'next/link'

import Head from 'next/head'

import { db } from '../../services/firebaseConnection'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

import { FaLink } from 'react-icons/fa'

interface LinksProps {
    id: string,
    created: Date,
    link: string,
    user: string,
    userName: string
}

export default function Task() {
    const [profiles, setProfiles] = useState<LinksProps[]>([])
    const router = useRouter();
    const { username } = router.query;

    useEffect(() => {
        async function loadLinks() {
            if (!username) return

            const q = query(collection(db, "links"), where("userName", "==", username as string));
            onSnapshot(q, (snapshot) => {
                let lista = [] as LinksProps[];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        link: doc.data().link,
                        created: doc.data().created.toDate(),
                        user: doc.data().user,
                        userName: doc.data().userName
                    });
                });

                setProfiles(lista);
            });
        }

        loadLinks();
    }, [username]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Shary | {username}</title>
            </Head>
            <div className={styles.contentProfile}>
                <h1 className={styles.h1}>{username} {username === 'vitinhoo' && (<span>Owner</span>)}</h1>
                {profiles.length === 0 && (
                    <p>No links in this profile...</p>
                )}
                {profiles.map((item) => (
                    <Link href={`https://${item.link}`} target='blank' key={item.id} className={styles.containerLink}>
                        <FaLink />
                        <p>{item.link}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
