import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VidoeFile } from 'src/Entities/VideoList';

import { VideoServiceService } from '../services/video-service.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  videoList: VidoeFile[];
  constructor(
    private _fb: FormBuilder,
    private _videoService: VideoServiceService,
    private _changeDetector: ChangeDetectorRef
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.getVideoList();
  }

  initializeForm() {
    this.form = this._fb.group({
      fileControl: ["", Validators.required]
    });
  }

  uploadFile(event) {
    console.log("Uploading file");
    console.log(this.form.value);
  }

  getVideoList() {
    // this._videoService.getAllVideos().subscribe(res => console.log(res));
    this._videoService
      .getAllVideos()
      .subscribe(
        res => (this.videoList = res),
        err => console.log(err),
        () => this.detectChange()
      );
  }

  onChange(event) {
    const files: FileList = event.target.files;
    const formData: FormData = new FormData();
    formData.append(files[0].name, files[0], files[0].name);
    this._videoService
      .upload(formData)
      .subscribe(this.onUploadSuccess, this.onUploadError, this.onComplete);
  }

  private onUploadSuccess(res) {
    console.log(res);
  }

  private onUploadError(err) {
    console.error(err);
  }

  private onComplete() {
    console.log("completed");
  }

  detectChange() {
    this._changeDetector.detectChanges();
  }
}
