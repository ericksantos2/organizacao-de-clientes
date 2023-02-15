import { Button } from '@mui/material';
import { estiloBotao } from '../BotaoNegativo';
import styles from '../Botoes.module.scss';

export default function BotaoPositivo({
  onClick,
  disabled = false,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: 'false' | 'true' | boolean;
}) {
  if (disabled === 'true' || disabled === true) {
    return (
      <Button
        variant='contained'
        sx={estiloBotao}
        className={styles['botao--positivo']}
        onClick={onClick}
        disabled
      >
        +
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
        +
      </Button>
    );
  } else {
    throw Error('A sintaxe do componente BotaoPositivo está incorreta.');
  }
}
