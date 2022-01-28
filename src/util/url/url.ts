const api = `${process.env.API}/api`;

const roomURL = `${api}/room` as const;
const roommateURL = `${api}/roommate` as const;
const houseURL = `${api}/house` as const;
const apartmentCondominiumURL = `${api}/apartmentCondominium` as const;

type Rental = Readonly<{
    min: number | undefined;
    max: number | undefined;
}>;

type Region = 'BTHO' | 'KP' | 'SL';

type CommonQuery = Readonly<{
    region: Region;
    page: number | undefined;
    rental: Rental | undefined;
    address: string | undefined;
    remark: string | undefined;
    facilities: string | undefined;
}>;

type RoomQuery = CommonQuery;
type UnitQuery = CommonQuery;

const formAPIQuery = ({
    query,
    api,
}: Readonly<
    | {
          type: 'room';
          query: RoomQuery;
          api: typeof roomURL | typeof roommateURL;
      }
    | {
          type: 'unit';
          query: UnitQuery;
          api: typeof houseURL | typeof apartmentCondominiumURL;
      }
    | {
          type: 'rental';
          query: Rental;
          api: string;
      }
>): string =>
    Object.entries(query).reduce((prev, [key, value]) => {
        if (typeof value === 'object') {
            return formAPIQuery({
                type: 'rental',
                query: value,
                api: prev,
            });
        }
        return value === undefined
            ? `${prev}`
            : `${prev}${prev.includes('?') ? '&' : '?'}${key}=${value}`;
    }, api as string);

const roomQuery = (roomQuery: RoomQuery) =>
    formAPIQuery({ type: 'room', query: roomQuery, api: roomURL });

const roommateQuery = (roomQuery: RoomQuery) =>
    formAPIQuery({ type: 'room', query: roomQuery, api: roommateURL });

const houseQuery = (unitQuery: UnitQuery) =>
    formAPIQuery({ type: 'unit', query: unitQuery, api: houseURL });

const apartmentCondominiumQuery = (unitQuery: UnitQuery) =>
    formAPIQuery({
        type: 'unit',
        query: unitQuery,
        api: apartmentCondominiumURL,
    });

export { roomQuery, roommateQuery, houseQuery, apartmentCondominiumQuery };
