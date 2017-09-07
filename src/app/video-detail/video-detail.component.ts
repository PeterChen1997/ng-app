import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs:['video'],
  outputs:['updateVideoEvent','deleteVideoEvent']
})
export class VideoDetailComponent implements OnInit {

  video: any;

  private editTitle: boolean = false;
  private editUrl: boolean = false;
  private editDesc: boolean = false;

  private updateVideoEvent = new EventEmitter();
  private deleteVideoEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.editTitle = false;
    this.editUrl = false;
    this.editDesc =false;
  }

  onTitleClick(){
    this.editTitle = true;
  }
  onUrlClick(){
    this.editUrl = true;
  }
  onDescClick(){
    this.editDesc = true;
  }

  updateVideo() {
    this.updateVideoEvent.emit(this.video);
  }

  deleteVideo() {
    this.deleteVideoEvent.emit(this.video);
  }

}
