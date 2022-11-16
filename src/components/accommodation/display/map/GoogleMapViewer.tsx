import * as React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import styled from 'styled-components';
import { Location, Center, AccommodationType } from 'utari-common';
import { DefaultMapMarker, MapMarker } from './MapMarker';
import { AppContext } from '../../../../App';
import { parseAsStringEnv } from '../../../../util/converter';

type MarkerArray = Readonly<{
    type: 'array';
    mapMarkerArrayProps: ReadonlyArray<{
        coordinate: Location['coordinate'];
        rental: number;
        id: number;
    }>;
    hoveredAccommodationId: number | undefined;
    link: AccommodationType;
}>;

type Markers = Omit<MarkerArray, 'type'> &
    Readonly<{
        center: Center;
    }>;

const GoogleMapViewer = ({
    marker,
    center,
}: Readonly<{
    marker:
        | MarkerArray
        | Readonly<{
              type: 'single';
              coordinate: Location['coordinate'];
          }>;
    center: Center;
}>) => {
    const { isDark } = React.useContext(AppContext);

    return (
        <GoogleMapContainer>
            <LoadScript
                googleMapsApiKey={parseAsStringEnv({
                    name: 'MAPS_API_KEY',
                    env: process.env.MAPS_API_KEY,
                })}
            >
                <GoogleMap
                    center={center}
                    zoom={marker.type === 'single' ? 16 : 14}
                    options={{
                        scrollwheel: true,
                        styles: !isDark
                            ? undefined
                            : [
                                  {
                                      elementType: 'geometry',
                                      stylers: [{ color: '#242F3E' }],
                                  },
                                  {
                                      elementType: 'labels.text.stroke',
                                      stylers: [{ color: '#242F3E' }],
                                  },
                                  {
                                      elementType: 'labels.text.fill',
                                      stylers: [{ color: '#746855' }],
                                  },
                                  {
                                      featureType: 'administrative.locality',
                                      elementType: 'labels.text.fill',
                                      stylers: [{ color: '#D59563' }],
                                  },
                                  {
                                      featureType: 'poi',
                                      elementType: 'labels.text.fill',
                                      stylers: [{ color: '#D59563' }],
                                  },
                                  {
                                      featureType: 'poi.park',
                                      elementType: 'geometry',
                                      stylers: [{ color: '#263C3F' }],
                                  },
                                  {
                                      featureType: 'poi.park',
                                      elementType: 'labels.text.fill',
                                      stylers: [{ color: '#6B9A76' }],
                                  },
                                  {
                                      featureType: 'road',
                                      elementType: 'geometry',
                                      stylers: [{ color: '#38414E' }],
                                  },
                                  {
                                      featureType: 'road',
                                      elementType: 'geometry.stroke',
                                      stylers: [{ color: '#212A37' }],
                                  },
                                  {
                                      featureType: 'road',
                                      elementType: 'labels.text.fill',
                                      stylers: [{ color: '#9CA5B3' }],
                                  },
                                  {
                                      featureType: 'road.highway',
                                      elementType: 'geometry',
                                      stylers: [{ color: '#746855' }],
                                  },
                                  {
                                      featureType: 'road.highway',
                                      elementType: 'geometry.stroke',
                                      stylers: [{ color: '#1F2835' }],
                                  },
                                  {
                                      featureType: 'road.highway',
                                      elementType: 'labels.text.fill',
                                      stylers: [{ color: '#F3D19C' }],
                                  },
                                  {
                                      featureType: 'transit',
                                      elementType: 'geometry',
                                      stylers: [{ color: '#2F3948' }],
                                  },
                                  {
                                      featureType: 'transit.station',
                                      elementType: 'labels.text.fill',
                                      stylers: [{ color: '#D59563' }],
                                  },
                                  {
                                      featureType: 'water',
                                      elementType: 'geometry',
                                      stylers: [{ color: '#17263C' }],
                                  },
                                  {
                                      featureType: 'water',
                                      elementType: 'labels.text.fill',
                                      stylers: [{ color: '#515C6D' }],
                                  },
                                  {
                                      featureType: 'water',
                                      elementType: 'labels.text.stroke',
                                      stylers: [{ color: '#17263C' }],
                                  },
                              ],
                    }}
                    mapContainerStyle={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {marker.type === 'single' ? (
                        <DefaultMapMarker
                            latitude={marker.coordinate.latitude}
                            longitude={marker.coordinate.longitude}
                        />
                    ) : (
                        marker.mapMarkerArrayProps.map(
                            ({
                                id,
                                coordinate: { latitude, longitude },
                                rental,
                            }) => (
                                <MapMarker
                                    id={id}
                                    key={id}
                                    link={marker.link}
                                    latitude={latitude}
                                    longitude={longitude}
                                    change={
                                        id === marker.hoveredAccommodationId
                                    }
                                    rental={rental}
                                />
                            )
                        )
                    )}
                </GoogleMap>
            </LoadScript>
        </GoogleMapContainer>
    );
};

const GoogleMapContainer = styled.div`
    width: 100%;
    height: 100%;
    .label {
        border-radius: 8px;
        padding: 8px 16px;
        transition: all ease 0.5s;
    }
    .label-untransformed {
        background-color: ${({ theme }) => theme.primaryColor};
        color: ${({ theme }) => theme.secondaryColor} !important;
        box-shadow: #0000000a 0px 0px 0px 1px, #0000002e 0px 2px 4px;
    }
    .label-transformed {
        transform: scale(1.1);
        background-color: ${({ theme }) => theme.secondaryColor};
        color: ${({ theme }) => theme.primaryColor} !important;
    }
`;

export default GoogleMapViewer;
export type { Markers };
