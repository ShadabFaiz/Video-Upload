import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VidoeFile } from 'src/Entities/VideoList';

import { VideoServiceService } from '../services/video-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  videoList: VidoeFile[];
  uploadFileName: string;
  uploadProgressMessage: string;
  uploadFailureMessage: string;
  uploadSuccessMessage: string;
  videoUnsupportError: string;
  currentPlayingVideoURL: SafeResourceUrl;
  currentlyPlaying: { fileName: string; url: SafeResourceUrl };

  constructor(
    private _fb: FormBuilder,
    private _videoService: VideoServiceService,
    private _changeDetector: ChangeDetectorRef,
    private _domSantitizer: DomSanitizer
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.getVideoList();
  }

  initializeForm() {
    this.form = this._fb.group({
      fileControl: ['', Validators.required]
    });
  }

  getVideoList() {
    this._videoService.getAllVideos().subscribe(
      res => {
        this.videoList = res;
        this.detectChange();
      },
      err => console.log(err)
    );
  }

  onChange(event) {
    this.detectChange();
    if (this.form.valid) {
      let formData: FormData;
      this.resetMessages();
      try {
        formData = this.createFormData(event);
        this._videoService
          .upload(formData)
          .subscribe(
            res => this.onProgress(res),
            err => this.onUploadError(err),
            () => this.onComplete()
          );
      } catch (error) {
        this.uploadFailureMessage = error.message;
        this.detectChange();
      }
    }
  }

  createVideoUrl(videoId: number) {
    this.resetCurrentVideo();
    const fileToPlay = this.videoList[videoId];
    this.currentlyPlaying = {
      fileName: fileToPlay.fileName,
      url: this._domSantitizer.bypassSecurityTrustResourceUrl(fileToPlay.url)
    };
    this.detectChange();
  }

  private resetCurrentVideo() {
    this.currentlyPlaying = null;
    this.resetMessages();
    this.detectChange();
  }

  getVideoUrl() {
    return this.currentPlayingVideoURL ? this.currentPlayingVideoURL : null;
  }

  private createFormData(event) {
    const files: FileList = event.target.files;
    if (this.isFileSizeValid(files[0])) {
      const formData: FormData = new FormData();
      formData.append(files[0].name, files[0], files[0].name);
      this.setLabel(files[0].name);
      return formData;
    } else {
      throw new Error(
        'Upload Failed. File Size cannot be greater than 100 MB.'
      );
    }
  }

  private isFileSizeValid(file: File) {
    // return file.size / (1024 * 1024) > 100 ? false : true;
    return true;
  }

  private setLabel(fileName: string) {
    this.uploadFileName = fileName;
  }

  private resetMessages() {
    this.uploadFailureMessage = null;
    this.uploadProgressMessage = null;
    this.uploadSuccessMessage = null;
    this.videoUnsupportError = null;
  }

  private onProgress(res) {
    console.log('progreess');
    this.uploadProgressMessage = `Upload in progress: ${res}%`;
    if (typeof res === 'object') {
      this.addNewFile(res.body.file);
    }
    this.detectChange();
  }

  private addNewFile(newFile: VidoeFile) {
    this._videoService.addNewVideo(newFile);
  }

  private onUploadError(err) {
    this.resetMessages();
    this.uploadFailureMessage = `Upload Failed`;
    this.detectChange();
  }

  private onComplete() {
    this.resetMessages();
    this.uploadSuccessMessage = `Video Uploaded Successfully.`;
    this.detectChange();
  }

  detectChange() {
    this._changeDetector.detectChanges();
  }

  errored(event) {
    this.videoUnsupportError =
      'This video is not suppoirted in current browser';
  }
}
