import * as React from 'react';
import AuthCard from './Auth';
import Popup from '../../popup/Popup';

const AuthPopup = ({
    closePopup,
}: Readonly<{
    closePopup: () => void;
}>) => (
    <Popup closePopup={closePopup} title="Sign in or sign up">
        <AuthCard />
    </Popup>
);

export default AuthPopup;
