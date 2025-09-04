export const generateRandomId = (prefix: string = ''): string => 
  Math.random().toString(36).replace('0.', prefix);