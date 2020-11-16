export  interface IPoint {
    x: number;
    y: number;
}

export interface FrequencyPart {
    amplitude: number;
}

export interface Visualizer {
    frequencyPart: FrequencyPart[];
}

export interface IWave {
    path: string;
    fill: string;
    opacity: number;
    stroke: string;
    strokeWidth: number;
}

export interface ISong {
    path: string;
    name: string;
}