import { Component, Input, OnInit } from '@angular/core';
import { VidoeFile } from 'src/Entities/VideoList';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input()
  videoList: VidoeFile[];

  constructor() {}

  ngOnInit() {}
}
