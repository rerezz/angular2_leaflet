/// <reference path="../typings/tsd.d.ts" />
import { Component, ElementRef, ViewChild } from 'angular2/angular2';

@Component({
	selector: 'leaflet',
    template: '<div #leaflet id="map"></div>'
	
})
export class LeafletComponent {
	// @ViewChild("leaflet")
    private leaflet: ElementRef;
	
	public helloWorld(): void {
		console.log("hello world");		
	}
}

