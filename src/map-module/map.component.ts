import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Browser, Map, map, tileLayer, marker} from 'leaflet';
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

        const isRetina = Browser.retina;
        const baseUrl =
                'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}';
        const retinaUrl =
                'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}';

       /* tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 30
        }).addTo(lefletMap);

        */

        var GeoportailFrance_orthos = tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
            attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
            bounds: [[-75, -180], [81, 180]],
            minZoom: 2,
            maxZoom: 19,
            apikey: 'choisirgeoportail',
            format: 'image/jpeg',
            style: 'normal'
        } as any).addTo(lefletMap);

        /*tileLayer(isRetina ? retinaUrl : baseUrl, {
            attribution:
                    'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
            // This API key is for use only in stackblitz.com
            // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
            // The Geoapify services is free for small projects and the development phase.
            apiKey: this.apiKey,
            maxZoom: 20,
            id: 'osm-bright',
        } as any).addTo(lefletMap);

         */

        marker([initialState.lat, initialState.lng]).addTo(lefletMap);
    }
}
