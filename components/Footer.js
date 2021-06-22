import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events {new Date().getFullYear()}</p>
      <p>
        <Link href='/about'>
          <a>About This Projects</a>
        </Link>
      </p>
    </footer>
  )
}
