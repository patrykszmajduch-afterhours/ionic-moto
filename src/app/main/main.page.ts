import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementDTO } from '../dto/advertisement-dto';
import { AdvertisementService } from '../services/advertisement.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  carsList:AdvertisementDTO[];


  ngOnInit() {
    // this.carsList = this.advService.getAll();
  }

  // get CarList():AdvertisementDTO[]{
  //   // return this.advService.getAll();
  // }
  constructor(private activatedRoute: ActivatedRoute,private advService:AdvertisementService) { }

  // ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  // }
}
