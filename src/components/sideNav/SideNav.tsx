import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppContext } from '../../App';
import { FullScreenContainer } from '../../theme/GlobalTheme';
import { bookmarkedRoomsRoute } from '../../url/query/bookmarked/room';
import { bookmarkedUnitsRoute } from '../../url/query/bookmarked/unit';
import HorizontalLine from '../accommodation/display/HorizontalLine';
import SlideInFullScreenContainer from '../animation/SideNav';
import { NavLogo } from '../Logo';
import { google } from '../../auth/user';
import { ToastError, ToastInfo } from '../toaser/Toaser';

const SideBarNav = ({
    isSlideIn,
    onClose,
}: Readonly<{
    isSlideIn: boolean;
    onClose: () => void;
}>) => {
    const { user } = React.useContext(AppContext);
    return (
        <SlideInContainer>
            <SlideInFullScreenContainer isSlideIn={isSlideIn} onClick={onClose}>
                <Container>
                    <SideBarBody>
                        <div>
                            <SideLogoContainer>
                                <NavLogo />
                            </SideLogoContainer>
                            <LinkContainer>
                                <Link to="/">
                                    <SideBarBodyButton>
                                        <SideBarBodyButtonText>
                                            Home
                                        </SideBarBodyButtonText>
                                    </SideBarBodyButton>
                                </Link>
                            </LinkContainer>
                            <LinkContainer>
                                <Link to="/about">
                                    <SideBarBodyButton>
                                        <SideBarBodyButtonText>
                                            About
                                        </SideBarBodyButtonText>
                                    </SideBarBodyButton>
                                </Link>
                            </LinkContainer>
                            <LinkContainer>
                                <Link to="/contact">
                                    <SideBarBodyButton>
                                        <SideBarBodyButtonText>
                                            Contact
                                        </SideBarBodyButtonText>
                                    </SideBarBodyButton>
                                </Link>
                            </LinkContainer>
                            <HorizontalLine />
                            {!user ? null : (
                                <>
                                    <LinkContainer>
                                        <Link to={bookmarkedRoomsRoute}>
                                            <SideBarBodyButton>
                                                <SideBarBodyButtonText>
                                                    Bookmarked Rooms
                                                </SideBarBodyButtonText>
                                            </SideBarBodyButton>
                                        </Link>
                                    </LinkContainer>
                                    <HorizontalLine />
                                    <LinkContainer>
                                        <Link to={bookmarkedUnitsRoute}>
                                            <SideBarBodyButton>
                                                <SideBarBodyButtonText>
                                                    Bookmarked Units
                                                </SideBarBodyButtonText>
                                            </SideBarBodyButton>
                                        </Link>
                                    </LinkContainer>
                                    <HorizontalLine />
                                </>
                            )}
                        </div>
                        <div>
                            <HorizontalLine />
                            <LinkContainer>
                                {user ? (
                                    <Link to="/delete">
                                        <SideBarBodyButton>
                                            <SideBarBodyButtonText>
                                                Delete Account
                                            </SideBarBodyButtonText>
                                        </SideBarBodyButton>
                                    </Link>
                                ) : (
                                    <Link to="/auth">
                                        <SideBarBodyButton>
                                            <SideBarBodyButtonText>
                                                Sign Up
                                            </SideBarBodyButtonText>
                                        </SideBarBodyButton>
                                    </Link>
                                )}
                            </LinkContainer>
                            <HorizontalLine />
                            {user ? (
                                <SideBarBodyButton
                                    onClick={async () => {
                                        const response = await google.signOut();
                                        switch (response.type) {
                                            case 'failed':
                                                return ToastError(
                                                    response.error
                                                );
                                            case 'succeed':
                                                return ToastInfo(
                                                    'Sign out succeed'
                                                );
                                        }
                                    }}
                                >
                                    <SideBarBodyButtonText>
                                        Sign Out
                                    </SideBarBodyButtonText>
                                </SideBarBodyButton>
                            ) : (
                                <LinkContainer>
                                    <Link to="/auth">
                                        <SideBarBodyButton>
                                            <SideBarBodyButtonText>
                                                Sign In
                                            </SideBarBodyButtonText>
                                        </SideBarBodyButton>
                                    </Link>
                                </LinkContainer>
                            )}
                        </div>
                    </SideBarBody>
                </Container>
            </SlideInFullScreenContainer>
        </SlideInContainer>
    );
};

const SlideInContainer = styled(FullScreenContainer)`
    z-index: 6;
    background-color: ${({ theme }) => theme.popUpBackground};
`;

const Container = styled.div`
    font-family: Montserrat, sans-serif;
    position: fixed;
    top: 0;
    width: 150px;
    height: 100vh;
    box-shadow: 0px 1px 2px #00000014, 0px 4px 12px #0000000d;
    transition: 0.1s ease-in;
    background-color: ${({ theme }) => theme.primaryColor};
`;

const SideLogoContainer = styled.div`
    width: fit-content;
    padding: 8px;
    margin: 4px;
`;

const SideBarBody = styled.div`
    height: 100%;
    width: 100%;
    grid-gap: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const SideBarBodyButton = styled.div`
    padding: 8px;
    margin: 4px;
    cursor: pointer;
    border-radius: 12px;
    align-items: center;
    &:hover {
        background-color: #f7f7f7;
    }
`;

const SideBarBodyButtonText = styled.div`
    color: ${({ theme }) => theme.secondaryColor};
`;

const LinkContainer = styled.div`
    > a {
        text-decoration: none;
        color: ${({ theme }) => theme.secondaryColor};
    }
`;

export default SideBarNav;
