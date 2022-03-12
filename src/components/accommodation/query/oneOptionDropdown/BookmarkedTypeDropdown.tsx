import * as React from 'react';
import { AppContext } from '../../../../App';
import { bookmarkedRoomsRoute } from '../../../../url/query/bookmarked/room';
import { bookmarkedUnitsRoute } from '../../../../url/query/bookmarked/unit';
import OneOptionDropdown from './Dropdown';

const BookmarkedTypeDropDown = ({
    breakPoint,
}: Readonly<{
    breakPoint: number;
}>) => {
    const { user } = React.useContext(AppContext);
    return !user ? null : (
        <OneOptionDropdown
            title="Accommodation"
            breakPoint={breakPoint}
            value="Bookmarked"
            values={[
                {
                    label: 'Rooms',
                    value: 'Room',
                },
                {
                    label: 'Units',
                    value: 'Unit',
                },
            ]}
            label={{
                type: 'Link',
                toLink: (value) =>
                    value === 'Room'
                        ? bookmarkedRoomsRoute
                        : bookmarkedUnitsRoute,
            }}
        />
    );
};

export default BookmarkedTypeDropDown;
