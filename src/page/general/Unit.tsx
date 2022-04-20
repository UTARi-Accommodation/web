import * as React from 'react';
import { UnitType } from 'utari-common';
import {
    formGeneralUnitsQuery,
    formGeneralUnitsAPIQuery,
    housesRoute,
    condominiumsRoute,
} from '../../url/query/general/unit';
import { parseAsQueryUnits } from '../../parser/general/unit';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AppContext } from '../../App';
import TopContainer from '../../components/accommodation/display/TopContainer';
import {
    Container,
    QueryContainer,
    QueryInnerContainer,
} from '../../components/accommodation/display/container/Container';
import Title from '../../components/common/Title';
import UnitDisplayContainer from '../../components/accommodation/display/unit/DisplayContainer';
import historyListener from '../../hook/historyListener';
import { parseAsUnitsQueried, UnitsQueried } from '../../parser/parser';
import Query from '../../components/accommodation/query/container/General';
import { ToastError } from '../../components/toaser/Toaser';
import utariAxios from '../../config/axios';
import useInitialLoad from '../../hook/initialLoad';

const Unit = ({
    unitType,
}: Readonly<{
    unitType: UnitType;
}>) => {
    const { user, region, loadedUser } = React.useContext(AppContext);

    const navigate = useNavigate();
    const location = useLocation();
    const { search } = location;
    const { initialLoad } = useInitialLoad();

    const history = createBrowserHistory();

    const properPathname =
        unitType === 'House' ? housesRoute : condominiumsRoute;

    const [state, setState] = React.useState({
        queried: undefined as UnitsQueried | undefined,
        hoveredAccommodationId: undefined as number | undefined,
        shouldNotPush: true,
        queryParam: parseAsQueryUnits(new URLSearchParams(search), {
            region,
            unitType,
        }),
    });

    const { queried, hoveredAccommodationId, queryParam, shouldNotPush } =
        state;

    const url = initialLoad ? search : formGeneralUnitsQuery(queryParam);

    const query = () =>
        (user?.getIdToken() ?? Promise.resolve(undefined))
            .then((token) =>
                utariAxios
                    .get(
                        formGeneralUnitsAPIQuery({
                            ...queryParam,
                            token,
                        })
                    )
                    .then(({ data }) =>
                        setState((prev) => ({
                            ...prev,
                            queried: parseAsUnitsQueried(data),
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
        setState((prev) => ({
            ...prev,
            queryParam: {
                ...prev.queryParam,
                unitType,
            },
        }));
    }, [unitType]);

    React.useEffect(() => {
        setState((prev) => ({
            ...prev,
            initialLoad: false,
        }));
        return historyListener(
            properPathname,
            (search, shouldNotPush) =>
                setState((prev) => ({
                    ...prev,
                    shouldNotPush,
                    queryParam: parseAsQueryUnits(new URLSearchParams(search), {
                        region,
                        unitType,
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
                title={unitType}
                content={`Search for units or ${unitType} around UTAR campus with UTARi`}
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
                                type: unitType,
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
                                hoveredAccommodationId,
                                center: queried.center,
                                link: 'Unit',
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
                    hoveredAccommodationId={hoveredAccommodationId}
                    center={queried.center}
                    numberOfAccommodationFound={{
                        type: 'general',
                        region: queryParam.region,
                        unitType,
                    }}
                />
            )}
        </Container>
    );
};

export default Unit;
