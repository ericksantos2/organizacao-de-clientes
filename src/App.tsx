import { useEffect, useState } from 'react';
import CadastroContato from './components/CadastroContato';
import Contatos from './components/Contatos';
import { IContato } from './types/IContato';

function App() {
  const [nome, setNome] = useState<string>('');
  const [emails, setEmails] = useState<string[]>(['']);
  const [numeros, setNumeros] = useState<string[]>(['']);
  const [cnpj, setCnpj] = useState<string>('');
  const [cep, setCep] = useState<string>('');

  const [contatos, setContatos] = useState<IContato[]>(contatosLocalStorage());

  function contatosLocalStorage(): IContato[] {
    const item = localStorage.getItem('contatos');
    if (item) {
      return JSON.parse(item);
    } else return [];
  }

  useEffect(() => {
    localStorage.setItem('contatos', JSON.stringify(contatos));
  }, [contatos]);

  return (
    <>
      <CadastroContato
        nome={{ valor: nome, setValor: setNome, tipo: 'normal' }}
        emails={{ valores: emails, setValores: setEmails, tipo: 'array' }}
        numeros={{ valores: numeros, setValores: setNumeros, tipo: 'array' }}
        cnpj={{ valor: cnpj, setValor: setCnpj, tipo: 'normal' }}
        cep={{ valor: cep, setValor: setCep, tipo: 'normal' }}
        contatos={contatos}
        setContatos={setContatos}
      />
      <Contatos contatos={contatos} setContatos={setContatos} />
    </>
  );
}

export default App;
