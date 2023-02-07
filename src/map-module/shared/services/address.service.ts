import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Address, AddressDetails} from '../models/adresse.model';
import {Observable, map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddressService {
    constructor(private httpClient: HttpClient) {
    }

    getAddressDetails(address: Address) : Observable<AddressDetails>{
        const search = `${address.street} ${address.city} ${address.postalCode} ${address}`;
        return this.httpClient.get<AddressDetails[]>('https://nominatim.openstreetmap.org/search?format=json&q=' + search)
                .pipe(map(addressList => {
                    if(addressList && addressList.length !== 0){
                        return addressList[0];
                    }
                    throw Error('No address found for search : ' + search);
                }));
    }

}
