import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AdvertisementDTO } from 'src/app/dto/advertisement-dto';
import { VehicleInformationDto } from 'src/app/dto/vehicle-information-dto';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  carsList: AdvertisementDTO[];
  constructor(private carService:AdvertisementService,public modalController: ModalController) { }
  veh:VehicleInformationDto;


  async presentModal() {
    const modal = await this.modalController.create({
      component: DetailsComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  test:AdvertisementDTO ;
  ngOnInit() {
    this.veh={
      vehicleType:"cabrio",
      id:"1"
    }
  
    this.test ={
      advertisementId: "1",
      announcementDate: "2020-01-03",
      status: true,
      voivodeship: "SLASKIE",
      vehicle: this.veh,
      userId: "pszmajduch",
      photo:"firebasestorage.googleapis.com/v0/b/otomoto-21f01.appspot.com/o/audi.jpg?alt=media"
    }
    // this.carService.getAll().subscribe((data: {}) => {
    //   this.carsList = data as Array<AdvertisementDTO>;
    //   console.log("its working!");
    //   console.log(data);
    // })
     this.carService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.carsList = data;
      console.log(data)
    });
  }
  
  onClick(){
    this.carService.create(this.test);
  }

 
  
}
