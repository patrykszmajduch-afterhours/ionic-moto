import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileService, FileUpload } from 'src/app/services/file.service';
import { AdvertisementDTO } from 'src/app/dto/advertisement-dto';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  selectedFiles = new Array();
  imageToDisplay = new Array();
  percentage: number;
  imgURL: any;
  offer: AdvertisementDTO = {} as AdvertisementDTO;
  userUid: string;
  constructor(private uploadService: FileService, private advService: AdvertisementService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(el => {
      if (el != null)
        this.userUid = el.uid;
      console.log("user id dodawanie", this.userUid);
    });

  }

  onSubmit(offer) {
    offer.key = "";
    offer.userId = this.userUid;
    console.log(offer);
    var key = this.advService.create(offer);
    this.offer = offer;
    this.offer.key = key.key;
    this.offer.photo = new Array();
    this.upload();
  }

  selectFile(event): void {
    this.selectedFiles.push(event.target.files);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageToDisplay.push(reader.result);
    }
  }

  upload(): void {
    let numberOf = 0;
    this.selectedFiles.forEach(async (element) => {
      const file = element.item(0);
      var currentFileUpload = new FileUpload(file);
      let test = await this.uploadService.pushFileToStorage(this.offer.key, currentFileUpload);

      console.log("Plik url", currentFileUpload);
      console.log("udalo sie nanana!");
      console.log(currentFileUpload);
      this.offer.photo.push(currentFileUpload.url);
      numberOf++;
      if (numberOf == this.selectedFiles.length)
        this.advService.update(this.offer.key, this.offer);
    });
  }
}