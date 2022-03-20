import * as React from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';
import styled from 'styled-components';
import { Location, Center, AccommodationType } from 'utari-common';
import { DefaultMapMarker, MapMarker } from './MapMarker';
import { parseAsString } from 'parse-dont-validate';

type MarkerArray = Readonly<{
    type: 'array';
    mapMarkerArrayProps: ReadonlyArray<{
        coordinate: Location['coordinate'];
        rental: number;
        id: number;
    }>;
    hoveredAccommodationID: number | undefined;
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
}>) => (
    <GoogleMapContainer>
        <LoadScript
            googleMapsApiKey={parseAsString(
                process.env.MAPS_API_KEY
            ).orElseThrowDefault('apiKey')}
        >
            <GoogleMap
                center={center}
                zoom={marker.type === 'single' ? 16 : 14}
                options={{ scrollwheel: true }}
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
                                change={id === marker.hoveredAccommodationID}
                                rental={rental}
                            />
                        )
                    )
                )}
            </GoogleMap>
        </LoadScript>
    </GoogleMapContainer>
);

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
