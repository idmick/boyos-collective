import styles from './Header.module.css'

export default function Header({ title }) {
  return (
    <>
      <img src="/images/Boyos_logo_boxed.png" alt="Boyos Logo" className={styles['main-logo']} />
      <p>A creative collective</p>
      <p className="description">More soon</p>
    </>
  )
}
