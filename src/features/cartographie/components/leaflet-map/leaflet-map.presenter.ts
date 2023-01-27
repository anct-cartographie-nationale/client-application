import { Control, control, map, Map as LeafletMap, TileLayer, tileLayer, ZoomPanOptions } from 'leaflet';
import { CenterView } from '../../presenters';

const TILE_LAYER_TEMPLATE: string = 'https://{s}.basemaps.cartocdn.com/{id}/{z}/{x}/{y}.png';

const ATTRIBUTION: string = '&copy; <a href="https://carto.com/attributions">CARTO</a>';

const MAX_ZOOM: number = 18;

const MIN_ZOOM: number = 2.5;

const TILES_ID: string = 'rastertiles/voyager_labels_under';

const ZOOM_OPTIONS: Control.ZoomOptions = { position: 'bottomright' };

const ANIMATION_DURATION_IN_SECONDS: number = 0.2;

const setTileLayer = (leafletMap: LeafletMap): TileLayer =>
  tileLayer(TILE_LAYER_TEMPLATE, {
    attribution: ATTRIBUTION,
    id: TILES_ID,
    maxZoom: MAX_ZOOM,
    minZoom: MIN_ZOOM
  }).addTo(leafletMap);

const withAnimation = (animate: boolean): ZoomPanOptions =>
  animate
    ? {
        animate: true,
        duration: ANIMATION_DURATION_IN_SECONDS
      }
    : {};

export const flyTo = (leafletMap: LeafletMap, centerView: CenterView, isAnimated: boolean = true): LeafletMap =>
  leafletMap.flyTo(
    {
      lat: centerView.coordinates.latitude,
      lng: centerView.coordinates.longitude
    },
    centerView.zoomLevel,
    { ...withAnimation(isAnimated) }
  );

export const setView = (leafletMap: LeafletMap, centerView: CenterView, isAnimated: boolean = true): LeafletMap =>
  leafletMap.setView(
    {
      lat: centerView.coordinates.latitude,
      lng: centerView.coordinates.longitude
    },
    centerView.zoomLevel,
    { ...withAnimation(isAnimated) }
  );

const setMapInContainer = (mapContainerElement: HTMLElement, centerView: CenterView): LeafletMap =>
  setView(map(mapContainerElement, { zoomControl: false }), centerView, false);

const updateOnResize = (leafletMap: LeafletMap, mapContainerElement: HTMLElement): void => {
  new ResizeObserver((): LeafletMap => leafletMap.invalidateSize()).observe(mapContainerElement);
};

export const initializeMap = (mapContainerElement: HTMLElement, centerView: CenterView, zoomControl: boolean): LeafletMap => {
  const leafletMap: LeafletMap = setMapInContainer(mapContainerElement, centerView);
  setTileLayer(leafletMap);
  zoomControl && control.zoom(ZOOM_OPTIONS).addTo(leafletMap);
  updateOnResize(leafletMap, mapContainerElement);
  return leafletMap;
};
