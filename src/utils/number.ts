export const roundPoint = (num: number): number => Math.round(num * 10) / 10;

export const formatNumber = (num: number): string => 
  Number(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');