import { UserIdentity } from "../user-identity";
import { VehicleInformationDto } from "../vehicle-information-dto";

export interface Offer{
    advId:string;
    date:Date;
    voivodeship:string;
    vehicle:VehicleInformationDto;
    user:UserIdentity;
}