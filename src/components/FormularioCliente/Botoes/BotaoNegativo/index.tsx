import { Button } from '@mui/material';
import styles from '../Botoes.module.scss';

export const estiloBotao = {
  width: '25px',
  minWidth: '0px',
  borderRadius: '50%',
  height: '25px',
  padding: '0px',
};

function BotaoNegativo({
  onClick,
  disabled = false,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: 'true' | 'false' | boolean;
}) {
  if (disabled === 'true' || disabled === true) {
    return (
      <Button
        variant='contained'
        sx={estiloBotao}
        className={styles['botao--negativo']}
        onClick={onClick}
        disabled
      >
        -
      </Button>
    );
  } else if (disabled === 'false' || disabled === false) {
    return (
      <Button
        variant='contained'
        sx={estiloBotao}
        className={styles['botao--positivo']}
        onClick={onClick}
      >
        -
      </Button>
    );
  } else {
    throw Error('Sintaxe do componente BotaoNegativo incorreta.');
  }
}

export default BotaoNegativo;
