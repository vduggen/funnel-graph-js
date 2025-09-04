import type { GradientDirection } from '@/types';

export const setAttrs = (element: SVGElement, attributes: Record<string, string | number>): void => {
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, String(attributes[key]));
  });
};

export const removeAttrs = (element: SVGElement, ...attributes: string[]): void => {
  attributes.forEach((attribute) => {
    element.removeAttribute(attribute);
  });
};

export const createSVGElement = (
  element: string,
  container?: SVGElement | Element,
  attributes?: Record<string, string | number>
): SVGElement => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', element) as SVGElement;

  if (attributes) {
    setAttrs(el, attributes);
  }

  if (container) {
    container.appendChild(el);
  }

  return el;
};

export const generateLegendBackground = (color: string | string[], direction: GradientDirection = 'horizontal'): string => {
  if (typeof color === 'string') {
    return `background-color: ${color}`;
  }

  if (color.length === 1) {
    return `background-color: ${color[0]}`;
  }

  return `background-image: linear-gradient(${
    direction === 'horizontal' ? 'to right, ' : ''
  }${color.join(', ')})`;
};

const defaultColors: string[] = [
  '#FF4589', '#FF5050',
  '#05DF9D', '#4FF2FD',
  '#2D9CDB', '#A0BBFF',
  '#FFD76F', '#F2C94C',
  '#FF9A9A', '#FFB178'
];

export const getDefaultColors = (number: number): string[] => {
  const colors = [...defaultColors];
  
  while (colors.length < number) {
    colors.push(...defaultColors);
  }
  
  return colors.slice(0, number);
};

export const areEqual = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) return false;
  
  for (let i = 0; i < array1.length; i++) {
    if (Array.isArray(array1[i]) && Array.isArray(array2[i])) {
      if (!areEqual(array1[i], array2[i])) return false;
    } else if (array1[i] !== array2[i]) {
      return false;
    }
  }
  
  return true;
};