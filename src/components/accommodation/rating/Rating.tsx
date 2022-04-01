import * as React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';
import { AccommodationType } from 'utari-common';
import { AppContext } from '../../../App';
import utariAxios from '../../../config/axios';
import ratingAPI from '../../../url/mutation/rating';
import AuthPopup from '../../auth/create/Popup';
import { CloseIcon } from '../../buttons/Close';
import { ToastError } from '../../toaser/Toaser';
import { AccommodationRatingStar } from '../display/AcommodationProperties';

const Rating = ({
    rating,
    id,
    type,
    onRatingGiven,
}: Readonly<{
    rating: number | undefined;
    id: number;
    type: AccommodationType;
    onRatingGiven: () => void;
}>) => {
    const { user } = React.useContext(AppContext);

    const padding = false;

    const [state, setState] = React.useState({
        show: false,
    });

    const { show } = state;

    React.useEffect(() => {
        if (show) {
            setState((prev) => ({
                ...prev,
                show: !user,
            }));
        }
    }, [show, JSON.stringify(user)]);

    return (
        <>
            <Title>
                {!rating ? 'Rate' : 'You rated'} this {type.toLowerCase()}
                {!rating ? null : (
                    <DeleteRatingIcon
                        padding={padding}
                        onClick={() => {
                            if (!user) {
                                throw new Error(
                                    `user cannot be undefined when already sigin-in/up`
                                );
                            }
                            user.getIdToken()
                                .then((token) =>
                                    utariAxios
                                        .delete(
                                            `${ratingAPI}/?token=${token}&id=${id}&type=${type}`
                                        )
                                        .then(onRatingGiven)
                                        .catch(ToastError)
                                )
                                .catch(ToastError);
                        }}
                    />
                )}
            </Title>
            <GiveRatingContainer>
                {Array.from({ length: 5 }, (_, i) => {
                    const rate = i + 1;
                    const Rating =
                        (rating ?? 0) >= rate ? RatingIcon : GiveRatingIcon;
                    return (
                        <Rating
                            key={i}
                            onClick={() => {
                                if (!user) {
                                    setState((prev) => ({
                                        ...prev,
                                        show: true,
                                    }));
                                } else {
                                    user.getIdToken()
                                        .then((token) =>
                                            utariAxios
                                                .put(ratingAPI, {
                                                    data: {
                                                        token,
                                                        id,
                                                        type,
                                                        rating: rate,
                                                    },
                                                })
                                                .then(onRatingGiven)
                                                .catch(ToastError)
                                        )
                                        .catch(ToastError);
                                }
                            }}
                        />
                    );
                })}
            </GiveRatingContainer>
            {!show ? null : (
                <AuthPopup
                    closePopup={() =>
                        setState((prev) => ({
                            ...prev,
                            show: false,
                        }))
                    }
                />
            )}
        </>
    );
};

const Title = styled.div`
    font-size: 1.1em;
    color: ${({ theme }) => theme.highEmphasesTextColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const GiveRatingContainer = styled.div`
    display: flex;
    align-items: center;
    grid-gap: 8px;
`;

const RatingIcon = styled(AccommodationRatingStar)`
    font-size: 1.1em !important;
    cursor: pointer;
`;

const GiveRatingIcon = styled(AiOutlineStar)`
    font-size: 1.1em !important;
    cursor: pointer;
`;

const DeleteRatingIcon = styled(CloseIcon)`
    font-size: 1.2em;
`;

export { RatingIcon };

export default Rating;
