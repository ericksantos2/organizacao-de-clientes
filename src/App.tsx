import {useState} from 'react';
import CadastroContato from "./components/CadastroContato";
import { IContato } from './types/IContato';

function App() {
  const [nome, setNome] = useState<string>('');
  const [emails, setEmails] = useState<string[]>(['']);
  const [numeros, setNumeros] = useState<string[]>(['']);
  const [cnpj, setCnpj] = useState<string>('');
  const [cep, setCep] = useState<string>('');

  const [contatos, setContatos] = useState<IContato[]>([]);

  return (
    <>
      <CadastroContato
        nome={{valor: nome, setValor: setNome, tipo: 'normal'}}
        emails={{valores: emails, setValores: setEmails, tipo: 'array'}}
        numeros={{valores: numeros, setValores: setNumeros, tipo: 'array'}}
        cnpj={{valor: cnpj, setValor: setCnpj, tipo: 'normal'}}
        cep={{valor: cep, setValor: setCep, tipo: 'normal'}}
        contatos={contatos}
        setContatos={setContatos}
      />
    </>
  )
}

export default App;
