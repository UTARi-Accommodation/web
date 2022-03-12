import * as React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';
import { AccommodationType } from 'utari-common';
import { AppContext } from '../../../App';
import utariAxios from '../../../config/axios';
import ratingAPI from '../../../url/mutation/rating';
import AuthPopup from '../../auth/create/Popup';
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
                {rating ? 'Your rated' : 'Rate'} this {type.toLowerCase()}
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
                                                    token,
                                                    id,
                                                    type,
                                                    rating: rate,
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

export { RatingIcon };

export default Rating;
