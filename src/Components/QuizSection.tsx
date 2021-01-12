import '../App.css';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from '@reach/router';
import { GET_CITIES } from '../queries';
import { CityObj, GetCities } from '../types';
import { useState, ChangeEvent } from 'react';

interface QuizSectionProps extends RouteComponentProps {
  country: string;
  quantity: number;
};

const QuizSection: React.FC<QuizSectionProps> = ({country, quantity}) => {
  const { data, loading, error } = useQuery<GetCities>(GET_CITIES, {
    variables: { countryName: country}
  });
  const [validation, setValidation] = useState<string[]>([]);
  const [inputBox, setInputBox] = useState<string>('');

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Not found</p>;

  const topCities: CityObj[] = data.cities.slice().sort((a: CityObj, b: CityObj) => {
    return b.population - a.population
  }).slice(0, quantity);

  const validGuesses: string[] = topCities.map((city: CityObj) => city.name.toLowerCase()) 
  console.log(validation)

  const handleGuess = (e: ChangeEvent<HTMLInputElement>) => {
    setInputBox(e.target.value.trim());
    if (validGuesses.includes(e.target.value.toLowerCase().trim())) {
      setValidation([...validation, e.target.value.toLowerCase().trim()])
      setInputBox('');
    }  
  }

  if (validGuesses.every((val: string) => validation.includes(val))) {
    // need to clear validation when a new country is selected.
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
          {topCities.map((city: CityObj) => {
            return (
              <li key={`${city.name}${city.population}`}>
                <p>Population: {city.population} </p>
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
