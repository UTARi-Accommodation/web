import * as React from 'react';
import {
    Slider,
    Rail,
    Handles,
    Tracks,
    SliderItem,
    GetHandleProps,
    GetTrackProps,
} from 'react-compound-slider';
import { RentalRange } from 'utari-common';
import styled from 'styled-components';

type HandlerContainerProps = Readonly<{ left: number }>;

type TrackContainerProps = HandlerContainerProps &
    Readonly<{
        width: number;
    }>;

const Handle = ({
    domain: { min, max },
    handle: { id, value, percent },
    getHandleProps,
}: Readonly<{
    domain: RentalRange;
    handle: SliderItem;
    getHandleProps: GetHandleProps;
}>) => (
    <HandleComponent
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        left={percent}
        {...getHandleProps(id)}
    />
);

const Track = ({
    source,
    target,
    getTrackProps,
}: Readonly<{
    source: SliderItem;
    target: SliderItem;
    getTrackProps: GetTrackProps;
}>) => (
    <TrackComponent
        width={target.percent - source.percent}
        left={source.percent}
        {...getTrackProps()}
    />
);

const RentalSlider = ({
    rentalSelectedRange: { min, max },
    rentalOriginalRange,
    onUpdate,
    setSliding,
    stepSize,
}: Readonly<{
    rentalSelectedRange: RentalRange;
    rentalOriginalRange: RentalRange;
    onUpdate: (values: ReadonlyArray<number>) => void;
    setSliding: (sliding: boolean) => void;
    stepSize: number;
}>) => (
    <Container>
        <Slider
            mode={2}
            step={stepSize}
            domain={[rentalOriginalRange.min, rentalOriginalRange.max]}
            rootStyle={{
                margin: '5%',
                position: 'relative',
                width: '90%',
            }}
            values={[min, max]}
            onUpdate={onUpdate}
            onSlideStart={() => setSliding(true)}
            onSlideEnd={() => setSliding(false)}
        >
            <Rail>
                {({ getRailProps }) => <RailComponent {...getRailProps()} />}
            </Rail>
            <Handles>
                {({ handles, getHandleProps }) => (
                    <div>
                        {handles.map((handle) => (
                            <Handle
                                key={handle.id}
                                handle={handle}
                                domain={{ min, max }}
                                getHandleProps={getHandleProps}
                            />
                        ))}
                    </div>
                )}
            </Handles>
            <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                    <div>
                        {tracks.map(({ id, source, target }) => (
                            <Track
                                key={id}
                                source={source}
                                target={target}
                                getTrackProps={getTrackProps}
                            />
                        ))}
                    </div>
                )}
            </Tracks>
        </Slider>
    </Container>
);

const Container = styled.div`
    width: 100%;
    padding: 0 0 16px 0;
`;

const HandleComponent = styled.div`
    position: absolute;
    margin: -6px 0 0 -11px;
    z-index: 2;
    padding: 8px;
    cursor: pointer;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.rentalSliderHandler};
    left: ${({ left }: HandlerContainerProps) => `${left}%`};
    border: 1px solid ${({ theme }) => theme.pureWhite};
`;

const SlideComponent = styled.div`
    position: absolute;
    border-radius: 7px;
    padding: 1px;
    cursor: 'pointer';
`;

const TrackComponent = styled(SlideComponent)`
    z-index: 1;
    background-color: ${({ theme }) => theme.rentalSliderTrack};
    left: ${({ left }: TrackContainerProps) => `${left}%`};
    width: ${({ width }: TrackContainerProps) => `${width}%`};
`;

const RailComponent = styled(SlideComponent)`
    width: 100%;
    background-color: ${({ theme }) => theme.rentalSliderRail};
`;

export default RentalSlider;
