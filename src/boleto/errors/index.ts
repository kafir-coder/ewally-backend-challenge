export * from './insufficient-dline-length';
export const badRequest = (error: Error): { name: string; message: string } => {
  return {
    name: error.name,
    message: error.message,
  };
};
