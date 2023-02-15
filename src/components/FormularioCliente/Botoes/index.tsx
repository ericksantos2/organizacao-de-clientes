import inputFormulario from "../../../types/IinputFormulario";

export default function handleBotoes(
  tipo: 'negativo' | 'positivo',
  input: inputFormulario
) {
  if (tipo === 'positivo') {
    if (input.valor.length >= 5) {
      alert(`A quantidade máxima de ${input.texto.toLowerCase()}s é 5!`);
      return;
    }
    input.set([...input.valor, '']);
  } else if (tipo === 'negativo') {
    const lista = [...input.valor];
    lista.pop();
    input.set([...lista]);
  }
}