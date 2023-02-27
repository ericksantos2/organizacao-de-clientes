import styles from './CadastroContato.module.scss';
import { IState } from '../../types/IState';
import { Button, Paper } from '@mui/material';
import InputsFormulario from './InputsFormulario';
import { IContato } from '../../types/IContato';
import OutrasOpcoes from './OutrasOpcoes';
import { SetStateAction, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  cepState,
  cnpjState,
  contatosState,
  emailsState,
  nomeEmpresaState,
  nomeState,
  numerosState,
} from '../../state/atom';
import achaId from '../../utils/achaId';

function mask(
  value: string,
  tipo: 'numero' | 'cnpj' | 'cep',
  maximo: number
): string {
  if (!value) return '';
  value = value.replace(/[a-zA-Zç]/g, '');
  if (value.length >= maximo) {
    return value.substring(0, maximo);
  }
  if (tipo === 'cnpj') {
    value = value.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      '$1.$2.$3/$4-$5'
    );
  }
  if (tipo === 'cep') {
    value = value.replace(/^(\d{5})(\d{3})/g, '$1-$2');
  }
  if (tipo === 'numero') {
    value = value.replace(/^(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
  }
  return value;
}

export default function CadastroContato() {
  const [contatos, setContatos]: [
    contatos: IContato[],
    setContatos: React.Dispatch<SetStateAction<IContato[]>>
  ] = useRecoilState(contatosState);

  useEffect(() => {
    localStorage.setItem('contatos', JSON.stringify(contatos));
  }, [contatos]);

  const [nome, setNome] = useRecoilState(nomeState);
  const [nomeEmpresa, setNomeEmpresa] = useRecoilState(nomeEmpresaState);
  const [emails, setEmails] = useRecoilState(emailsState);
  const [numeros, setNumeros] = useRecoilState(numerosState);
  const [cnpj, setCnpj] = useRecoilState(cnpjState);
  const [cep, setCep] = useRecoilState(cepState);

  const inputs: IState[] = [
    {
      nome: 'nome',
      texto: 'Nome',
      required: true,
      temErro: true,
      valor: nome,
      setValor: setNome,
      tipo: 'normal',
    },
    {
      nome: 'nomeEmpresa',
      texto: 'Nome da Empresa',
      valor: nomeEmpresa,
      setValor: setNomeEmpresa,
      tipo: 'normal',
    },
    {
      nome: 'emails',
      texto: 'Email',
      valores: emails,
      setValores: setEmails,
      tipo: 'array',
    },
    {
      nome: 'numeros',
      texto: 'Número',
      mascara: (value: string) => {
        return mask(value, 'numero', 15);
      },
      valores: numeros,
      setValores: setNumeros,
      tipo: 'array',
    },
    {
      nome: 'cnpj',
      texto: 'CNPJ',
      mascara: (value: string) => {
        return mask(value, 'cnpj', 18);
      },
      valor: cnpj,
      setValor: setCnpj,
      tipo: 'normal',
    },
    {
      nome: 'cep',
      texto: 'CEP',
      mascara: (value: string) => {
        return mask(value, 'cep', 9);
      },
      valor: cep,
      setValor: setCep,
      tipo: 'normal',
    },
  ];
  const [erro, setErro] = useState(false);
  if (erro === true) {
    if (nome !== '') {
      setErro(false);
    }
  }
  function handleSubmit() {
    if (nome === '') {
      setErro(true);
      return;
    }
    if (
      inputs.map((item) =>
        item.tipo === 'normal'
          ? item.valor !== undefined
          : item.valores !== undefined
      )
    ) {
      let id = achaId(contatos);
      let contato: IContato = {
        nome: nome,
        id: id,
      };
      nomeEmpresa !== '' && (contato.nomeEmpresa = nomeEmpresa);
      emails[0] !== '' && (contato.emails = emails);
      numeros[0] !== '' && (contato.numeros = numeros);
      cnpj !== '' && (contato.cnpj = cnpj);
      cep !== '' && (contato.cep = cep);

      setContatos([...contatos, contato]);
      inputs.forEach((item: IState) => {
        item.setValor ? item.setValor('') : '';
        item.setValores ? item.setValores(['']) : '';
      });
    } else {
      throw Error('Erro no uso da função handleSubmit.');
    }
  }
  return (
    <div className={styles.formularioDiv}>
      <Paper elevation={3} className={styles.formulario}>
        <InputsFormulario inputs={inputs} erro={erro} />
        <Button
          variant='contained'
          sx={{ width: '100%', minHeight: '3.5rem' }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Enviar
        </Button>
        <OutrasOpcoes contatos={contatos} setContatos={setContatos} />
      </Paper>
    </div>
  );
}
