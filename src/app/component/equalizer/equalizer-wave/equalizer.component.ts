import { AudioService } from './../../../service/audio.service';
import { BezierService } from '../../../service/bezier.service';
import { Observable } from 'rxjs';
import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { IPoint, Visualizer, IWave, ISong, FrequencyPart } from 'src/app/model/graphic.model';

@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.scss'],
  host: {'class': 'card'}
})
export class EqualizerWaveComponent {
  playerPlaying: boolean = false;
  activeSong: number = 0;
  playerPlaying$: Observable<boolean>;
  visualizer: Visualizer;
  bars: FrequencyPart[] = [];
  waves: IWave[] = [];
  source: MediaElementAudioSourceNode;
  audio: any;
  ctx: AudioContext;
  analyser: AnalyserNode;
  resetingWaves: boolean = false;

  @Input() frequencyParts: number = 10;
  @Input() historyWaveCount: number = 1;
  @Input() historyWaveDelay: number = 50;
  @Input() historyWaveYDifference: number = -2;
  @Input() historyWaveXDifference: number = 1;

  @Input() fill: string = "rgba(255,60,0,1)";
  @Input() stroke: string = "none";
  @Input() strokeWidth: number = .1;
  @Input() width: string = "500px";
  @Input() height: string = "90px";

  viewBoxX: number = 100;
  viewBoxY: number =  30;

  @Input() playlist: ISong[] = [
    {path: "./assets/Timecop1983 - Night Drive (instrumental edition) - 01 Static (feat. The Midnight) -instrumental-.mp3", name: "Fox on the Run"},
    {path: "./assets/Timecop1983 - Night Drive (instrumental edition) - 02 On the Run.mp3", name: "Wham Bam Shang-A-Lang"},
    {path: "./assets/Timecop1983 - Night Drive (instrumental edition) - 03 Back to You (feat. The Bad Dreamers) -instrumental-.mp3", name: "file_example_MP3_700KB"}
  ]

  constructor(
    private cdr: ChangeDetectorRef,
    private bezierService: BezierService,
    private audioService: AudioService
  ) {}

  start(song: ISong) {

    this.ctx = new AudioContext();
    this.analyser = this.ctx.createAnalyser();
    this.audio = new Audio();
    this.audio.src = song.path;
    this.audio.controls = true;
    this.audio.loop = false;
    this.audio.autoplay = true;
    this.visualizer = {frequencyPart: []};
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
  }

  stop() {
    if (this.ctx) {
      this.audio.currentTime = 0;
      //this.ctx.resume();
      this.audio.pause();
      this.playerPlaying = false;
      this.visualizer = null;
    }
    this.resetWaves();
  }

  playToggle(song?: ISong) {
    if (this.ctx === undefined || this.audio.currentTime == 0) {
      this.playerPlaying = true;
      this.start(this.playlist[0]);
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
    let reducedFrequency = this.audioService.getReducedFrequencyParts(this.frequencyParts, arr);


    for (let index = 0; index < this.waves.length; index++) {
      setTimeout(() => {
        if (this.resetingWaves == false) {
          this.visualizer.frequencyPart.forEach((bar,barIndex) => {
            bar.amplitude = reducedFrequency[barIndex]
          })
          this.waves[index].path = this.getPath(this.visualizer,index);
          this.cdr.detectChanges();
        } else {
          this.visualizer.frequencyPart.forEach((bar,barIndex) => {
            bar.amplitude = 0;
          })
          this.waves[index].path = this.getPath(this.visualizer,index);
          this.cdr.detectChanges();
        }
      }, (index * this.historyWaveDelay));
    }
  }



  resetWaves() {
    this.resetingWaves = true;
    setTimeout(() => {
      this.resetingWaves = false;
      this.waves.splice(0,this.historyWaveCount);
    }, this.historyWaveCount * 100);
  }

  getPath(visualizer: Visualizer, layer: number): string {
    const startPoint: IPoint = {x: 0, y: this.viewBoxY - this.viewBoxY / 10 + layer * this.historyWaveYDifference};
    let endPoint: IPoint;
    const diffX: number = 100 / (this.frequencyParts * 2);
    let result: string;
    let points: IPoint[] = [];
    let a: number;
    for (let index = 0; index < visualizer.frequencyPart.length; index++) {
      const x = startPoint.x + (index * 2) * diffX + layer * this.historyWaveXDifference;
      points.push({x: x, y: startPoint.y});
      points.push({x: x + diffX,y:startPoint.y - (visualizer.frequencyPart[index].amplitude * this.viewBoxY / 100)});
    }
    points.push({x: points[points.length - 1].x + diffX,y: startPoint.y});

    //result = this.bezierService.makePath(points);
    result = this.bezierService.makePolyline(points,"path");
    result = this.addSquareUnderPath(result,points[0],points[points.length - 1],this.viewBoxY / 10);
    return result;
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  addSquareUnderPath(path: string, startPoint: IPoint, endPoint: IPoint, height: number): string {
    return path + ` l 0 ${height} l -100 0 z`
  }

  activateSong(addition: number) {
    const newOrder = this.activeSong + addition;

    switch (true) {
      case newOrder > this.playlist.length - 1:
        this.activeSong = 0;
        break;
      case newOrder < 0:
        this.activeSong = this.playlist.length - 1;
        break;
      default:
        this.activeSong = newOrder;
    }

    this.stop();
    this.start(this.playlist[this.activeSong]);
    this.cdr.detectChanges();
  }

  get listPosition() {
    return {transform: 'translateX(-' + this.activeSong * 100 + '%)'};
  }

  getWaveStyle(wave: IWave): object {
    return {
      "stroke": wave.stroke,
      "stroke-width": wave.strokeWidth,
      "fill": wave.fill,
      "opacity": wave.opacity
    }
  }

}

