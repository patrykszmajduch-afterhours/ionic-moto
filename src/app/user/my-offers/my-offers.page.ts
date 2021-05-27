import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { AdvertisementDTO } from 'src/app/dto/advertisement-dto';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.page.html',
  styleUrls: ['./my-offers.page.scss'],
})
export class MyOffersPage implements OnInit {
  offers: AdvertisementDTO[];

  constructor(private advService: AdvertisementService, private auth: AuthService) { }

  ngOnInit() {
    // this.offers=undefined;
    this.auth.currentUser.subscribe(user => {
      console.log(user);
      this.advService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        var moment= data.filter(el => el.userId == user.uid);
        this.offers=moment;
        console.log(this.offers);
      });
    })
  }
  deleteOffer(car){
    this.advService.delete(car.key);
  }
}
