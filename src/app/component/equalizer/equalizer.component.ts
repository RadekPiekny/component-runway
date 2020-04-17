import { BezierService } from './../../service/bezier.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IPoint } from 'src/app/model/graphic.model';

@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.scss'],
  host: {'class': 'card'}
})
export class EqualizerComponent implements OnInit {
  playerPlaying: boolean = false;
  activeSong: number = 0;
  songs: FileList;
  playerPlaying$: Observable<boolean>;
  visualizer: Visualizer;
  bars: Bar[] = [];
  barCount: number = 8;
  historyWaves: number = 5;
  waves: IWave[] = [];
  source: MediaElementAudioSourceNode;
  audio: any;
  frqCount: number;
  ctx: AudioContext;
  analyser: AnalyserNode;

  playlist: string[] = [
    "./assets/02 Fox on the Run (Single Version)",
    "./assets/10 Wham Bam Shang-A-Lang",
    "./assets/file_example_MP3_700KB"
  ]

  buttonOutlineStyle  = {
    'stroke': 'var(--Icon-Fill)',
    'stroke-width': 3,
    'fill': 'none'
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private bezierService: BezierService
  ) {}
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

    for (let index = 0; index < this.historyWaves; index++) {
      this.waves.push({path: '', fill: `rgba(255,0,0,0.${99 - index * 18})`});
    }

    this.source = this.ctx.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  stop() {
    if (this.ctx) {
      this.audio.currentTime = 0;
      //this.ctx.resume();
      this.audio.pause();
      this.playerPlaying = false;
    }
  }

  playToggle() {
    if (this.ctx === undefined || this.audio.currentTime == 0) {
      this.playerPlaying = true;
      this.start();
      this.play();
      return;
    }
    if(this.ctx.state === 'running') {
      this.ctx.suspend();
      this.playerPlaying = false;
    } else if(this.ctx.state === 'suspended') {
      this.ctx.resume();
      this.playerPlaying = true;
    }
  }

  play() {
    requestAnimationFrame(() => this.play());
    let arr = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(arr); //getByteFrequencyData returns a normalized array of values between 0 and 255
    let reducedFrequency = this.getReducedFrequencyParts(this.barCount, arr)


    for (let index = 0; index < this.waves.length; index++) {
      setTimeout(() => {
        this.visualizer.bar.forEach((bar,barIndex) => {
          bar.height = reducedFrequency[barIndex]
        })
        this.waves[index].path = this.getPath(this.visualizer,index);
        this.cdr.detectChanges();
      }, (index * 200));
    }
  }

  getStyle(bar: Bar) {
    return {
      height: bar.height + '%'
    }
  }

  getPath(visualizer: Visualizer, layer: number): string {
    const start: IPoint = {x: 0, y: 10};
    const diffX: number = 80 / this.barCount;
    let points: IPoint[] = [];
    visualizer.bar.forEach((bar,index) => {
      points.push({x: start.x + (2*index) * diffX + layer * diffX / 3,y:10 + layer * -0.5});
      points.push({x: start.x + (2 * index + 1) * diffX + layer * diffX / 3, y: start.y - (bar.height / 10) + layer * -0.5});
    })
    return this.bezierService.makePath(points);
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

  activateSong(addition: number) {
    const newOrder = this.activeSong + addition;

    switch (true) {
      case newOrder > this.songs.length - 1:
        this.activeSong = 0;
        break;
      case newOrder < 0:
        this.activeSong = this.songs.length - 1;
        break;
      default:
        this.activeSong = newOrder;
    }

    this.stop();
  }

  get listPosition() {
    return {transform: 'translateX(-' + this.activeSong * 100 + '%)'};
  }

}

class Bar {
  height: number = 5;
}

class Visualizer {
  bar: Bar[] = [];
}

interface IWave {
  path: string;
  fill: string;
}