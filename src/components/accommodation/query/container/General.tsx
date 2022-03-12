import * as React from 'react';
import { Region, RentalFrequencies, RentalRange } from 'utari-common';
import { AppContext } from '../../../../App';
import { convertNameToRegion } from '../../../../util/converter';
import AccommodationTypeDropdown from '../oneOptionDropdown/AccommodationTypeDropdown';
import BookmarkedTypeDropDown from '../oneOptionDropdown/BookmarkedTypeDropdown';
import RegionDropdown from '../oneOptionDropdown/RegionDropdown';
import RentalRangeDropdown from '../RentalRangeDropdown';
import { DropdownSearch } from '../../display/container/Container';
import AccommodationSpecificQuery, {
    AccommodationSpecificQueryProps,
} from './AccomodationSpecificQuery';
import useWindowResize from '../../../../hook/windowResize';
import { Markers } from '../../display/map/GoogleMapViewer';
import MapButton from '../../display/map/Button';

// ref: https://typeofnan.dev/making-every-object-property-nullable-in-typescript/
type Nullable<T> = { [K in keyof T]: T[K] | undefined };

type NullableRentalRange = Nullable<RentalRange>;

const Query = ({
    region,
    setRegion,
    rentalFrequencies,
    selectedRange,
    setRentalFrequencies,
    prop,
    markers,
}: Readonly<{
    region: Region;
    setRegion: (region: Region) => void;
    rentalFrequencies: RentalFrequencies;
    selectedRange: NullableRentalRange;
    setRentalFrequencies: (rentalRange: RentalRange) => void;
    prop: AccommodationSpecificQueryProps;
    markers: Markers;
}>) => {
    const { setRegion: setAppRegion } = React.useContext(AppContext);
    const { type } = prop;
    const { width } = useWindowResize();

    const breakPoint = 800;

    return (
        <DropdownSearch breakPoint={breakPoint}>
            <RentalRangeDropdown
                breakPoint={breakPoint}
                rentalFrequencies={rentalFrequencies}
                selectedRange={selectedRange}
                onSearch={setRentalFrequencies}
            />
            <AccommodationTypeDropdown
                breakPoint={breakPoint}
                value={type}
                onClick={() => setAppRegion(region)}
            />
            <RegionDropdown
                breakPoint={breakPoint}
                region={region}
                onSearch={(regionName) =>
                    setRegion(convertNameToRegion(regionName))
                }
            />
            <AccommodationSpecificQuery breakPoint={breakPoint} prop={prop} />
            <BookmarkedTypeDropDown breakPoint={breakPoint} />
            <MapButton isShow={width <= breakPoint} markers={markers} />
        </DropdownSearch>
    );
};

export type { NullableRentalRange };

export default Query;
