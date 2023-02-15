import { TextField } from "@mui/material";

export default function CampoDeTexto({
  label,
  valor,
  onChange,
}: {
  label: string;
  valor: string;
  onChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
}) {
  return (
    <TextField
      id='standard-basic'
      variant='standard'
      label={label}
      value={valor}
      onChange={onChange}
    />
  );
}