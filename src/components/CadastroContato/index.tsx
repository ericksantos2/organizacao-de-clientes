import styles from './CadastroContato.module.scss';
import { IState } from '../../types/IState';
import { Button, Paper } from '@mui/material';
import { Inputs } from '../../types/Inputs';
import InputsFormulario from './InputsFormulario';
import { IContato } from '../../types/IContato';

interface Props {
  nome: IState;
  emails: IState;
  numeros: IState;
  cnpj: IState;
  cep: IState;
  contatos: IContato[];
  setContatos: React.Dispatch<React.SetStateAction<IContato[]>>;
}

export default function CadastroContato({
  nome,
  emails,
  numeros,
  cnpj,
  cep,
  contatos,
  setContatos,
}: Props) {
  const inputs: Inputs = [nome, emails, numeros, cnpj, cep];
  function handleSubmit() {
    if (
      nome.valor != undefined &&
      emails.valores != undefined &&
      numeros.valores != undefined &&
      cnpj.valor != undefined &&
      cep.valor != undefined
    ) {
      const contato: IContato = {
        nome: nome.valor,
        emails: emails.valores,
        numeros: numeros.valores,
        cnpj: cnpj.valor,
        cep: cep.valor,
      };
      setContatos([...contatos, contato]);
      console.log(contatos);
    } else {
      throw Error('Erro no uso da função handleSubmit.');
    }
  }
  return (
    <div className={styles.formularioDiv}>
      <Paper elevation={3} className={styles.formulario}>
        <InputsFormulario inputs={inputs} />
        <Button
          variant='outlined'
          sx={{ width: '100%', minHeight: '3.5rem' }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Enviar
        </Button>
      </Paper>
    </div>
  );
}
