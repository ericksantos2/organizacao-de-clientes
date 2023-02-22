import { Button, Paper, TextField } from '@mui/material';
import { IContato } from '../../types/IContato';
import styles from './Contatos.module.scss';
import { BsSearch } from 'react-icons/bs';

interface Props {
  contatos: IContato[];
}

function textoCardArray(nome: string, array: string[]) {
  if (array.length === 1) {
    return (
      <p>
        {nome}: {array[0]}
      </p>
    );
  } else {
    return array.map((item, index) => (
      <p key={index}>
        {nome} {index + 1}: {item}
      </p>
    ));
  }
}

export default function Contatos({ contatos }: Props) {
  const tamanho = '35px';
  return (
    <div className={styles.contatosDiv}>
      <Paper elevation={3} className={styles.contatosPaper}>
        <div className={styles.contatos__pesquisa}>
          <input className={styles.contatos__pesquisa__input}/>
          <div>
            <Button
              variant='contained'
              sx={{
                borderRadius: '100%',
                padding: 0,
                minWidth: tamanho,
                minHeight: tamanho,
              }}
            >
              <BsSearch />
            </Button>
          </div>
        </div>
        <div className={styles.contatos}>
          {contatos.map((contato, index) => (
            <Paper elevation={3} key={index} className={styles.contato}>
              <p>Nome: {contato.nome}</p>
              {textoCardArray('Email', contato.emails)}
              {textoCardArray('Número', contato.numeros)}
              <p>CNPJ: {contato.cnpj}</p>
              <p>CEP: {contato.cep}</p>
            </Paper>
          ))}
        </div>
      </Paper>
    </div>
  );
}
