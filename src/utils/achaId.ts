import { IContato } from '../types/IContato';

export default function achaId(contatos: IContato[]) {
  let id;
  let numero = 0;
  while (id === undefined) {
    if (contatos.findIndex((contato: any) => contato.id === numero) === -1) {
      id = numero;
    } else {
      numero++;
    }
  }
  return id;
} 
