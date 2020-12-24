import '../App.css';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import { GET_CITIES } from '../queries';
import { CityObj } from '../types';
import GuessForm from './GuessForm';

interface QuizSectionProps extends RouteComponentProps {
  country: String;
  quantity: Number;
};

const QuizSection: React.FC<QuizSectionProps> = ({country, quantity}) => {
  const { data, loading, error } = useQuery(GET_CITIES, {
    variables: { countryName: country}
  });

  console.log(GET_CITIES)

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Not found</p>;

  const topTen: CityObj[] = data.cities.slice().sort((a: any, b: any) => {
    return b.population - a.population
  }).slice(0, quantity);

  return (
    <>
      <h2>The top {quantity} largest cities in {country}</h2>
      {data && (
        <ul>
          {topTen.map((city: CityObj) => {
            return (
              <li key={`${city.name}${city.population}`}>
                <p>Population: {city.population} </p>
                <GuessForm name={city.name}/>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default QuizSection;
