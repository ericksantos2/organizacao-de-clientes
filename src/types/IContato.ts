export interface IContato {
  nome: string,
  nomeEmpresa?: string,
  emails?: string[],
  numeros?: string[],
  cnpj?: string,
  cep?: string,
  id: number
}