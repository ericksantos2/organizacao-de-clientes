import { TextField } from '@mui/material';
import { Inputs } from '../../../types/Inputs';
import { IState } from '../../../types/IState';
import Botao, { handleBotaoAdicionar } from './BotaoAdicionar';
import styles from './InputsFormulario.module.scss';

function handleValue(
  evento: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  item: IState,
  index: number
) {
  if (item.valores && item.setValores) {
    let itemAntes = [...item.valores];
    itemAntes[index] = evento.target.value;
    item.setValores([...itemAntes]);
  } else {
    throw Error('Erro no uso da função');
  }
}

let valorAntes = '';

export default function InputsFormulario({
  inputs,
  erro = false,
}: {
  inputs: Inputs;
  erro: boolean;
}) {
  const nomes: string[] = [
    'Nome',
    'Nome da Empresa',
    'Email',
    'Numero',
    'CNPJ',
    'CEP',
  ];
  function cnpjMask(value: string) {
    // Eu sei que talvez dê pra usar expressões regulares, mas assim fica mais simples
    if (!value) return ''
    value = value.replace(/[a-zA-Zç]/g, '')
    if ((valorAntes.length === 1 && value.length === 2) || (valorAntes.length === 5 && value.length === 6)) {value += '.'};
    if (valorAntes.length === 9 && value.length === 10) {value += '/'};
    if (valorAntes.length === 14 && value.length === 15) {value += '-'};
    if (value.length >= 18) {return value.substring(0,18)};
    valorAntes = value;
    return value;
  }
  return (
    <>
      {inputs.map((item, index) => {
        if (index === 0) {
          return (
            <TextField
              key={index}
              label={nomes[index]}
              value={item.valor ? item.valor : ''}
              onChange={(evento) => {
                item.setValor ? item.setValor(evento.target.value) : '';
              }}
              className={styles.input}
              error={erro === true ? true : false}
              helperText={erro === true ? 'Campo obrigatório' : ''}
              required
            />
          );
        } else if (nomes[index] === 'CNPJ') {
          return (
            <TextField
              className={styles.input}
              label={nomes[index]}
              value={item.valor}
              onChange={(evento) => {
                if (item.setValor) {
                  let input = evento.target.value;
                  input = cnpjMask(input);
                  item.setValor(input);
                }
              }}
            />
          )
        } else if (item.tipo === 'normal') {
          return (
            <TextField
              key={index}
              label={nomes[index]}
              value={item.valor ? item.valor : ''}
              onChange={(evento) => {
                item.setValor ? item.setValor(evento.target.value) : '';
              }}
              className={styles.input}
            />
          );
        } else if (item.valores) {
          return item.valores.map((itemB, indexB) => {
            if (indexB === 0) {
              return (
                <div className={styles.input__array} key={indexB}>
                  <TextField
                    label={nomes[index]}
                    value={itemB}
                    onChange={(evento) => {
                      handleValue(evento, item, indexB);
                    }}
                    sx={{ width: '100%' }}
                  />
                  <Botao
                    disabled={
                      item.valores
                        ? item.valores.length >= 5
                          ? 'true'
                          : 'false'
                        : 'false'
                    }
                    onClick={() => {
                      handleBotaoAdicionar(item, 'adicionar');
                    }}
                  >
                    +
                  </Botao>
                  <Botao
                    disabled={
                      item.valores
                        ? item.valores.length === 1
                          ? 'true'
                          : 'false'
                        : 'false'
                    }
                    onClick={() => {
                      handleBotaoAdicionar(item, 'remover');
                    }}
                  >
                    -
                  </Botao>
                </div>
              );
            } else {
              return (
                <TextField
                  key={indexB}
                  label={nomes[index]}
                  value={itemB}
                  onChange={(evento) => {
                    handleValue(evento, item, indexB);
                  }}
                  sx={{ width: '100%' }}
                />
              );
            }
          });
        }
      })}
    </>
  );
}
