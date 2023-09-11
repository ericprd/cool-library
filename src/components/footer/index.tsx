import style from './Footer.module.scss';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={style.footer_container}>
      <p>Copyright@{year} Eric Pradana</p>
    </footer>
  );
}
