import { atom } from 'recoil';
import { IContato } from '../types/IContato';

function contatosLocalStorage(): IContato[] {
  const item = localStorage.getItem('contatos');
  if (item) {
    return JSON.parse(item);
  } else return [];
}

// statesNormais

export const contatosState = atom<IContato[]>({
  key: 'contatosState',
  default: contatosLocalStorage()
})

export const nomeState = atom<string>({
  key: 'nomeState',
  default: ''
})

export const nomeEmpresaState = atom<string>({
  key: 'nomeEmpresaState',
  default: ''
})

export const emailsState = atom<string[]>({
  key: 'emailsState',
  default: ['']
})

export const numerosState = atom<string[]>({
  key: 'numerosState',
  default: ['']
})

export const cnpjState = atom<string>({
  key: 'cnpjState',
  default: ''
})

export const cepState = atom<string>({
  key: 'cepState',
  default: ''
})