import * as React from 'react';
import { QueriedUnitDetails } from 'utari-common';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../App';
import { parseAsQueryRoom } from '../../parser/detailed/room';
import { formDetailedQuery } from '../../url/query/detailed/common';
import visitCountAPI from '../../url/mutation/visitCount';
import LeftContainer from '../../components/accommodation/detailed/LeftContainer';
import RightContainer from '../../components/accommodation/detailed/RightContainer';
import { parseAsQueriedUnit } from '../../parser/detailed/unit';
import {
    detailedUnitRoute,
    formDetailedUnitAPIQuery,
} from '../../url/query/detailed/unit';
import DetailedContainer from '../../components/accommodation/detailed/Container';
import { ToastError } from '../../components/toaser/Toaser';
import Title from '../../components/Title';
import utariAxios from '../../config/axios';

type Queried = Readonly<{
    unit: QueriedUnitDetails;
}>;

const DetailedUnit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { search } = location;

    const { user, loadedUser, visitor } = React.useContext(AppContext);

    const [state, setState] = React.useState({
        queried: undefined as Queried | undefined,
        initialLoad: true,
        show: false,
        queryParam: parseAsQueryRoom(new URLSearchParams(search)),
    });

    const { queried, initialLoad, queryParam, show } = state;

    const url = initialLoad ? search : formDetailedQuery(queryParam);

    React.useEffect(() => {
        visitor
            .then(({ visitorId }) => {
                utariAxios
                    .put(visitCountAPI, {
                        data: {
                            visitorId,
                            id: queryParam.id,
                            type: 'Unit',
                        },
                    })
                    .then(() =>
                        setState((prev) => ({
                            ...prev,
                            initialLoad: false,
                        }))
                    )
                    .catch(ToastError);
            })
            .catch(ToastError);
    }, []);

    const query = () =>
        (user?.getIdToken() ?? Promise.resolve(undefined))
            .then((token) =>
                utariAxios
                    .get(
                        formDetailedUnitAPIQuery({
                            ...queryParam,
                            token,
                        })
                    )
                    .then(({ data }) =>
                        setState((prev) => ({
                            ...prev,
                            queried: {
                                ...prev.queried,
                                unit: parseAsQueriedUnit(data.unit),
                            },
                        }))
                    )
                    .catch((error) => {
                        ToastError(error);
                        setState((prev) => ({
                            ...prev,
                            queried: undefined,
                        }));
                    })
            )
            .catch((error) => {
                ToastError(error);
                setState((prev) => ({
                    ...prev,
                    queried: undefined,
                }));
            });

    React.useEffect(() => {
        if (initialLoad || !loadedUser) {
            return;
        }
        navigate(`${detailedUnitRoute}${url}`);
        query();
    }, [url, initialLoad, loadedUser, JSON.stringify(user)]);

    if (!queried) {
        return null;
    }

    const {
        unit: {
            id,
            handler,
            contact,
            location: { address, coordinate },
            facilities,
            remarks: { month, year, remark },
            properties: { rental, bathRooms, bedRooms },
            bookmarked,
            ratings,
            rating,
            visitCount,
        },
    } = queried;

    console.log({ bookmarked });

    return (
        <DetailedContainer
            show={show}
            closePopup={() =>
                setState((prev) => ({
                    ...prev,
                    show: false,
                }))
            }
            coordinate={coordinate}
        >
            <Title
                title="Unit Detailed Info"
                content="View all of the information related to a specific unit listed in UTARi"
            />
            <LeftContainer
                onBookmarkClick={(_, bookmarked) =>
                    setState((prev) => ({
                        ...prev,
                        queried: {
                            ...queried,
                            unit: {
                                ...queried.unit,
                                bookmarked,
                            },
                        },
                    }))
                }
                type="Unit"
                address={address}
                id={id}
                bookmarked={bookmarked}
                facilities={facilities}
                remark={remark}
            />
            <RightContainer
                onRatingGiven={query}
                id={id}
                handler={handler}
                contact={contact}
                rental={rental}
                year={year}
                month={month}
                about={{
                    type: 'Unit',
                    bathRooms,
                    bedRooms,
                }}
                ratings={ratings}
                rating={rating}
                visitCount={visitCount}
            />
        </DetailedContainer>
    );
};

export default DetailedUnit;
