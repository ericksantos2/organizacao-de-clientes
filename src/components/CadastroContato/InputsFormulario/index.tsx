import { TextField } from '@mui/material';
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
    let input = evento.target.value;
    if (item.mascara) {
      input = item.mascara(input);
    }
    itemAntes[index] = input;
    item.setValores([...itemAntes]);
  } else {
    throw Error('Erro no uso da função');
  }
}

export default function InputsFormulario({
  inputs,
  erro = false,
}: {
  inputs: IState[];
  erro: boolean;
}) {
  return (
    <>
      {inputs.map((item, index) => {
        if (item.tipo === 'normal') {
          return (
            <TextField
              key={index}
              label={item.texto}
              value={item.valor ? item.valor : ''}
              onChange={(evento) => {
                if (item.setValor) {
                  let input = evento.target.value;
                  if (item.mascara) {
                    input = item.mascara(input);
                  }
                  item.setValor(input);
                }
              }}
              className={styles.input}
              error={item.temErro && (erro === true ? true : false)}
              helperText={
                item.temErro
                  ? erro === true
                    ? 'Campo obrigatório'
                    : false
                  : false
              }
              required={item.required === true}
            />
          );
        } else if (item.tipo === 'array') {
          return item.valores?.map((itemB: string, indexB: number) => {
            if (indexB === 0) {
              return (
                <div className={styles.input__array} key={indexB}>
                  <TextField
                    label={item.texto}
                    value={itemB}
                    onChange={(evento) => {
                      handleValue(evento, item, indexB);
                    }}
                    sx={{ width: '100%' }}
                  />
                  <Botao
                    desabilitado={{
                      valor: item.valores ? item.valores : [''],
                      tipo: 'maior',
                      numero: 5,
                    }}
                    onClick={() => {
                      handleBotaoAdicionar(item, 'adicionar');
                    }}
                  >
                    +
                  </Botao>
                  <Botao
                    desabilitado={{
                      valor: item.valores ? item.valores : [''],
                      tipo: 'igual',
                      numero: 1,
                    }}
                    onClick={() => {
                      handleBotaoAdicionar(item, 'remover');
                    }}
                  >
                    -
                  </Botao>
                </div>
              );
            }
            return (
              <TextField
                key={indexB}
                label={item.texto}
                value={itemB}
                onChange={(evento) => {
                  handleValue(evento, item, indexB);
                }}
                sx={{ width: '100%' }}
              />
            );
          });
        }
      })}
    </>
  );
}
