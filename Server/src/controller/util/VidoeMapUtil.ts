export class VideoMapUtil {
  public static mapDbData(file: Express.Multer.File, savedVideo) {
    return {
      fileName: file.originalname,
      size: file.size,
      contentType: file.mimetype,
      Location: savedVideo.Location
    };
  }
}
