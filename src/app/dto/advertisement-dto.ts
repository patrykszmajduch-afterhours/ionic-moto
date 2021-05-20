import { VehicleInformationDto } from "./vehicle-information-dto";

export interface AdvertisementDTO {
    key:string;
    advertisementId: string;
    announcementDate: string;
    title:string
    description:string
    price:number;
    status: boolean;
    voivodeship: string;
    vehicle: VehicleInformationDto;
    userId: number;
    photo:Array<string>;
    
}

export interface FollowingAdvertisementDTO {
    active: boolean;
    userId: string;
    advertisementId: string;
}