import inputFormulario from "../../types/IinputFormulario";

interface Props {
  nome: string,
  setNome: React.Dispatch<React.SetStateAction<string>>
  emails: string[],
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
  numeros: string[],
  setNumeros: React.Dispatch<React.SetStateAction<string[]>>,
  cnpj: string,
  setCnpj: React.Dispatch<React.SetStateAction<string>>,
  cep: string,
  setCep: React.Dispatch<React.SetStateAction<string>>,
}

export default function inputsFormulario(props: Props): inputFormulario[] {
  const {nome, setNome, emails, setEmails, numeros, setNumeros, cnpj, setCnpj, cep, setCep} = props;
  return [
    {
      tipo: 'nome',
      texto: 'Nome',
      array: false,
      valor: nome,
      set: setNome,
    },
    {
      tipo: 'email',
      texto: 'Email',
      array: true,
      valor: emails,
      set: setEmails,
    },
    {
      tipo: 'numero',
      texto: 'Número',
      array: true,
      valor: numeros,
      set: setNumeros,
    },
    {
      tipo: 'cnpj',
      texto: 'CNPJ',
      array: false,
      valor: cnpj,
      set: setCnpj,
    },
    {
      tipo: 'cep',
      texto: 'CEP',
      array: false,
      valor: cep,
      set: setCep,
    },
  ]
}