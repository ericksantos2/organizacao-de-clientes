import { Button, Paper } from '@mui/material';
import { IContato } from '../../types/IContato';
import styles from './Contatos.module.scss';
import { SetStateAction, useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';

interface Props {
  contatos: IContato[];
  setContatos: React.Dispatch<SetStateAction<IContato[]>>;
}

function textoCardArray(nome: string, array: string[]) {
  if (array.length === 1) {
    return (
      <p>
        {nome}: {array[0]}
      </p>
    );
  } else if (array.length > 1) {
    return array.map((item, index) => (
      <p key={index}>
        {nome} {index + 1}: {item}
      </p>
    ));
  } else {
    return
  }
}

export default function Contatos({ contatos, setContatos }: Props) {
  const tamanho = '35px';
  const [itens, setItens] = useState<IContato[]>(contatos);
  useEffect(() => {
    setItens(contatos);
  }, [contatos]);
  function handlePesquisa(pesquisa: string) {
    pesquisa = pesquisa.replace(/[./-]/g, '');
    if (pesquisa === '') {
      setItens(contatos);
      return;
    }
    const listaContatos: { string: string; id: number }[] = [];
    contatos.forEach((contato, index) => {
      let string = `${contato.nome}${contato.nomeEmpresa}${contato.cnpj}${contato.cep}`;
      [contato.emails, contato.numeros].forEach(
        (item) => (string += `${item}`)
      );
      string = string.replace(/[./-]/g, '');
      const objeto = {
        string: string.toLowerCase(),
        id: index,
      };
      listaContatos.push(objeto);
    });
    const listaPesquisada = listaContatos.filter((item) =>
      item.string.includes(pesquisa.toLowerCase())
    );
    const listaASerExibida: IContato[] = [];
    listaPesquisada.forEach((item) => listaASerExibida.push(contatos[item.id]));
    setItens(listaASerExibida);
  }
  function handleBotaoExcluir(id: number) {
    let contatosComAlteracao = [...contatos];
    const lugar = contatosComAlteracao.findIndex((contato) => contato.id === id);
    if (lugar === undefined || lugar === null)
      throw Error('ID do contato incorreto!');
    contatosComAlteracao.splice(lugar, 1);
    setContatos(contatosComAlteracao);
  }
  return (
    <div className={styles.contatosDiv}>
      <Paper elevation={3} className={styles.contatosPaper}>
        <div className={styles.contatos__pesquisa}>
          <input
            onChange={(evento) => {
              handlePesquisa(evento.target.value);
            }}
            className={styles.contatos__pesquisa__input}
          />
        </div>
        <div className={styles.contatos}>
          {itens.map((contato, index) => {
            function Texto({texto, children}: {children: string, texto: string}) {
              if (children) {
                return <p>{texto}: {children}</p>
              } else {
                return null;
              }
            }
            return (
              <Paper elevation={3} key={index} className={styles.contato}>
                <p>Nome: {contato.nome}</p>
                {<Texto texto='Nome da Empresa'>{contato.nomeEmpresa ? contato.nomeEmpresa : ''}</Texto>}
                {textoCardArray('Email', contato.emails ? contato.emails : [])}
                {textoCardArray('Número', contato.numeros ? contato.numeros : [])}
                {<Texto texto='CNPJ'>{contato.cnpj ? contato.cnpj : ''}</Texto>}
                {<Texto texto='CEP'>{contato.cep ? contato.cep : ''}</Texto>}
                <Button
                  variant='outlined'
                  className={styles.contato__botao}
                  onClick={() => {
                    handleBotaoExcluir(contato.id);
                  }}
                >
                  <RiCloseFill size={12} />
                </Button>
              </Paper>
            );
          })}
        </div>
      </Paper>
    </div>
  );
}
