import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address, AddressMinimalDetails} from '../models/adresse.model';
import {Observable, map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddressService {
    constructor(private httpClient: HttpClient) {
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
