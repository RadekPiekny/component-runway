export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
  
export interface IButtonOutlineStyle {
    stroke: string;
    strokeWidth: number;
    fill: string;
}