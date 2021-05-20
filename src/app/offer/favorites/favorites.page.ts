import { Component, OnInit } from '@angular/core';
import { AdvertisementDTO } from 'src/app/dto/advertisement-dto';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { FileService, FileUpload } from 'src/app/services/file.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  selectedFiles = new Array();
  imageToDisplay = new Array();
  percentage: number;
  imgURL: any;
  offer: AdvertisementDTO = {} as AdvertisementDTO;

  constructor(private uploadService: FileService, private advService: AdvertisementService) { }

  ngOnInit(): void {
  }

  onSubmit(offer) {
    offer.key = "";
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
      let test = await this.uploadService.pushFileToStorage(currentFileUpload);

      console.log("Plik url", currentFileUpload);
      console.log("udalo sie nanana!");
      console.log(currentFileUpload);
      this.offer.photo.push(currentFileUpload.url);
      numberOf++
      if (numberOf == this.selectedFiles.length)
        this.advService.update(this.offer.key, this.offer);

    });
  }

}
