import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Map, map, tileLayer, marker} from 'leaflet';
import {AddressService} from "./shared/services/address.service";
import {Address} from "./shared/models/adresse.model";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges, AfterViewInit {
    @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;
    @Input('address') address!: Address;
    @Input('apiKey') apiKey!: string;
    @Input('zoom') zoom: number = 19;

    constructor(private addressService: AddressService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.address || !this.apiKey) {
            throw Error('You must chose an address and provide API_KEY');
        }
        this.recalculate();
    }

    ngAfterViewInit() {
        this.recalculate();
    }


    recalculate() {
        if (this.mapContainer && this.address && this.apiKey) {
            this.addressService.getAddressDetailsGouv(this.address).subscribe(addressDetails => {
                this.initMap(addressDetails.lon, addressDetails.lat, this.zoom);
            });
        }
    }

    initMap(lng: number, lat: number, zoom: number) {
        const initialState = {lng, lat, zoom};

        const lefletMap: Map = map(this.mapContainer.nativeElement).setView(
                [initialState.lat, initialState.lng],
                initialState.zoom
        );

        tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
            attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
            bounds: [[-75, -180], [81, 180]],
            minZoom: 2,
            maxZoom: 19,
            apikey: 'choisirgeoportail',
            format: 'image/jpeg',
            style: 'normal'
        } as any).addTo(lefletMap);

        marker([initialState.lat, initialState.lng]).addTo(lefletMap);
    }
}
