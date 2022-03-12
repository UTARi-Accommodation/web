import * as React from 'react';
import DeleteCard from './Delete';
import Popup from '../../popup/Popup';

const DeletePopup = ({
    closePopup,
}: Readonly<{
    closePopup: () => void;
}>) => (
    <Popup closePopup={closePopup} title="Delete account">
        <DeleteCard />
    </Popup>
);

export default DeletePopup;
