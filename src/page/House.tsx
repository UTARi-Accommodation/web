import * as React from 'react';
import styled from 'styled-components';
import fontURL from '../util/font/fontURL';
import { houseQuery } from '../util/url/url';
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { parseAsString } from 'parse-dont-validate';

const AccommodationMapMarker = ({
    change,
    latitude,
    longitude,
    rental,
}: Readonly<{
    latitude: number;
    longitude: number;
    rental: number;
    change: boolean;
}>) => {
    const [state, setState] = React.useState({
        change: false,
    });

    const { change: stateChange } = state;

    const setChange = (change: boolean) =>
        setState((prev) => ({
            ...prev,
            change,
        }));

    return (
        <Marker
            position={{
                lat: latitude,
                lng: longitude,
            }}
            cursor="SHIT"
            onMouseOver={() => setChange(true)}
            onMouseOut={() => setChange(false)}
            label={{
                text: `RM ${rental}`,
                color: 'white',
                fontWeight: 'bold',
                className: `label label-${
                    change || stateChange ? 'transformed' : 'untransformed'
                }`,
            }}
            zIndex={change || stateChange ? 99999 : undefined}
            onLoad={(marker) => {
                marker.setIcon({
                    path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
                    fillColor: 'black',
                    fillOpacity: 1,
                    strokeWeight: 1,
                    scale: 1,
                });
                return marker;
            }}
        />
    );
};

const House = () => {
    const API_KEY = process.env.API_KEY;

    const [state, setState] = React.useState({
        region: undefined as string | undefined,
        houses: undefined as Readonly<any> | undefined,
        hoveredAccommodationID: undefined as number | undefined,
    });

    const { houses, region, hoveredAccommodationID } = state;

    React.useEffect(() => {
        fetch(
            houseQuery({
                region: 'BTHO',
                page: undefined,
                rental: undefined,
                address: undefined,
                remark: undefined,
                facilities: undefined,
            })
        )
            .then((res) => res.json())
            .then((json) => {
                const { houses, region } = json;
                setState((prev) => ({
                    ...prev,
                    region,
                    houses,
                }));
            })
            .catch((error) => console.dir(error));
    }, []);

    return (
        <Container>
            <QueryContainer>Query</QueryContainer>
            <DisplayContainer>
                <AccommodationContainer>
                    <link href={fontURL('Roboto', 300)} rel="stylesheet" />
                    <NumberOfAccommodationFounded>
                        {(houses ?? []).length} houses found in {region}
                    </NumberOfAccommodationFounded>
                    {(houses ?? []).map((house: any) => (
                        <AccommodationInfo
                            key={house.id}
                            onMouseEnter={() =>
                                setState((prev) => ({
                                    ...prev,
                                    hoveredAccommodationID: house.id,
                                }))
                            }
                            onMouseLeave={() =>
                                setState((prev) => ({
                                    ...prev,
                                    hoveredAccommodationID: undefined,
                                }))
                            }
                        >
                            <AccommodationPropertiesTop>
                                <AccommodationAddress>
                                    {house.location.address}
                                </AccommodationAddress>
                                <BookmarkIcon />
                            </AccommodationPropertiesTop>
                            <HorizontalLine />
                            <AccommodationProperties>
                                <AccommodationProperty>
                                    {`${house.properties.bathRooms} bath room${
                                        house.properties.bathRooms > 1
                                            ? 's'
                                            : ''
                                    }`}
                                </AccommodationProperty>
                                <AccommodationProperty>
                                    {`${house.properties.bedRooms} bed room${
                                        house.properties.bedRooms > 1 ? 's' : ''
                                    }`}
                                </AccommodationProperty>
                            </AccommodationProperties>
                            <AccommodationProperties>
                                <AccommodationProperty>
                                    {house.facilities}
                                </AccommodationProperty>
                            </AccommodationProperties>
                            <AccommodationProperties>
                                <AccommodationProperty>
                                    Available from
                                    {` ${house.remarks.month.slice(0, 3)} ${
                                        house.remarks.year
                                    }`}
                                </AccommodationProperty>
                            </AccommodationProperties>
                            <AccommodationPropertiesSpaceBetween>
                                <AccommodationRating>
                                    <AccommodationRatingStar />
                                    <AccommodationRatingAverage>
                                        {(
                                            (
                                                house.rating as ReadonlyArray<number>
                                            ).reduce(
                                                (prev, curr) => prev + curr
                                            ) / house.rating.length
                                        ).toFixed(2)}
                                    </AccommodationRatingAverage>
                                    <AccommodationRatingCount>
                                        {`(${house.rating.length} review${
                                            house.properties.bedRooms > 1
                                                ? 's'
                                                : ''
                                        })`}
                                    </AccommodationRatingCount>
                                </AccommodationRating>
                                <AccommodationRental>
                                    RM {house.properties.rental}
                                </AccommodationRental>
                            </AccommodationPropertiesSpaceBetween>
                        </AccommodationInfo>
                    ))}
                </AccommodationContainer>
                <GoogleMapContainer>
                    <LoadScript
                        googleMapsApiKey={parseAsString(
                            API_KEY
                        ).orElseThrowDefault('API_KEY')}
                    >
                        <GoogleMap
                            center={{
                                lat: 3.0357611,
                                lng: 101.7827423,
                            }}
                            zoom={10}
                            options={{ scrollwheel: true }}
                            mapContainerStyle={{
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            {(houses ?? []).map((house: any) => (
                                <AccommodationMapMarker
                                    key={house.id}
                                    latitude={
                                        house.location.coordinate.latitude
                                    }
                                    longitude={
                                        house.location.coordinate.longitude
                                    }
                                    change={house.id === hoveredAccommodationID}
                                    rental={house.properties.rental}
                                />
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </GoogleMapContainer>
            </DisplayContainer>
        </Container>
    );
};

const Container = styled.div`
    font-family: 'Montserrat', sans-serif !important;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    width: 100vw;
`;

const QueryContainer = styled.div`
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const DisplayContainer = styled.div`
    width: 100%;
    height: 100%;
    justify-content: space-between;
    display: flex;
`;

const AccommodationContainer = styled.div`
    width: 100%;
    // background: blue;
    font-family: 'Roboto', sans-serif;
    margin: 0 16px 0 16px;
`;

const NumberOfAccommodationFounded = styled.div`
    padding: 8px 16px;
    margin: 8px 0 8px 0;
    font-style: italic;
`;

const AccommodationInfo = styled.div`
    align-items: start;
    flex-direction: column;
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.primaryColor};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    margin: 0 0 8px 0;
    cursor: pointer;
`;

const AccommodationProperties = styled.div`
    margin: 0 0 8px 0;
    align-items: self;
    display: flex;
    width: 100%;
`;

const AccommodationPropertiesSpaceBetween = styled(AccommodationProperties)`
    justify-content: space-between;
`;

const AccommodationPropertiesTop = styled(AccommodationPropertiesSpaceBetween)`
    margin: 8px 0 16px 0;
    align-items: center;
`;

const HorizontalLine = styled.hr`
    width: 100%;
    align-items: flex-start;
    border: 1px solid ${({ theme }) => theme.border};
`;

const AccommodationAddress = styled.span`
    font-weight: bold;
    font-size: 1.01em;
    color: ${({ theme }) => theme.highEmphasesTextColor};
    flex: 0.75;
`;

const BookmarkIcon = styled(AiOutlineHeart)`
    font-size: 2em;
`;

const AccommodationProperty = styled.span`
    margin: 0 8px 16px 0;
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
    flex: 0.75;
`;

const AccommodationRental = styled.span`
    background-color: ${({ theme }) => theme.unit};
    color: white;
    font-weight: 400;
    padding: 8px 16px;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 8px;
`;

const AccommodationRating = styled.div`
    display: flex;
    margin: 8px 0 0 0;
    > span {
        margin: 0 0 0 8px;
        font-size: 0.85em;
    }
`;

const AccommodationRatingStar = styled(AiFillStar)`
    color: ${({ theme }) => theme.rating};
`;

const AccommodationRatingAverage = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const AccommodationRatingCount = styled.span`
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

const GoogleMapContainer = styled.div`
    width: 100%;
    .label {
        border-radius: 8px;
        padding: 8px 16px;
        transition: all ease 0.5s;
    }
    .label-untransformed {
        background-color: ${({ theme }) => theme.primaryColor};
        color: ${({ theme }) => theme.secondaryColor} !important;
        box-shadow: rgb(0 0 0 / 4%) 0px 0px 0px 1px,
            rgb(0 0 0 / 18%) 0px 2px 4px;
    }
    .label-transformed {
        transform: scale(1.1);
        background-color: ${({ theme }) => theme.secondaryColor};
        color: ${({ theme }) => theme.primaryColor} !important;
    }
`;

export default House;
