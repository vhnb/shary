import styles from './styles.module.css'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'

import { Input } from '@/src/components/input'

import { db } from '../../services/firebaseConnection'

import { addDoc, collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore'

import { FaLink, FaPlus, FaTrash, FaShare } from 'react-icons/fa'

interface HomeProps {
    user: {
        email: string
    }
}

interface LinksProps {
    id: string,
    created: Date,
    link: string,
    user: string,
    userName: string
}

export default function Profile({ user }: HomeProps) {
    const { data: session } = useSession()
    const [input, setInput] = useState("")
    const [links, setLinks] = useState<LinksProps[]>([])

    useEffect(() => {
        async function LoadLinks() {
            const linksRef = collection(db, "links")
            const q = query(
                linksRef,
                where("user", "==", user?.email)
            )

            onSnapshot(q, (snapshot) => {
                let lista = [] as LinksProps[]

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        link: doc.data().link,
                        created: doc.data().created,
                        user: doc.data().user,
                        userName: doc.data().userName
                    })
                })

                setLinks(lista)
            })
        }

        LoadLinks()
    }, [user?.email])

    async function handleRegisterLink(event: FormEvent) {
        event.preventDefault()

        if (input === '') return

        try {
            await addDoc(collection(db, "links"), {
                link: input,
                created: new Date(),
                user: user?.email,
                userName: session?.user?.name
            })

            setInput("")
        } catch (err) {
            console.log(err)
        }
    }

    async function handleCopyLink(link: string) {
        await navigator.clipboard.writeText(
            `https://${link}`
        )

        alert("copiado")
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)
    }

    async function handlePerfil(){
        window.location.href = `/profile/${session?.user?.name}`
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Shary | My profile</title>
            </Head>
            <div className={styles.contentProfile}>
                <h1>{session?.user?.name} <FaShare onClick={handlePerfil} className={styles.iconShare} /></h1>
                {links.length === 0 && (
                    <p>No links in this profile...</p>
                )}
                {links.map((item) => (
                    <article key={item.id} className={styles.containerLink}>
                        <div style={{
                            display: 'flex',
                        }}>
                            <FaTrash onClick={() => handleDeleteLink(item.id)} className={styles.iconDelete} />
                            <FaLink onClick={() => handleCopyLink(item.link)} className={styles.iconCopy} />
                        </div>
                        <a href={`https://${item.link}`} target='blank'>https://{item.link}</a>
                    </article>
                ))}
            </div>
            <form onSubmit={handleRegisterLink} className={styles.contentAddLink}>
                <Input value={input} onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)} type='text' placeholder='Write your links with no https://' />
                <button type='submit'><FaPlus /></button>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            user: {
                email: session?.user?.email
            }
        },
    }
}