import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    readonly address = {
        city: 'Vigneux sur seine',
        country: 'France',
        postalCode: '91270',
        street: '23 rue alphonse daudet'
    };
}
