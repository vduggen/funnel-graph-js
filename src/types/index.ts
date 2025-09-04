export interface FunnelData {
  labels?: string[];
  subLabels?: string[];
  colors?: string | string[] | (string | string[])[];
  values: number[] | number[][];
}

export interface FunnelConfig {
  width?: number;
  height?: number;
  direction?: 'horizontal' | 'vertical';
  gradientDirection?: 'horizontal' | 'vertical';
  displayPercent?: boolean;
  subLabelValue?: 'percent' | 'raw';
}

export type FunnelDirection = 'horizontal' | 'vertical';
export type GradientDirection = 'horizontal' | 'vertical';
export type SubLabelValueType = 'percent' | 'raw';

export interface PathCoordinates {
  x: number[];
  y: number[];
}

export interface FunnelGraphProps {
  data: FunnelData;
  config?: FunnelConfig;
  width?: number;
  height?: number;
  direction?: FunnelDirection;
  gradientDirection?: GradientDirection;
  displayPercent?: boolean;
  subLabelValue?: SubLabelValueType;
}