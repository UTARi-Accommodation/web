import * as React from 'react';
import { RoomType } from 'utari-common';
import {
    formGeneralRoomsQuery,
    formGeneralRoomsAPIQuery,
    roomsRoute,
    roommatesRoute,
} from '../../url/query/general/room';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AppContext } from '../../App';
import { parseAsQueryRooms } from '../../parser/general/room';
import TopContainer from '../../components/accommodation/display/TopContainer';
import {
    Container,
    QueryContainer,
    QueryInnerContainer,
} from '../../components/accommodation/display/container/Container';
import Title from '../../components/Title';
import RoomDisplayContainer from '../../components/accommodation/display/room/DisplayContainer';
import { parseAsRoomsQueried, RoomsQueried } from '../../parser/parser';
import Query from '../../components/accommodation/query/container/General';
import { ToastError } from '../../components/toaser/Toaser';
import utariAxios from '../../config/axios';
import useInitialLoad from '../../hook/initialLoad';
import historyListener from '../../hook/historyListener';

const Room = ({
    roomType,
}: Readonly<{
    roomType: RoomType;
}>) => {
    const { user, region, loadedUser } = React.useContext(AppContext);

    const navigate = useNavigate();
    const location = useLocation();
    const { search } = location;
    const { initialLoad } = useInitialLoad();

    const history = createBrowserHistory();

    const properPathname = roomType === 'Room' ? roomsRoute : roommatesRoute;

    const [state, setState] = React.useState({
        queried: undefined as RoomsQueried | undefined,
        hoveredAccommodationID: undefined as number | undefined,
        shouldNotPush: true,
        queryParam: parseAsQueryRooms(new URLSearchParams(search), {
            region,
            roomType,
        }),
    });

    const { queried, hoveredAccommodationID, queryParam, shouldNotPush } =
        state;

    const url = initialLoad ? search : formGeneralRoomsQuery(queryParam);

    const query = () =>
        (user?.getIdToken() ?? Promise.resolve(undefined))
            .then((token) =>
                utariAxios
                    .get(
                        formGeneralRoomsAPIQuery({
                            ...queryParam,
                            token,
                        })
                    )
                    .then(({ data }) =>
                        setState((prev) => ({
                            ...prev,
                            queried: parseAsRoomsQueried(data),
                            shouldNotPush: false,
                        }))
                    )
                    .catch((error) => {
                        ToastError(error);
                        setState((prev) => ({
                            ...prev,
                            queried: undefined,
                            shouldNotPush: false,
                        }));
                    })
            )
            .catch((error) => {
                ToastError(error);
                setState((prev) => ({
                    ...prev,
                    queried: undefined,
                    shouldNotPush: false,
                }));
            });

    React.useEffect(() => {
        if (initialLoad || !loadedUser) {
            return;
        }
        if (!shouldNotPush) {
            navigate(`${properPathname}${url}`);
        }
        query();
    }, [url, initialLoad, loadedUser, JSON.stringify(user)]);

    React.useEffect(() => {
        return historyListener(
            properPathname,
            (search, shouldNotPush) =>
                setState((prev) => ({
                    ...prev,
                    shouldNotPush,
                    queryParam: parseAsQueryRooms(new URLSearchParams(search), {
                        region,
                        roomType,
                    }),
                })),
            history
        );
    }, []);

    const paginateQuery = (page: number) =>
        setState((prev) => ({
            ...prev,
            queryParam: {
                ...prev.queryParam,
                page,
            },
        }));

    return (
        <Container>
            <Title
                title={roomType === 'Room' ? 'Room' : 'Find Roommate'}
                content={`Search for ${roomType} around UTAR campus with UTARi`}
            />
            <QueryContainer>
                <QueryInnerContainer>
                    <TopContainer
                        prompt="Rooms"
                        search={queryParam.search}
                        onSearch={(search) =>
                            setState((prev) => ({
                                ...prev,
                                queryParam: {
                                    ...prev.queryParam,
                                    search,
                                    page: 1,
                                },
                            }))
                        }
                    />
                    {!queried ? null : (
                        <Query
                            region={queryParam.region}
                            setRegion={(region) =>
                                setState((prev) => ({
                                    ...prev,
                                    queryParam: {
                                        ...prev.queryParam,
                                        region,
                                        page: 1,
                                    },
                                }))
                            }
                            rentalFrequencies={queried.rentalRangeFrequencies}
                            selectedRange={{
                                min:
                                    queryParam.minRental ??
                                    queried.rentalRangeFrequencies[0]?.[0],
                                max:
                                    queryParam.maxRental ??
                                    queried.rentalRangeFrequencies[
                                        queried.rentalRangeFrequencies.length -
                                            1
                                    ]?.[0],
                            }}
                            setRentalFrequencies={({ min, max }) =>
                                setState((prev) => ({
                                    ...prev,
                                    queryParam: {
                                        ...prev.queryParam,
                                        minRental: min,
                                        maxRental: max,
                                        page: 1,
                                    },
                                }))
                            }
                            prop={{
                                type: roomType,
                                queriedCapacities: queried.capacities,
                                queryCapacities: queryParam.capacities,
                                setCapacities: (capacities) => {
                                    setState((prev) => ({
                                        ...prev,
                                        queryParam: {
                                            ...prev.queryParam,
                                            capacities,
                                            page: 1,
                                        },
                                    }));
                                },
                            }}
                            markers={{
                                mapMarkerArrayProps: queried.rooms.map(
                                    ({
                                        id,
                                        location: { coordinate },
                                        properties: { rental },
                                    }) => ({
                                        id,
                                        coordinate,
                                        rental,
                                    })
                                ),
                                hoveredAccommodationID,
                                center: queried.center,
                                link: 'Room',
                            }}
                        />
                    )}
                </QueryInnerContainer>
            </QueryContainer>
            {!queried ? null : (
                <RoomDisplayContainer
                    rooms={queried.rooms}
                    numberOfResultsQueried={queried.numberOfResultsQueried}
                    onMouseEnter={(id) =>
                        setState((prev) => ({
                            ...prev,
                            hoveredAccommodationID: id,
                        }))
                    }
                    onMouseLeave={() =>
                        setState((prev) => ({
                            ...prev,
                            hoveredAccommodationID: undefined,
                        }))
                    }
                    onBookmarkButtonClick={(id, bookmarked) =>
                        setState((prev) => ({
                            ...prev,
                            queried: {
                                ...queried,
                                rooms: queried.rooms.map((room) =>
                                    room.id !== id
                                        ? room
                                        : {
                                              ...room,
                                              bookmarked,
                                          }
                                ),
                            },
                        }))
                    }
                    paginateQuery={paginateQuery}
                    totalPage={queried.totalPage}
                    page={queried.page}
                    hoveredAccommodationID={hoveredAccommodationID}
                    center={queried.center}
                    numberOfAccommodationFound={{
                        type: 'general',
                        region: queryParam.region,
                    }}
                />
            )}
        </Container>
    );
};

const Roommate = () => <Room roomType="Roommate" />;
const R = () => <Room roomType="Room" />;

export { Roommate, R as Room };
