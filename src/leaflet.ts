/// <reference path="../typings/tsd.d.ts" />
import { Component, ElementRef, ViewChild, Input } from 'angular2/angular2';

export interface TileLayerDefinition {
    urlTemplate: string;
    options?: L.TileLayerOptions;
}

export interface LeafletSettings {
    imagePath: string;
}

@Component({
	selector: 'leaflet',
    template: '<div #leaflet id="map"></div>'
	
})
export class LeafletComponent {
	// @ViewChild("leaflet")
    private leaflet: ElementRef;	
    private leafletReference: L.Map;
    private geoJsonLayer: L.LayerGroup<L.ILayer>;

    private _settings: LeafletSettings;
    @Input()
    public get settings(): LeafletSettings {
        return this._settings;
    }
    public set settings(settings: LeafletSettings) {
        this._settings = settings;
    };

    private _options: L.Map.MapOptions;
    @Input()
    public set options(options: L.Map.MapOptions) {
        this._options = options;
    };

    private _tiledefinition: TileLayerDefinition;
    @Input()
    public set tiledefinition(tiledefinition: TileLayerDefinition) {
        this._tiledefinition = tiledefinition;
    };

    constructor() {
    }

    public onInit(): void {
        L.Icon.Default.imagePath = this.settings.imagePath;
    }

    public afterViewInit(): void {
        this.leafletReference = L.map(this.leaflet.nativeElement, this._options);
        this.geoJsonLayer = L.layerGroup().addTo(this.leafletReference);

        L.tileLayer(this._tiledefinition.urlTemplate, this._tiledefinition.options).addTo(this.leafletReference);
    }

    /**
     * Destroy the map to handle the view cache functionality of ng2.After the first init the leaflet is already initialised.
     * See also:
     * https://github.com/angular/angular/issues/4478
     * https://github.com/angular/angular/issues/1618
     */
    public onDestroy(): void {
        this.leafletReference.remove();
    }

    public addGeoJson(geoJson: L.GeoJSON): void {
        if (this.geoJsonLayer != null) {
            this.geoJsonLayer.clearLayers();
            this.geoJsonLayer.addLayer(geoJson);

            this.leafletReference.fitBounds(geoJson.getBounds());
        }
    }
}

