import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SetStateAction } from 'react';
import { IContato } from '../../../types/IContato';

function transformaLS(texto: string, tipo: 'local' | 'parse' = 'local') {
  let item;
  if (tipo === 'local') {
    item = localStorage.getItem(texto);
  } else if (tipo === 'parse') {
    item = texto;
  }
  if (item) {
    return JSON.parse(item);
  } else {
    return [];
  }
}

export default function OutrasOpcoes({
  contatos,
  setContatos,
}: {
  contatos: IContato[];
  setContatos: React.Dispatch<SetStateAction<IContato[]>>;
}) {
  function BackupLocal() {
    const contatosBackup = transformaLS('contatosBackup');
    if (contatosBackup.length < 1) {
      return <MenuItem disabled>Restaurar Backup Automático</MenuItem>;
    } else {
      return (
        <MenuItem
          onClick={() => {
            setContatos(contatosBackup);
          }}
        >
          Restaurar Backup Automático
        </MenuItem>
      );
    }
  }
  function handleReset() {
    const algo = confirm('Você realmente deseja remover todos os contatos?');
    if (algo === true) {
      localStorage.setItem('contatosBackup', JSON.stringify(contatos));
      localStorage.removeItem('contatos');
      setContatos([]);
    }
  }
  async function handleExport() {
    const contatosString = JSON.stringify(contatos);
    try {
      await navigator.clipboard.writeText(contatosString);
      alert('Os contatos foram copiados para o seu clipboard.');
    } catch (erro) {
      await console.log(contatosString);
      alert(
        'Erro ao copiar os contatos para o seu clipboard.\nCopie manualmente indo em inspencionar elemento e depois indo na aba Console.'
      );
    }
  }
  function handleImport() {
    const importContatos = prompt('Cole os contatos aqui.');
    if (importContatos) {
      const importConvertido: IContato[] = transformaLS(
        importContatos,
        'parse'
      );
      if (
        importConvertido[0].nome !== undefined &&
        importConvertido[0].nomeEmpresa !== undefined &&
        importConvertido[0].emails !== undefined &&
        importConvertido[0].numeros !== undefined &&
        importConvertido[0].cnpj !== undefined &&
        importConvertido[0].cep !== undefined
      ) {
        setContatos(importConvertido);
      } else {
        throw Error('Ocorreu um erro.');
      }
    }
  }
  return (
    <FormControl fullWidth>
      <InputLabel>Outras opções</InputLabel>
      <Select label='Outras opções'>
        <MenuItem onClick={handleExport}>Exportar Contatos</MenuItem>
        <MenuItem onClick={handleImport}>Importar Contatos</MenuItem>
        <BackupLocal />
        <MenuItem onClick={handleReset}>Resetar Contatos</MenuItem>
        <MenuItem
          onClick={() => {
            const confirma = confirm(
              'Você tem certeza que deseja resetar TODOS os contatos (irá ficar sem backup automático) completamente?'
            );
            if (confirma) {
              setContatos([]);
              localStorage.clear();
            }
          }}
        >
          Resetar Contatos Completamente (!)
        </MenuItem>
      </Select>
    </FormControl>
  );
}
