import { HTMLProps } from 'react'
import styles from './styles.module.css'

export function Input({...rest}: HTMLProps<HTMLInputElement>){
    return <input className={styles.input} {...rest}></input>
}