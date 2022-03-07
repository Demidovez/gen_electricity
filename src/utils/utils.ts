export const getKvartalNumber = (month: number): number => {
  return Math.ceil(month / 3);
};

export const summa = (a: number, b: number): number => {
  return Number((a + b).toFixed(2));
};
