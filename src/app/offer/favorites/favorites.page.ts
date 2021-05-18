import { Component, OnInit } from '@angular/core';
import { FileService, FileUpload } from 'src/app/services/file.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  imageToDisplay = new Array();
  percentage: number;
  imgURL:any;

  constructor(private uploadService: FileService) { }

  ngOnInit(): void {
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[0]); 
    reader.onload = (_event) => { 
      console.log(typeof this.imageToDisplay)

      this.imageToDisplay.push(reader.result); 
      console.log(this.imageToDisplay);
      console.log(typeof reader.result)
    }
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

}
