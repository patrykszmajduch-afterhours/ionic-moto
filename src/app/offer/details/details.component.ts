import { Component, OnInit } from '@angular/core';
import { AdvertisementDTO } from 'src/app/dto/advertisement-dto';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  offer:AdvertisementDTO;

  constructor() { }

  ngOnInit() {
    console.log(`${this.offer}`);
  }

}
