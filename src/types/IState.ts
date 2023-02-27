export interface IState {
  tipo: 'normal' | 'array',
  valor?: string,
  setValor?: React.Dispatch<React.SetStateAction<string>>,
  valores?: string[],
  setValores?: React.Dispatch<React.SetStateAction<string[]>>,
  required?: boolean,
  nome?: string,
  texto?: string,
  mascara?: (value: string) => string,
  temErro?: boolean,
}