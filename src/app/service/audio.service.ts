import { Visualizer, FrequencyPart } from 'src/app/model/graphic.model';
import { Injectable } from '@angular/core';
import { ISong } from '../model/graphic.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  getReducedFrequencyParts(parts: number = 3, frequencyFull: Uint8Array): number[] {
    let decibel: number;
    let result: number[] = [];
    let frequencyPart: Uint8Array;
    const lengthArrays: number = Math.floor(frequencyFull.length / parts);

    for (let i = 0; i < parts - 1; i++) {
      frequencyPart = frequencyFull.slice(i * lengthArrays, i * lengthArrays + lengthArrays)
      decibel = frequencyPart.reduce((acc,curr) => acc + curr, 0)
      decibel = decibel / frequencyPart.length;
      decibel = decibel / 255 * 100 //we want height in percentages so that developer can put it in some class with desired height
      result.push(decibel);
    }

    //the last one might no be dividible so that is why it is out of loop
    frequencyPart = frequencyFull.slice((parts - 1) * lengthArrays)
    decibel = frequencyPart.reduce((acc,curr) => acc + curr, 0)
    decibel = decibel / frequencyPart.length;
    decibel = decibel / 255 * 100 //we want height in percentages so that developer can put it in some class with desired height
    result.push(decibel);

    return result;
  }

  stop(ctx: AudioContext, audio: any): void {
    if (ctx) {
      audio.currentTime = 0;
      audio.pause();
    }
  }

  playerRunning(ctx: AudioContext, audio: any): boolean {
    return !(ctx === undefined || audio.currentTime == 0);
  }

  start(song: ISong, ctx: AudioContext, audio: any, visualizer: Visualizer, analyser: AnalyserNode) {
/*
    ctx = new AudioContext();
    analyser = ctx.createAnalyser();
    audio = new Audio();
    audio.src = song.path;
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = true;
    visualizer = {frequencyPart: []};
    for (let index = 0; index < this.frequencyParts; index++) {
      let newBar: FrequencyPart = {amplitude: null};
      this.visualizer.frequencyPart.push(newBar);
    }

    for (let index = 0; index < this.historyWaveCount; index++) {
      this.waves.push({
        path: '',
        fill: this.fill,
        opacity: Math.pow(0.7, index),
        stroke: this.stroke,
        strokeWidth: this.strokeWidth
      });
    }

    this.source = this.ctx.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    */
  }

}
