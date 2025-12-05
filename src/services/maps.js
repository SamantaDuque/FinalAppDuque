// src/services/maps.js
import { AIzaSyAG0c0w6ICk_wWW8pxaorhWAZp4jEYQzU4 } from '@env';


export const getMapPreview = (lat, lng) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}
  &zoom=15&size=600x300&maptype=roadmap
  &markers=color:red%7C${lat},${lng}
  &key=${GOOGLE_MAPS_API_KEY}`;
};


export const getAddressFromCoords = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();

  return data?.results?.[0]?.formatted_address || "Dirección no encontrada";
};


export const getCoordsFromAddress = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.results.length) return null;

  return data.results[0].geometry.location; // { lat, lng }
};
