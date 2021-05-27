import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvertisementDTO, FavListDTO } from '../dto/advertisement-dto';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Offer } from '../dto/view/offer-object';
import { VehicleInformationDto } from '../dto/vehicle-information-dto';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private dbPath = '/offers';
  private dbFavPath = '/favourite';


  advRef: AngularFireList<AdvertisementDTO> = null;
  advFav: AngularFireList<FavListDTO> = null;


  constructor(private db: AngularFireDatabase) {
    this.advRef = db.list(this.dbPath);
    this.advFav = db.list(this.dbFavPath);
  }

  getAll(): AngularFireList<AdvertisementDTO> {
    return this.advRef;
  }

  create(offer: AdvertisementDTO): any {
    return this.advRef.push(offer);
  }

  update(key: string, value: any): Promise<void> {
    return this.advRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.advRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.advRef.remove();
  }

  getFavourites():AngularFireList<FavListDTO> {
    return this.advFav;
  }

  updateFav(list:FavListDTO){
    return this.advFav.update(list.uid,list);
  }
//   getAll():Observable<AdvertisementDTO[]>{
//     return this.httpClient.get<AdvertisementDTO[]>('Advertisement/Collection').pipe(
//       retry(1),
//       catchError(this.errorHandl)
//     );
//     // return [];
//   }
//   getAllOffers():Observable<Offer[]>{
//     return 
//   }

//   getVehicle(id:string):Observable<VehicleInformationDto>{
//     return ;
//   }

//   getUser(id:string):Observable<UserIdentity>{
//     return ;
//   }

//   mapToOffer(obj:AdvertisementDTO):Offer{
//     vehicle:VehicleInformationDto;
//     userInfo:UserIdentity;
//     // this.getVehicle(obj.vehicleId).subscribe(obs=>obs.)
//     // offer:off
//     return
//   }


//   errorHandl(error) {
//     let errorMessage = '';
//     // console.log(JSON.stringify(this.httpOptions));
//     if(error.error instanceof ErrorEvent) {
//       // Get client-side error
//       errorMessage = error.error.message;
//     } else {
//       // Get server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.log(errorMessage);
//     return throwError(errorMessage);
//  }
}
