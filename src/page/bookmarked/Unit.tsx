import * as React from 'react';
import {
    formBookmarkedUnitsQuery,
    formBookmarkedUnitsAPIQuery,
    bookmarkedUnitsRoute,
} from '../../url/query/bookmarked/unit';
import { parseAsQueryUnits } from '../../parser/bookmarked/unit';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AppContext } from '../../App';
import TopContainer from '../../components/accommodation/display/TopContainer';
import {
    Container,
    QueryContainer,
    QueryInnerContainer,
} from '../../components/accommodation/display/container/Container';
import Title from '../../components/Title';
import UnitDisplayContainer from '../../components/accommodation/display/unit/DisplayContainer';
import historyListener from '../../hook/historyListener';
import { parseAsUnitsQueried, UnitsQueried } from '../../parser/parser';
import Query from '../../components/accommodation/query/container/Bookmarked';
import { ToastError } from '../../components/toaser/Toaser';
import utariAxios from '../../config/axios';
import useInitialLoad from '../../hook/initialLoad';

const UnitBookmarked = () => {
    const { user, loadedUser } = React.useContext(AppContext);

    if (!user) {
        throw new Error(
            'Bookmarked unit page can only be accessed after signed up or signed in'
        );
    }

    const navigate = useNavigate();
    const location = useLocation();
    const { search } = location;
    const { initialLoad } = useInitialLoad();

    const history = createBrowserHistory();

    const [state, setState] = React.useState({
        queried: undefined as UnitsQueried | undefined,
        isPop: false,
        hoveredAccommodationID: undefined as number | undefined,
        queryParam: parseAsQueryUnits(new URLSearchParams(search)),
    });

    const { queried, hoveredAccommodationID, queryParam, isPop } = state;

    const url = initialLoad ? search : formBookmarkedUnitsQuery(queryParam);

    React.useEffect(() => {
        if (initialLoad || !loadedUser) {
            return;
        }
        if (!isPop) {
            navigate(`${bookmarkedUnitsRoute}${url}`);
        }
        user.getIdToken()
            .then((token) =>
                utariAxios
                    .get(
                        formBookmarkedUnitsAPIQuery({
                            ...queryParam,
                            token,
                        })
                    )
                    .then(({ data }) =>
                        setState((prev) => ({
                            ...prev,
                            queried: parseAsUnitsQueried(data),
                            isPop: false,
                        }))
                    )
                    .catch((error) => {
                        ToastError(error);
                        setState((prev) => ({
                            ...prev,
                            queried: undefined,
                            isPop: false,
                        }));
                    })
            )
            .catch((error) => {
                ToastError(error);
                setState((prev) => ({
                    ...prev,
                    queried: undefined,
                    isPop: false,
                }));
            });
    }, [url, initialLoad, loadedUser, JSON.stringify(user)]);

    React.useEffect(() => {
        return historyListener(
            bookmarkedUnitsRoute,
            (search, isPop) =>
                setState((prev) => ({
                    ...prev,
                    isPop,
                    queryParam: parseAsQueryUnits(new URLSearchParams(search)),
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
                title="Bookmarked Units"
                content="View all of your bookmarked unit with UTARi"
            />
            <QueryContainer>
                <QueryInnerContainer>
                    <TopContainer
                        prompt="Units"
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
                            setRegions={(region) =>
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
                                type: 'Unit',
                                queriedBedRooms: queried.bedRooms,
                                queryBedRooms: queryParam.bedRooms,
                                setBedRooms: (bedRooms) => {
                                    setState((prev) => ({
                                        ...prev,
                                        queryParam: {
                                            ...prev.queryParam,
                                            bedRooms,
                                            page: 1,
                                        },
                                    }));
                                },
                                queriedBathRooms: queried.bathRooms,
                                queryBathRooms: queryParam.bathRooms,
                                setBathRooms: (bathRooms) => {
                                    setState((prev) => ({
                                        ...prev,
                                        queryParam: {
                                            ...prev.queryParam,
                                            bathRooms,
                                            page: 1,
                                        },
                                    }));
                                },
                            }}
                            isEmpty={!queried.numberOfResultsQueried}
                            apiQuery={async () => {
                                const token = await user.getIdToken();
                                return formBookmarkedUnitsAPIQuery({
                                    ...queryParam,
                                    token,
                                });
                            }}
                            markers={{
                                mapMarkerArrayProps: queried.units.map(
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
                            }}
                        />
                    )}
                </QueryInnerContainer>
            </QueryContainer>
            {!queried ? null : (
                <UnitDisplayContainer
                    units={queried.units}
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
                                units: queried.units.map((unit) =>
                                    unit.id !== id
                                        ? unit
                                        : {
                                              ...unit,
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
                        type: 'bookmarked',
                    }}
                />
            )}
        </Container>
    );
};

export default UnitBookmarked;
