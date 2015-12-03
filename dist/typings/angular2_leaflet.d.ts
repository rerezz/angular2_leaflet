/// <reference path="../typings/tsd.d.ts" />
export interface TileLayerDefinition {
    urlTemplate: string;
    options?: L.TileLayerOptions;
}
export interface LeafletSettings {
    imagePath: string;
}
export declare class LeafletComponent {
    private leaflet;
    private leafletReference;
    private geoJsonLayer;
    private _settings;
    settings: LeafletSettings;
    private _options;
    options: L.Map.MapOptions;
    private _tiledefinition;
    tiledefinition: TileLayerDefinition;
    constructor();
    onInit(): void;
    afterViewInit(): void;
    /**
     * Destroy the map to handle the view cache functionality of ng2.After the first init the leaflet is already initialised.
     * See also:
     * https://github.com/angular/angular/issues/4478
     * https://github.com/angular/angular/issues/1618
     */
    onDestroy(): void;
    addGeoJson(geoJson: L.GeoJSON): void;
}
