import styles from './CadastroContato.module.scss';
import { IState } from '../../types/IState';
import { Button, Paper } from '@mui/material';
import { Inputs } from '../../types/Inputs';
import InputsFormulario from './InputsFormulario';
import { IContato } from '../../types/IContato';
import OutrasOpcoes from './OutrasOpcoes';
import { useState } from 'react';

interface Props {
  nome: IState;
  nomeEmpresa: IState;
  emails: IState;
  numeros: IState;
  cnpj: IState;
  cep: IState;
  contatos: IContato[];
  setContatos: React.Dispatch<React.SetStateAction<IContato[]>>;
}

export default function CadastroContato({
  nome,
  nomeEmpresa,
  emails,
  numeros,
  cnpj,
  cep,
  contatos,
  setContatos,
}: Props) {
  const inputs: Inputs = [nome, nomeEmpresa, emails, numeros, cnpj, cep];
  const [erro, setErro] = useState(false);
  if (erro === true) {
    if (nome.valor !== '') {
      setErro(false);
    }
  }
  function handleSubmit() {
    if (nome.valor === '') {
      setErro(true);
      return;
    }
    if (
      nome.valor !== undefined &&
      nomeEmpresa.valor !== undefined &&
      emails.valores !== undefined &&
      numeros.valores !== undefined &&
      cnpj.valor !== undefined &&
      cep.valor !== undefined
    ) {
      let id;
      let numero = 0;
      while (id === undefined) {
        if (contatos.findIndex((contato) => contato.id === numero) === -1) {
          id = numero;
        } else {
          numero++;
        }
      }
      let contato: IContato = {
        nome: nome.valor,
        id: id,
      };
      nomeEmpresa.valor !== '' && (contato.nomeEmpresa = nomeEmpresa.valor);
      emails.valores[0] !== '' && (contato.emails = emails.valores);
      numeros.valores[0] !== '' && (contato.numeros = numeros.valores);
      cnpj.valor !== '' && (contato.cnpj = cnpj.valor);
      cep.valor !== '' && (contato.cep = cep.valor);

      setContatos([...contatos, contato]);
      inputs.forEach((item) => {
        item.setValor ? item.setValor('') : '';
        item.setValores ? item.setValores(['']) : '';
      })
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
        <OutrasOpcoes contatos={contatos} setContatos={setContatos}/>
      </Paper>
    </div>
  );
}
