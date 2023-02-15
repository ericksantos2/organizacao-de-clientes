import inputFormulario from "../../types/IinputFormulario";

export default function handleInputs(
  evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  input: inputFormulario,
  index?: number
) {
  if ((input.tipo === 'email' || input.tipo === 'numero') && index != undefined) {
    let arrayAntes = [...input.valor];
    arrayAntes[index] = evento.target.value;
    input.set([...arrayAntes]);
  } else input.set(evento.target.value);
}