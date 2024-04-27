import styles from './styles.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'
import { FaEdit } from 'react-icons/fa'
import Link from 'next/link'

export function Header() {
    const { data: session, status } = useSession()

    async function handleRedirectHome(){
        window.location.href = '/'
    }

    return (
        <header className={styles.header}>
            <h1 onClick={handleRedirectHome}>Shary</h1>
            {status === 'loading' ? (
                <></>
            ) : session ? (
                <button onClick={() => signOut()}>{session?.user?.name}</button>
            ) : (
                <button onClick={() => signIn("google")}>Login</button>
            )}
        </header>
    )
}