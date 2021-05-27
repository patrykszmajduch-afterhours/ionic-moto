import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
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
  showUser: boolean = false;
  carsList: AdvertisementDTO[];
  constructor(private carService: AdvertisementService, public modalController: ModalController, private auth: AuthService) { }
  modal: any;
  async presentModal(offerToShow) {
    this.modal = await this.modalController.create({
      component: DetailsComponent,
      componentProps: {
        offer: offerToShow
      }
    });

    return await this.modal.present();
  }

  ngOnInit() {
    this.auth.userIsAuthenticated.subscribe(val => this.showUser = val);
    // this.carService.getAll().subscribe((data: {}) => {
    //   this.carsList = data as Array<AdvertisementDTO>;
    //   console.log("its working!");
    //   console.log(data);
    // })
    // this.carService.getAll().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.key, ...c.payload.val() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.carsList = data;
    //   console.log(data)
    // });
  }

  onClick() {
  }
  show(event) {
    this.carsList = event;
  }

  dismissModal() {
    if (this.modal) {
      this.modal.dismiss().then(() => { this.modal = null; });
    }
  }
}