import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
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
  offers: AdvertisementDTO[] = {} as AdvertisementDTO[];

  constructor(private advService: AdvertisementService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
        // this.advService.getFavourites().snapshotChanges().pipe(
        //   map(changes =>
        //     changes.map(c =>
        //       ({ key: c.payload.key, ...c.payload.val() })
        //     )
        //   )
        // ).subscribe(data => {
        //   this.offers = data.filter(val => val.uid=)
        //   this.advService.getAll()
        //   // this.offers = data;
        //   console.log(data)
        // });
      })
  }
    
  // getAllOffers(){

  // }

}

