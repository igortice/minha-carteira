export default (current: number): string =>
  current.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
