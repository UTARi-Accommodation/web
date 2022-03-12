import * as React from 'react';
import styled from 'styled-components';
import { Location } from 'utari-common';
import AuthPopup from '../../auth/create/Popup';
import GoogleMapViewer from '../display/map/GoogleMapViewer';
import TitleWithBorder from './TitleWithBorder';

const DetailedContainer = ({
    show,
    closePopup,
    coordinate,
    children,
}: Readonly<{
    show: boolean;
    closePopup: () => void;
    coordinate: Location['coordinate'];
    children: React.ReactNode;
}>) => (
    <Container>
        {!show ? null : <AuthPopup closePopup={closePopup} />}
        <TopContainer>
            <InnerContainer>{children}</InnerContainer>
        </TopContainer>
        <BottomContainer>
            <TitleWithBorder title="This is the approximate location" />
            <MapContainer>
                <GoogleMapViewer
                    marker={{
                        type: 'single',
                        coordinate,
                    }}
                    center={{
                        lat: coordinate.latitude,
                        lng: coordinate.longitude,
                    }}
                />
            </MapContainer>
        </BottomContainer>
    </Container>
);

const Container = styled.div`
    font-family: Montserrat, sans-serif;
    display: grid;
    place-items: center;
    width: 100vw;
    grid-gap: 64px;
    > div {
        width: 75%;
    }
    @media (max-width: 820px) {
        > div {
            width: 85% !important;
        }
    }
`;

const TopContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const BottomContainer = styled.div`
    height: 50vh;
    margin: 16px 0 32px 0;
`;

const MapContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const InnerContainer = styled.div`
    margin: 16px 0 0 0;
    justify-content: space-between;
    display: flex;
    width: 100%;
    grid-gap: 8px;
    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

export default DetailedContainer;
