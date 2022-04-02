import * as React from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
    Container,
    DropdownAndButtonContainer,
    InnerContainer,
} from '../accommodation/dropdown/Dropdown';
import AuthPopup from '../auth/create/Popup';
import OutsideClickHandlerContainer from '../OutsideClickHandler';
import { AppContext } from '../../App';
import HorizontalLine from '../accommodation/display/HorizontalLine';
import { Link } from 'react-router-dom';
import { github, google, NonNullableUtariUser } from '../../auth/user';
import { ToastError, ToastInfo } from '../toaser/Toaser';
import { bookmarkedUnitsRoute } from '../../url/query/bookmarked/unit';
import { bookmarkedRoomsRoute } from '../../url/query/bookmarked/room';

const AuthIcon = () => {
    const [state, setState] = React.useState({
        isShowDropdown: false,
        isShowPopup: false,
    });

    const { user } = React.useContext(AppContext);

    const { isShowDropdown, isShowPopup } = state;

    const buttonRef = React.createRef<HTMLDivElement>();

    const showPopupCloseDropdown = () =>
        setState((prev) => ({
            ...prev,
            isShowDropdown: false,
            isShowPopup: true,
        }));

    React.useEffect(() => {
        if (isShowPopup) {
            setState((prev) => ({
                ...prev,
                isShowPopup: false,
            }));
        }
    }, [user]);

    const signOut = async (user: NonNullableUtariUser) => {
        const [providerData] = user.providerData;
        if (!providerData) {
            throw new Error(
                'It is impossible for providerData to be undefined'
            );
        }
        const provider = providerData.providerId.replace('.com', '');
        switch (provider) {
            case 'github': {
                const response = await github.signOut();
                return response;
            }
            case 'google': {
                const response = await google.signOut();
                return response;
            }
        }
    };

    return (
        <DropdownAndButtonContainer>
            <LoginContainer
                isMouseEnterAuth={isShowDropdown}
                ref={buttonRef}
                onClick={() =>
                    setState((prev) => ({
                        ...prev,
                        isShowDropdown: !prev.isShowDropdown,
                    }))
                }
            >
                <HambugerMenu />
                {!user ? (
                    <LoginIcon />
                ) : !user.photoURL ? (
                    <LoginIcon />
                ) : (
                    <UserIcon alt="user profile image" src={user.photoURL} />
                )}
            </LoginContainer>
            {!isShowDropdown ? null : (
                <OutsideClickHandlerContainer
                    setFalse={(show) =>
                        setState((prev) => ({
                            ...prev,
                            isShowDropdown: show,
                        }))
                    }
                    buttonRef={buttonRef}
                >
                    <DropdownContainer align="right">
                        <DropdownInnerContainer>
                            {!user ? (
                                <>
                                    <Label onClick={showPopupCloseDropdown}>
                                        Sign up
                                    </Label>
                                    <HorizontalLine />
                                    <Label onClick={showPopupCloseDropdown}>
                                        Sign in
                                    </Label>
                                </>
                            ) : (
                                <>
                                    <Label>
                                        Signed in as{' '}
                                        <BoldDisplayName>
                                            {user.displayName}
                                        </BoldDisplayName>
                                    </Label>
                                    <HorizontalLine />
                                    <LinkContainer>
                                        <Link to={bookmarkedRoomsRoute}>
                                            <LinkLabel>
                                                Bookmarked rooms
                                            </LinkLabel>
                                        </Link>
                                    </LinkContainer>
                                    <LinkContainer>
                                        <Link to={bookmarkedUnitsRoute}>
                                            <LinkLabel>
                                                Bookmarked units
                                            </LinkLabel>
                                        </Link>
                                    </LinkContainer>
                                    <HorizontalLine />
                                    <LinkContainer>
                                        <Link
                                            to="/delete"
                                            onClick={() =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    isShowPopup: false,
                                                    isShowDropdown: false,
                                                }))
                                            }
                                        >
                                            <LinkLabel>
                                                Delete account
                                            </LinkLabel>
                                        </Link>
                                    </LinkContainer>
                                    <HorizontalLine />
                                    <Label
                                        onClick={async () => {
                                            const response = await signOut(
                                                user
                                            );
                                            setState((prev) => ({
                                                ...prev,
                                                isShowDropdown: false,
                                                isShowPopup: false,
                                            }));
                                            if (!response) {
                                                throw new Error(
                                                    'response from sign out is undefiend'
                                                );
                                            }
                                            switch (response.type) {
                                                case 'failed':
                                                    return ToastError(
                                                        response.error
                                                    );
                                                case 'succeed':
                                                    return ToastInfo(
                                                        'Sign out success'
                                                    );
                                            }
                                        }}
                                    >
                                        Sign out
                                    </Label>
                                </>
                            )}
                        </DropdownInnerContainer>
                    </DropdownContainer>
                </OutsideClickHandlerContainer>
            )}
            {!isShowPopup ? null : (
                <AuthPopup
                    closePopup={() =>
                        setState((prev) => ({
                            ...prev,
                            isShowPopup: false,
                        }))
                    }
                />
            )}
        </DropdownAndButtonContainer>
    );
};

const DropdownContainer = styled(Container)`
    width: 160px;
`;

const LoginIcon = styled(FaUserCircle)`
    font-size: 2em;
    color: ${({ theme }) => theme.emptyAuthAndVisitCountIcon};
`;

const UserIcon = styled.img`
    border-radius: 50%;
    height: 29px;
`;

const HambugerMenu = styled(GiHamburgerMenu)`
    margin: 0 8px 0 0;
    color: ${({ theme }) => theme.emptyAuthAndVisitCountIcon};
`;

const LoginContainer = styled.div`
    padding: 3px 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 16px;
    cursor: pointer;
    transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
    &:hover {
        box-shadow: 0px 1px 2px #00000014, 0px 4px 12px #0000000d;
        border: 1px solid ${({ theme }) => theme.secondaryColor};
    }
    border: 1px solid
        ${({
            isMouseEnterAuth,
        }: Readonly<{
            isMouseEnterAuth: boolean;
        }>) =>
            isMouseEnterAuth
                ? ({ theme }) => theme.secondaryColor
                : ({ theme }) => theme.border};
`;

const DropdownInnerContainer = styled(InnerContainer)`
    padding: 8px 0;
`;

const Label = styled.div`
    padding: 4px 8px 4px 16px;
    cursor: pointer;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const BoldDisplayName = styled.div`
    font-weight: 600;
`;

const LinkContainer = styled.div`
    > a {
        text-decoration: none;
        &:focus {
            outline: none;
        }
        color: ${({ theme }) => theme.highEmphasesTextColor};
        width: 100%;
    }
`;

const LinkLabel = styled.div`
    padding: 4px 8px 4px 16px;
    cursor: pointer;
`;

export default AuthIcon;
