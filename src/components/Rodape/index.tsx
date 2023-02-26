import styles from './Rodape.module.scss';

export default function Rodape() {
  return (
    <div className={styles.rodape}>
      <a href="https://github.com/ericksantos2/organizacao-de-clientes" target='_blank'
        className={styles.rodape__link}
      >
        Feito por Erick Santos
      </a>
    </div>
  )
}