import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { HttpUploadProgressEvent } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { VidoeFile } from 'src/Entities/VideoList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  private videoList = new BehaviorSubject<VidoeFile[]>(null);
  private currentVideoPlayin = new BehaviorSubject<string>(null);

  constructor(private _http: HttpClient) {
    this.fetchList();
  }

  public upload(data: FormData) {
    const request = this.getUploadRequest(data);
    return this._http.request(request).pipe(map(this.mapUploadResponse));
  }

  public getAllVideos() {
    return this.videoList;
  }

  public addNewVideo(newVideo: VidoeFile) {
    this.videoList.next([...this.videoList.getValue(), this.mapFile(newVideo)]);
  }

  public getVideo(videoId: number) {
    return this._http.get(`${environment.apiDomain}/video/${videoId}`);
  }

  private fetchList() {
    this._http
      .get<VidoeFile[]>(`${environment.apiDomain}/video/all`)
      .pipe(map(list => this.mapFileList(list)))
      .subscribe(list => this.videoList.next(list));
  }

  private mapFileList(list: VidoeFile[]) {
    console.log(list);
    const temp = list.map(this.mapFile);
    return temp;
  }

  private mapFile(received) {
    return {
      fileName: received.fileName,
      contentType: received.contentType,
      length: +Number(received.size / (1024 * 1024)).toPrecision(4),
      _id: received._id,
      url: received.Location
    };
  }

  private getUploadRequest(data: FormData) {
    return new HttpRequest(
      'POST',
      `${environment.apiDomain}/video/save`,
      data,
      { reportProgress: true }
    );
  }

  private mapUploadResponse(res: HttpEvent<{}>) {
    switch (res.type) {
      case 0:
        return 0;
      case 1: {
        const progress: HttpUploadProgressEvent = <HttpUploadProgressEvent>res;
        return Math.round((progress.loaded / progress.total) * 100);
      }
      case 4:
        return res;
      default:
        return 100;
    }
  }
}
