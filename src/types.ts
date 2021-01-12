export type CityObj = {
    name: string;
    population: number;
};

export type GetCities = {
    __typename: "city";
    cities: CityObj[];
}