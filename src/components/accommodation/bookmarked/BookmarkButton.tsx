import * as React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import { AccommodationType } from 'utari-common';
import bookmarkedAPI from '../../../url/mutation/bookmarked';
import AuthPopup from '../../auth/create/Popup';
import { AppContext } from '../../../App';
import { ToastError } from '../../toaser/Toaser';
import utariAxios from '../../../config/axios';
import { parseAsBookmarked } from '../../../parser/parser';

type BookmarkButtonProps = Readonly<{
    margin: number;
}>;

type BookmarkButtonClick = (id: number, bookmarked: boolean) => void;

const BookmarkButton = ({
    isBookmarked,
    id,
    type,
    margin,
    onClick,
}: Readonly<{
    isBookmarked: boolean;
    id: number;
    type: AccommodationType;
    onClick: BookmarkButtonClick;
}> &
    BookmarkButtonProps) => {
    const { user } = React.useContext(AppContext);

    const [state, setState] = React.useState({
        isShowPopup: false,
    });

    const { isShowPopup } = state;

    React.useEffect(() => {
        if (isShowPopup) {
            setState((prev) => ({
                ...prev,
                isShowPopup: !user,
            }));
        }
    }, [isShowPopup, JSON.stringify(user)]);

    const BookmarkIcon = isBookmarked
        ? BookmarkedFilledIcon
        : BookmarkOutlineIcon;

    return (
        <>
            <BookmarkIcon
                margin={margin}
                onClick={async () => {
                    if (!user) {
                        setState((prev) => ({
                            ...prev,
                            isShowPopup: true,
                        }));
                    } else {
                        try {
                            if (isBookmarked) {
                                const token = await user.getIdToken();
                                const { data } = await utariAxios.delete(
                                    `${bookmarkedAPI}/?token=${token}&id=${id}&type=${type}`
                                );
                                onClick(id, parseAsBookmarked(data.bookmarked));
                            } else {
                                const token = await user.getIdToken();
                                const { data } = await utariAxios.post(
                                    bookmarkedAPI,
                                    {
                                        data: {
                                            token,
                                            id,
                                            type,
                                        },
                                    }
                                );
                                onClick(id, parseAsBookmarked(data.bookmarked));
                            }
                        } catch (error) {
                            ToastError(error);
                        }
                    }
                }}
            />
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
        </>
    );
};

const BookmarkStyle = css`
    font-size: 1.5em;
    cursor: pointer;
`;

const BookmarkOutlineIcon = styled(AiOutlineHeart)`
    ${BookmarkStyle}
    color: ${({ theme }) => theme.secondaryColor} !important;
    margin: ${({ margin: padding }: BookmarkButtonProps) => `${padding}px`};
`;

const BookmarkedFilledIcon = styled(AiFillHeart)`
    ${BookmarkStyle}
    color: ${({ theme }) => theme.airBnbRed};
    margin: ${({ margin: padding }: BookmarkButtonProps) => `${padding}px`};
`;

export default BookmarkButton;
export type { BookmarkButtonClick };
