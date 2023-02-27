import { Button } from '@mui/material';
import { IState } from '../../../../types/IState';

export default function Botao({
  desabilitado,
  onClick,
  children,
}: {
  desabilitado: {valor: string[], tipo: 'maior' | 'igual', numero: number}
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
}) {
  const tamanho: string = '30px';
  function comparacaoDisabled(item: string[], tipo: 'maior' | 'igual', numero: number): boolean {
    if (tipo === 'maior') {return item.length >= numero}
    else if (tipo === 'igual') {return item.length === numero}
    else {
      throw Error();
    }
  }
  return (
    <Button variant='contained'
      sx={{
        borderRadius: '50%',
          minWidth: tamanho,
          minHeight: tamanho,
          width: tamanho,
          height: tamanho,
      }}
      onClick={onClick}
      disabled={comparacaoDisabled(desabilitado.valor, desabilitado.tipo, desabilitado.numero)}
    >{children}</Button>
  )
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
