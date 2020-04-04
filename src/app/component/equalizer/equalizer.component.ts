import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.css']
})
export class EqualizerComponent implements OnInit {
  visualizer: Visualizer;
  bars: Bar[] = [];
  barCount: number = 64;
  source: MediaElementAudioSourceNode;
  audio: any;
  frqCount: number;
  ctx: AudioContext;
  analyser: AnalyserNode;
  @ViewChild('audio',{static: true}) audioElement:HTMLAudioElement;

  ngOnInit() {

  }

  start() {

    this.ctx = new AudioContext();
    this.analyser = this.ctx.createAnalyser();
    this.frqCount = this.analyser.frequencyBinCount;
    this.audio = new Audio();
    this.audio.src = "./assets/10 Wham Bam Shang-A-Lang.mp3";
    this.audio.controls = true;
    this.audio.loop = false;
    this.audio.autoplay = true;

    this.visualizer = new Visualizer;
    for (let index = 0; index < this.barCount; index++) {
      let newBar: Bar = new Bar;
      this.visualizer.bar.push(newBar);
    }

    this.source = this.ctx.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    this.play();
  }

  stop() {
    this.audio.pause();
  }

  play() {
    requestAnimationFrame(() => this.play());
    let arr = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(arr); //getByteFrequencyData returns a normalized array of values between 0 and 255
    let reducedFrequency = this.getReducedFrequencyParts(this.barCount, arr)

    this.visualizer.bar.forEach((bar,barIndex) => {
      bar.height = reducedFrequency[barIndex]
    })
  }

  getStyle(bar: Bar) {
    return {
      height: bar.height + '%'
    }
  }

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

  getAmebaStyle(): Object {
    return {'border-radius': `${this.visualizer.bar[0].height}% ${this.visualizer.bar[1].height}% ${this.visualizer.bar[2].height}% ${this.visualizer.bar[3].height}% / ${this.visualizer.bar[4].height}% ${this.visualizer.bar[5].height}% ${this.visualizer.bar[6].height}% ${this.visualizer.bar[7].height}%`}
  }

}

class Bar {
  height: number = 5;
}

class Visualizer {
  bar: Bar[] = [];
}
