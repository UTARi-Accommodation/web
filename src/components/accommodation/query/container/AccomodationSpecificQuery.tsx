import * as React from 'react';
import { MultiSelectNumber, RoomType, UnitType } from 'utari-common';
import MultiSelectDropdown from '../multiSelectDropdown/Dropdown';

type AccommodationSpecificQueryProps = Readonly<
    | {
          type: UnitType | 'Unit';
          queriedBathRooms: MultiSelectNumber;
          queryBathRooms: MultiSelectNumber;
          setBathRooms: (bathRooms: MultiSelectNumber) => void;
          queriedBedRooms: MultiSelectNumber;
          queryBedRooms: MultiSelectNumber;
          setBedRooms: (bedRooms: MultiSelectNumber) => void;
      }
    | {
          type: RoomType;
          queriedCapacities: MultiSelectNumber;
          queryCapacities: MultiSelectNumber;
          setCapacities: (capacities: MultiSelectNumber) => void;
      }
>;

const AccommodationSpecificQuery = ({
    prop,
    breakPoint,
}: Readonly<{
    prop: AccommodationSpecificQueryProps;
    breakPoint: number;
}>) => {
    const { type } = prop;
    switch (type) {
        case 'Room':
        case 'Roommate':
            return (
                <MultiSelectDropdown
                    title="Room Capacities"
                    breakPoint={breakPoint}
                    values={prop.queriedCapacities}
                    label={{
                        type: 'room',
                        text: 'Room Capacities',
                    }}
                    selectedValues={prop.queryCapacities}
                    onSearch={prop.setCapacities}
                />
            );
        case 'Condominium':
        case 'House':
        case 'Unit':
            return (
                <>
                    <MultiSelectDropdown
                        title="Bed Rooms"
                        breakPoint={breakPoint}
                        values={prop.queriedBedRooms}
                        label={{
                            type: 'unit',
                            text: 'Bed Rooms',
                        }}
                        selectedValues={prop.queryBedRooms}
                        onSearch={prop.setBedRooms}
                    />
                    <MultiSelectDropdown
                        title="Bath Rooms"
                        breakPoint={breakPoint}
                        values={prop.queriedBathRooms}
                        label={{
                            type: 'unit',
                            text: 'Bath Rooms',
                        }}
                        selectedValues={prop.queryBathRooms}
                        onSearch={prop.setBathRooms}
                    />
                </>
            );
    }
};

export type { AccommodationSpecificQueryProps };

export default AccommodationSpecificQuery;
