import { Button } from '@mui/material';
import { IState } from '../../../../types/IState';

export default function Botao({
  disabled = false,
  onClick,
  children,
}: {
  disabled: 'true' | 'false' | boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
}) {
  const tamanho: string = '30px';
  if (disabled === true || disabled === 'true') {
    return (
      <Button
        variant='contained'
        sx={{
          borderRadius: '50%',
          minWidth: tamanho,
          minHeight: tamanho,
          width: tamanho,
          height: tamanho,
        }}
        onClick={onClick}
        disabled
      >
        {children}
      </Button>
    );
  } else if (disabled === false || disabled === 'false') {
    return (
      <Button
        variant='contained'
        sx={{
          borderRadius: '50%',
          minWidth: tamanho,
          minHeight: tamanho,
          width: tamanho,
          height: tamanho,
        }}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  } else {
    throw Error('Uso incorreto do componente Botao');
  }
}

export function handleBotaoAdicionar(
  item: IState,
  tipo: 'adicionar' | 'remover'
) {
  if (item.valores && item.setValores) {
    if (tipo === 'adicionar') {
      const itemAntes = [...item.valores];
      if (itemAntes.length >= 5) {
        alert(`O máximo de inputs é 5!`);
        return;
      }
      itemAntes.push('');
      item.setValores([...itemAntes]);
    } else if (tipo === 'remover') {
      const itemAntes = [...item.valores];
      if (itemAntes.length <= 1) {
        alert(`O mínimo de inputs é 5!`);
        return;
      }
      itemAntes.pop();
      item.setValores([...itemAntes]);
    } else {
      throw Error('Falha no uso da função "handleBotaoAdicionar"');
    }
  } else {
    throw Error('Falha no uso da função "handleBotaoAdicionar"');
  }
}
