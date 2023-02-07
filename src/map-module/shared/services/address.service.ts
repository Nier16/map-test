import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address, AddressDetails, AddressMinimalDetails} from '../models/adresse.model';
import {Observable, map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddressService {
    constructor(private httpClient: HttpClient) {
    }

    getAddressDetails(address: Address) : Observable<AddressMinimalDetails>{
        const search = `${address.street} ${address.city} ${address.postalCode} ${address.country}`;
        return this.httpClient.get<AddressDetails[]>('https://nominatim.openstreetmap.org/search?format=json&q=' + search)
                .pipe(map(addressList => {
                    if(addressList && addressList.length !== 0){
                        return addressList[0];
                    }
                    throw Error('No address found for search : ' + search);
                }));
    }

    getAddressDetailsGeoApify(address: Address) : Observable<AddressMinimalDetails>{
        const search = `${address.street} ${address.city} ${address.postalCode} ${address.country}`;
        return this.httpClient.get<any>('https://api.geoapify.com/v1/geocode/search?apiKey=bbb68c376a6047818a933542a26a4eea&text=' + search)
                .pipe(map(res => {
                    if(res && res.features && res.features.length !== 0){
                        return {lat: res.features[0].properties.lat, lon: res.features[0].properties.lon};
                    }
                    throw Error('No address found for search : ' + search);
                }));
    }


    getAddressDetailsGouv(address: Address) : Observable<AddressMinimalDetails>{
        const search = `${address.street} ${address.city} ${address.postalCode} ${address.country}`;
        return this.httpClient.get<any>('https://api-adresse.data.gouv.fr/search/?q=' + search)
                .pipe(map(res => {
                    if(res && res.features && res.features.length !== 0){
                        return {lat: res.features[0].geometry.coordinates[1], lon: res.features[0].geometry.coordinates[0]};
                    }
                    throw Error('No address found for search : ' + search);
                }));
    }

}
