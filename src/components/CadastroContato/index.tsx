import styles from './CadastroContato.module.scss';
import { IState } from '../../types/IState';
import { Button, Paper } from '@mui/material';
import { Inputs } from '../../types/Inputs';
import InputsFormulario from './InputsFormulario';
import { IContato } from '../../types/IContato';

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
  function handleSubmit() {
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
      const contato: IContato = {
        nome: nome.valor,
        nomeEmpresa: nomeEmpresa.valor,
        emails: emails.valores,
        numeros: numeros.valores,
        cnpj: cnpj.valor,
        cep: cep.valor,
        id: id,
      };
      setContatos([...contatos, contato]);
    } else {
      throw Error('Erro no uso da função handleSubmit.');
    }
  }

  function handleReset() {
    const algo = confirm('Você realmente deseja remover todos os contatos?');
    if (algo === true) {
      localStorage.setItem('contatosBackup', JSON.stringify(contatos));
      localStorage.removeItem('contatos');
      setContatos([]);
      alert('Os contatos foram removidos com sucesso!');
    }
  }
  return (
    <div className={styles.formularioDiv}>
      <Paper elevation={3} className={styles.formulario}>
        <InputsFormulario inputs={inputs} />
        <Button
          variant='contained'
          sx={{ width: '100%', minHeight: '3.5rem' }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Enviar
        </Button>
        <Button
          variant='outlined'
          sx={{ width: '100%', minHeight: '3.5rem' }}
          onClick={() => {
            handleReset();
          }}
        >
          Redefinir
        </Button>
      </Paper>
    </div>
  );
}
