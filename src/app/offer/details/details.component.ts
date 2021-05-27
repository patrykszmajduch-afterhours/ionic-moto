import { Component, NgModule, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdvertisementDTO } from 'src/app/dto/advertisement-dto';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  offer:AdvertisementDTO;

  constructor( private modalCtr: ModalController) { }

  ngOnInit() {
    console.log(`${this.offer}`);
  }

  close(){
    this.modalCtr.dismiss();
  }
}
