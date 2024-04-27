import styles from './styles.module.css'
import { FaArrowLeft } from 'react-icons/fa'
import { useEffect, useState } from 'react'

import Head from 'next/head'

export default function NotFound() {
    const [frases, setFrases] = useState("")

    useEffect(() => {
        const frases404 = [
            "Seems like this page got lost in the digital wilderness...",
            "Oops! Looks like a mischievous pixel played a prank on this page.",
            "This page is taking a siesta! Come back when it's refreshed.",
            "Oh no! This page went on a spontaneous digital road trip.",
            "404 - Page not found. Maybe it's off on a pixelated adventure.",
            "This page has been abducted by cyber aliens. They're fans of HTML.",
            "This page is catching some Z's. Visit later to wake it up.",
            "This page is playing digital peek-a-boo. Can you find it?",
            "Page not found. It might be wandering through cyberspace.",
            "If you're searching for the page, it's probably sunbathing on a server.",
            "Oops! Looks like someone made a typo. Page not found.",
            "The page is taking a byte-sized break. Back in a moment!",
            "This page has been swept away by HTML whirlwinds. Quite the phenomenon.",
            "Page not found. Perhaps it's hiding within the code labyrinth.",
            "This page is playing digital hide and seek. Can you spot it?",
            "404 - The page took a wrong turn in cyberspace. Help it find its way back.",
            "Looks like a digital poltergeist spooked this page. Try again later.",
            "This page went to a code rave. Probably busting moves in CSS.",
            "Oops! You stumbled upon a digital Bermuda Triangle. This page got lost in it.",
            "Page not found. It's evading HTML like a digital ninja.",
            "This page is taking a cyber snooze. Please, no disturbances.",
            "This page is on a virtual journey. Check back later for its return.",
            "404 - The page is dodging bits and bytes. Try again in a bit.",
            "This page ventured into the future. Check back soon to see if it's back.",
            "Oops! Looks like this page is indulging in a binary bath. Do not disturb.",
            "This page is prepping for a digital launch into cyberspace. Back soon.",
            "Page not found. Seems it was vaporized by a cosmic coding glitch.",
            "This page is time traveling through cyberspace. It'll return to the present shortly.",
            "Oops! Looks like this page is taking a tea break in cyberspace. Check back later.",
            "This page is grappling with an existential crisis. It's lost in the digital abyss.",
        ]

        const randomFrase = Math.floor(Math.random() * frases404.length)
        setFrases(frases404[randomFrase])

    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Page not found</title>
            </Head>
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>{frases}</p>
            <a href='/'><FaArrowLeft className={styles.iconBack} /> Back to home</a>
        </div>
    )
}