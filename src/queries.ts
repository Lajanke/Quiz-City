import { gql } from "@apollo/client";

export const GET_CITIES = gql`
  query cities ($countryName: String!){
    cities(where: { countryName: { eq: $countryName } }) {
      name
      population
    }
  }
`;