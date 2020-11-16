import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FrequencyPart, ISong, Visualizer } from 'src/app/model/graphic.model';
import { BezierService } from 'src/app/service/bezier.service';
import { AudioService } from 'src/app/service/audio.service';

@Component({
  selector: 'app-equalizer-bars',
  templateUrl: './equalizer-bars.component.html',
  styleUrls: ['./equalizer-bars.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EqualizerBarComponent implements OnInit {
  visualizer: Visualizer;
  audio: any;
  frqCount: number;
  ctx: AudioContext;
  analyser: AnalyserNode;

  @Input() playlist: ISong[] = [
    {path: "./assets/Timecop1983 - Night Drive (instrumental edition) - 01 Static (feat. The Midnight) -instrumental-.mp3", name: "Fox on the Run"},
    {path: "./assets/Timecop1983 - Night Drive (instrumental edition) - 02 On the Run.mp3", name: "Wham Bam Shang-A-Lang"},
    {path: "./assets/Timecop1983 - Night Drive (instrumental edition) - 03 Back to You (feat. The Bad Dreamers) -instrumental-.mp3", name: "file_example_MP3_700KB"}
  ]

  constructor(
    private bezierService: BezierService,
    private audioService: AudioService
  ) { }

  ngOnInit(): void {
  }

  getStyle(bar: FrequencyPart) {
    return {
      height: bar.amplitude + '%'
    }
  }

}
