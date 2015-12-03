"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../typings/tsd.d.ts" />
var angular2_1 = require('angular2/angular2');
var LeafletComponent = (function () {
    function LeafletComponent() {
    }
    Object.defineProperty(LeafletComponent.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        set: function (settings) {
            this._settings = settings;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LeafletComponent.prototype, "options", {
        set: function (options) {
            this._options = options;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(LeafletComponent.prototype, "tiledefinition", {
        set: function (tiledefinition) {
            this._tiledefinition = tiledefinition;
        },
        enumerable: true,
        configurable: true
    });
    ;
    LeafletComponent.prototype.onInit = function () {
        L.Icon.Default.imagePath = this.settings.imagePath;
    };
    LeafletComponent.prototype.afterViewInit = function () {
        this.leafletReference = L.map(this.leaflet.nativeElement, this._options);
        this.geoJsonLayer = L.layerGroup().addTo(this.leafletReference);
        L.tileLayer(this._tiledefinition.urlTemplate, this._tiledefinition.options).addTo(this.leafletReference);
    };
    /**
     * Destroy the map to handle the view cache functionality of ng2.After the first init the leaflet is already initialised.
     * See also:
     * https://github.com/angular/angular/issues/4478
     * https://github.com/angular/angular/issues/1618
     */
    LeafletComponent.prototype.onDestroy = function () {
        this.leafletReference.remove();
    };
    LeafletComponent.prototype.addGeoJson = function (geoJson) {
        if (this.geoJsonLayer != null) {
            this.geoJsonLayer.clearLayers();
            this.geoJsonLayer.addLayer(geoJson);
            this.leafletReference.fitBounds(geoJson.getBounds());
        }
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object)
    ], LeafletComponent.prototype, "settings", null);
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], LeafletComponent.prototype, "options", null);
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], LeafletComponent.prototype, "tiledefinition", null);
    LeafletComponent = __decorate([
        angular2_1.Component({
            selector: 'leaflet',
            template: '<div #leaflet id="map"></div>'
        }), 
        __metadata('design:paramtypes', [])
    ], LeafletComponent);
    return LeafletComponent;
})();
exports.LeafletComponent = LeafletComponent;
