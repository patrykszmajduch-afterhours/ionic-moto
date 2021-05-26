import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private basePath = '/file';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,) { }

  async pushFileToStorage(prefix: string, fileUpload: FileUpload): Promise<any> {
    const filePath = '/' + prefix + `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    return await uploadTask.snapshotChanges().toPromise().finally(async () => {
      return await storageRef.getDownloadURL().toPromise().then(downloadURL => {
        fileUpload.url = downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(prefix, fileUpload);
      });
    })
      ;
  }

  private saveFileData(prefix: string, fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(prefix: string, numberItems): AngularFireList<FileUpload> {
    return this.db.list('/' + prefix + this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(prefix: string, fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(prefix, fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(prefix: string, name: string): void {
    const storageRef = this.storage.ref('/' + prefix + this.basePath);
    storageRef.child(name).delete();
  }
}

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
