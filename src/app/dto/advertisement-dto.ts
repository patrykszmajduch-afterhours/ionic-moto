import { VehicleInformationDto } from "./vehicle-information-dto";

export interface AdvertisementDTO {
    advertisementId: string;
    announcementDate: string;
    status: boolean;
    voivodeship: string;
    vehicle: VehicleInformationDto;
    userId: string;
    photo:string;
}
export interface FollowingAdvertisementDTO {
    active: boolean;
    userId: string;
    advertisementId: string;
}