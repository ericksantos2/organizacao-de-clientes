import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import handleBotoes from './Botoes';
import BotaoNegativo from './Botoes/BotaoNegativo/';
import BotaoPositivo from './Botoes/BotaoPositivo';
import CampoDeTexto from './CampoDeTexto';
import styles from './FormularioCliente.module.scss';
import handleInputs from './handleInputs';
import inputsFormulario from './inputsFormulario';

export default function FormularioCliente() {
  const [nome, setNome] = useState<string>('');
  const [emails, setEmails] = useState<string[]>(['']);
  const [numeros, setNumeros] = useState<string[]>(['']);
  const [cnpj, setCnpj] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  

  const inputs = inputsFormulario({
    nome,
    setNome,
    emails,
    setEmails,
    numeros,
    setNumeros,
    cnpj,
    setCnpj,
    cep,
    setCep,
  });

  return (
    <div className={styles.formularioDiv}>
      <Paper elevation={3} sx={{ borderRadius: '10px' }}>
        <form className={styles.formulario}>
          {inputs.map((input: any, index: number) => {
            if (input.array === true) {
              return (
                <React.Fragment key={index}>
                  {input.valor.map((item: string, indexB: number) => {
                    if (indexB === 0) {
                      return (
                        <div key={indexB} className={styles.formulario__input}>
                          <CampoDeTexto
                            valor={item}
                            label={input.texto}
                            onChange={(evento) =>
                              handleInputs(evento, input, indexB)
                            }
                          />
                          <BotaoPositivo
                            disabled={
                              input.valor.length >= 5 ? 'true' : 'false'
                            }
                            onClick={() =>
                              handleBotoes('positivo', input)
                            }
                          />
                          <BotaoNegativo
                            disabled={
                              input.valor.length <= 1 ? 'true' : 'false'
                            }
                            onClick={() =>
                              handleBotoes('negativo', input)
                            }
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div key={indexB} className={styles.formulario__input}>
                          <CampoDeTexto
                            valor={item}
                            label={input.texto}
                            onChange={(evento) =>
                              handleInputs(evento, input, indexB)
                            }
                          />
                        </div>
                      );
                    }
                  })}
                </React.Fragment>
              );
            } else {
              return (
                <TextField
                  key={index}
                  id='standard-basic'
                  variant='standard'
                  value={input.valor}
                  onChange={(evento) => {
                    handleInputs(evento, input);
                  }}
                  label={input.texto}
                />
              );
            }
          })}
          <Button
            variant='contained'
            onClick={() => {
              const lista = [nome, emails, numeros, cnpj, cep];
              for (let item of lista) {
                console.log(item);
              }
            }}
          >
            Enviar
          </Button>
        </form>
      </Paper>
    </div>
  );
}
