import * as React from 'react';
import {
    formBookmarkedRoomsQuery,
    formBookmarkedRoomsAPIQuery,
    bookmarkedRoomsRoute,
} from '../../url/query/bookmarked/room';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AppContext } from '../../App';
import { parseAsQueryRooms } from '../../parser/bookmarked/room';
import TopContainer from '../../components/accommodation/display/TopContainer';
import {
    Container,
    QueryContainer,
    QueryInnerContainer,
} from '../../components/accommodation/display/container/Container';
import Title from '../../components/Title';
import RoomDisplayContainer from '../../components/accommodation/display/room/DisplayContainer';
import historyListener from '../../hook/historyListener';
import { parseAsRoomsQueried, RoomsQueried } from '../../parser/parser';
import Query from '../../components/accommodation/query/container/Bookmarked';
import { ToastError } from '../../components/toaser/Toaser';
import utariAxios from '../../config/axios';
import useInitialLoad from '../../hook/initialLoad';

const BookmarkedRoom = () => {
    const { user, loadedUser } = React.useContext(AppContext);

    if (!user) {
        throw new Error(
            'Bookmarked room page can only be accessed after signed up or signed in'
        );
    }

    const navigate = useNavigate();
    const location = useLocation();
    const { search } = location;
    const { initialLoad } = useInitialLoad();

    const history = createBrowserHistory();

    const [state, setState] = React.useState({
        queried: undefined as RoomsQueried | undefined,
        hoveredAccommodationId: undefined as number | undefined,
        shouldNotPush: true,
        queryParam: parseAsQueryRooms(new URLSearchParams(search)),
    });

    const { queried, hoveredAccommodationId, queryParam, shouldNotPush } =
        state;

    const url = initialLoad ? search : formBookmarkedRoomsQuery(queryParam);

    React.useEffect(() => {
        if (initialLoad || !loadedUser) {
            return;
        }
        if (!shouldNotPush) {
            navigate(`${bookmarkedRoomsRoute}${url}`);
        }
        user.getIdToken()
            .then((token) =>
                utariAxios
                    .get(
                        formBookmarkedRoomsAPIQuery({
                            ...queryParam,
                            token,
                        })
                    )
                    .then(({ data }) =>
                        setState((prev) => ({
                            ...prev,
                            shouldNotPush: false,
                            queried: parseAsRoomsQueried(data),
                        }))
                    )
                    .catch((error) => {
                        ToastError(error);
                        setState((prev) => ({
                            ...prev,
                            shouldNotPush: false,
                            queried: undefined,
                        }));
                    })
            )
            .catch((error) => {
                ToastError(error);
                setState((prev) => ({
                    ...prev,
                    shouldNotPush: false,
                    queried: undefined,
                }));
            });
    }, [url, initialLoad, loadedUser, JSON.stringify(user)]);

    React.useEffect(() => {
        return historyListener(
            bookmarkedRoomsRoute,
            (search, shouldNotPush) =>
                setState((prev) => ({
                    ...prev,
                    shouldNotPush,
                    queryParam: parseAsQueryRooms(new URLSearchParams(search)),
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
                title="Bookmarked Rooms"
                content="View all of your bookmarked room with UTARi"
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
                            regions={queryParam.regions}
                            setRegions={(regions) =>
                                setState((prev) => ({
                                    ...prev,
                                    queryParam: {
                                        ...prev.queryParam,
                                        regions,
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
                                type: 'Room',
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
                            isEmpty={!queried.numberOfResultsQueried}
                            apiQuery={async () => {
                                const token = await user.getIdToken();
                                return formBookmarkedRoomsAPIQuery({
                                    ...queryParam,
                                    token,
                                });
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
                                hoveredAccommodationId,
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
                            hoveredAccommodationId: id,
                        }))
                    }
                    onMouseLeave={() =>
                        setState((prev) => ({
                            ...prev,
                            hoveredAccommodationId: undefined,
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
                    hoveredAccommodationId={hoveredAccommodationId}
                    center={queried.center}
                    numberOfAccommodationFound={{
                        type: 'bookmarked',
                    }}
                />
            )}
        </Container>
    );
};

export default BookmarkedRoom;
