export const differenceForNow = (date: Date) => {
  const dRefNow = new Date();

  const now = new Date(
    `${dRefNow.getMonth() + 1}/${dRefNow.getDate()}/${dRefNow.getFullYear()}`,
  );

  const past = new Date(
    `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
  );

  const diff = Math.abs(now.getTime() - past.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const isPast = now.getTime() > past.getTime();

  return [days, isPast];
};

export const getExpirationDate = (dline: string, type: string): Date => {
  const febrabanDate = new Date('1997-10-07');

  let factor: number | null = null;

  const days = Number(dline.substr(33, 4));
  factor = type === 'BANK' ? days * (24 * 60 * 60 * 1000) : 0;

  return factor || factor === 0
    ? new Date(febrabanDate.getTime() + factor)
    : febrabanDate;
};
