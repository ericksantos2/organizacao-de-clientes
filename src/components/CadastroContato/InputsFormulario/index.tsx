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

export default function InputsFormulario({ inputs }: { inputs: Inputs }) {
  const nomes: string[] = ['Nome', 'Email', 'Numero', 'CNPJ', 'CEP'];
  return (
    <>
      {inputs.map((item, index) => {
        if (item.tipo === 'normal') {
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
