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
    this.offers=undefined;
    this.auth.currentUser.subscribe(user => {
      this.advService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.offers = data.filter(el => el.userId === user.uid);
        console.log(data)
      });
    })
  }

}
