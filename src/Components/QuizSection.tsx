import '../App.css';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import { GET_CITIES } from '../queries';
import { useState, ChangeEvent, useEffect } from 'react';
import { cities, cities_cities, citiesVariables } from '../types/cities';

interface QuizSectionProps extends RouteComponentProps {
  country: string;
  quantity: number;
};

const QuizSection: React.FC<QuizSectionProps> = ({country, quantity}) => {
  const { data, loading, error } = useQuery<cities, citiesVariables>(GET_CITIES, {
    variables: { countryName: country}
  });
  const [validation, setValidation] = useState<string[]>([]);
  const [inputBox, setInputBox] = useState<string>('');

  useEffect(() => {
    setValidation([]);
  }, [country]);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Not found</p>;

  const topCities: cities_cities[] = data.cities.slice().sort((a: cities_cities, b: cities_cities) => {
    return b.population - a.population
  }).slice(0, quantity);

  const validGuesses: string[] = topCities.map((city: cities_cities) => city.name.toLowerCase()) 
  console.log(validation);

  const handleGuess = (e: ChangeEvent<HTMLInputElement>) => {
    setInputBox(e.target.value);
    if (validGuesses.includes(e.target.value.toLowerCase().trim())
    && !validation.includes(e.target.value.toLowerCase().trim())
    ) {
      setValidation([...validation, e.target.value.toLowerCase().trim()])
      setInputBox('');
    }   
  }

  if (validGuesses.every((val: string) => validation.includes(val))) {
    return <p>You're a genius</p>
  }

  return (
    <>
      <h2>The top {quantity} largest cities in {country}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
          <label>
              Guess a City:
              <input type="text" value={inputBox} onChange={(e) => handleGuess(e)}/>
          </label>
      </form>
      {data && (
        <ul>
          {topCities.map((city: cities_cities) => {
            return (
              <li key={`${city.name}${city.population}`}>
                <p>Population: {city.population.toLocaleString()} </p>
                {validation.includes(city.name.toLowerCase()) && (
                  <p>{city.name}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default QuizSection;
