import * as React from 'react';
import GoogleMapViewer, { Markers } from './GoogleMapViewer';
import { Button } from '../../dropdown/Dropdown';
import SlideFromBottom from '../../../popup/SlideFromBottom';
import styled from 'styled-components';

const MapButton = ({
    isShow,
    markers,
}: Readonly<{
    isShow: boolean;
    markers: Markers;
}>) => {
    const [state, setState] = React.useState({
        isShowMapPopup: false,
    });

    const { isShowMapPopup } = state;

    const mapButtonRef = React.createRef<HTMLDivElement>();

    return !isShow ? null : (
        <>
            <Button
                ref={mapButtonRef}
                onClick={() =>
                    setState((prev) => ({
                        ...prev,
                        isShowMapPopup: !prev.isShowMapPopup,
                    }))
                }
            >
                Map
            </Button>
            <SlideFromBottom
                title="Map"
                isShow={isShow && isShowMapPopup}
                onClosePopup={() =>
                    setState((prev) => ({
                        ...prev,
                        isShowMapPopup: !prev.isShowMapPopup,
                    }))
                }
                buttonRef={mapButtonRef}
                noBorder={false}
            >
                <MapContainer>
                    <GoogleMapViewer
                        marker={{ type: 'array', ...markers }}
                        center={markers.center}
                    />
                </MapContainer>
            </SlideFromBottom>
        </>
    );
};

const MapContainer = styled.div`
    height: 50vh;
`;

export default MapButton;
