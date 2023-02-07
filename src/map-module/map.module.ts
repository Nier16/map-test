import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MapComponent} from './map.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        MapComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    exports: [
        MapComponent
    ],
    bootstrap: [MapComponent]
})
export class MapModule {
}
