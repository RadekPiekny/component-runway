import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equalizer',
  templateUrl: './equalizer.component.html',
  styleUrls: ['./equalizer.component.css']
})
export class EqualizerComponent implements OnInit {
 visualizer: Visualizer;
  bars: Bar[] = [];
  barCount: number = 3;
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
    this.frqCount = this.analyser.frequencyBinCount * 255;
    this.audio = new Audio();
    this.audio.src = "./assets/file_example_MP3_5MG.mp3";
    this.audio.controls = true;
    this.audio.loop = false;
    this.audio.autoplay = true;

    this.visualizer = new Visualizer;
    for (let index = 0; index < this.barCount; index++) {
      let newBar: Bar = new Bar;
      newBar.height = 5;
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
    this.analyser.getByteFrequencyData(arr);
    if (arr[0]) {
      //console.log(arr);
    }
    
    this.visualizer.bar.forEach((bar,barIndex) => {
      bar.height = arr.reduce((total,current,arrIndex) => {
        if (arrIndex < arr.length / this.visualizer.bar.length - barIndex && arrIndex >= barIndex * (arr.length / this.visualizer.bar.length)) {
          return total + current;
        }
        return total;
      },0) / (arr.length / this.visualizer.bar.length);
      console.log(bar.height);
    })
  }

  getStyle(bar: Bar) {
    console.log("bar height: " + bar.height);
    return {
      height: bar.height + 'px'
    }
  }

}

class Bar {
  height: number = 5;
}

class Visualizer {
  bar: Bar[] = [];
}
