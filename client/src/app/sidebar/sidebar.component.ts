import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VidoeFile } from 'src/Entities/VideoList';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input()
  videoList: VidoeFile[];

  @Output()
  videoClick = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onClick(videoId: number) {
    this.videoClick.emit(videoId);
  }
}
