/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: cities
// ====================================================

export interface cities_cities {
  __typename: "City";
  /**
   * The name.
   */
  name: string;
  /**
   * The population.
   */
  population: number;
}

export interface cities {
  /**
   * Get cities.
   */
  cities: cities_cities[];
}

export interface citiesVariables {
  countryName: string;
}
