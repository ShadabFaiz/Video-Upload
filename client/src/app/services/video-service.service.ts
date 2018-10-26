import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { VidoeFile } from 'src/Entities/VideoList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  constructor(private _http: HttpClient) {}

  public upload(data: FormData) {
    return this._http.post(`${environment.apiDomain}/video/save`, data);
  }

  public getAllVideos() {
    return this._http
      .get<VidoeFile[]>(`${environment.apiDomain}/video/all`)
      .pipe(
        map(FileList => this.mapFileList(FileList)),
        shareReplay(1)
      );
  }

  private mapFileList(recieved: VidoeFile[]) {
    const temp = recieved.map(this.mapFile);
    return temp;
  }

  private mapFile(received: VidoeFile) {
    return {
      filename: received.filename,
      contentType: received.contentType,
      length: +Number(received.length / (1024 * 1024)).toPrecision(6)
    };
  }
}
