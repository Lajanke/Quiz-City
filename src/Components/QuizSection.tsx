import "../App.css";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";

interface QuizSectionProps extends RouteComponentProps {};

export const GET_CITIES = gql`
  query {
    cities(where: { countryName: { eq: "United Kingdom" } }) {
      name
      population
    }
  }
`;

const QuizSection: React.FC<QuizSectionProps> = () => {
  const country: string = "United Kingdom";

  const { data, loading, error } = useQuery(GET_CITIES);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Not found</p>;

  console.log('sort by name', data.cities.slice(0, 10).sort((a: any, b: any) => {
    return a.name - b.name
  }))

  //make a type for city
  const topTen = data.cities.slice().sort((a: any, b: any) => {
    return b.population - a.population
  }).slice(0, 10);

  return (
    <>
      <h2>Quiz Goes Here</h2>
      <p>The top 10 largest cities in {country}</p>
      {data && (
        <ul>
          {topTen.map((city: any) => {
            return (
              <li key={`${city.name}${city.population}`}>
                <p>{city.name}</p>
                <p>Population: {city.population} </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default QuizSection;
