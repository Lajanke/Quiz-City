import "../App.css";
import { useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { GET_CITIES } from "../queries";
import { useState, ChangeEvent, useEffect } from "react";
import { cities, cities_cities, citiesVariables } from "../types/cities";

interface QuizSectionProps extends RouteComponentProps {
  country: string;
  quantity: number;
}

const QuizSection: React.FC<QuizSectionProps> = ({ country, quantity }) => {
  const { data, loading, error } = useQuery<cities, citiesVariables>(
    GET_CITIES,
    {
      variables: { countryName: country },
    }
  );
  const [validation, setValidation] = useState<string[]>([]);
  const [inputBox, setInputBox] = useState<string>("");

  useEffect(() => {
    setValidation([]);
  }, [country]);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Not found</p>;

  const topCities: cities_cities[] = data.cities
    .slice()
    .sort((a: cities_cities, b: cities_cities) => {
      return b.population - a.population;
    })
    .slice(0, quantity);

  const validGuesses: string[] = topCities.map((city: cities_cities) =>
    city.name.toLowerCase()
  );

  const handleGuess = (e: ChangeEvent<HTMLInputElement>) => {
    setInputBox(e.target.value);
    if (
      validGuesses.includes(e.target.value.toLowerCase().trim()) &&
      !validation.includes(e.target.value.toLowerCase().trim())
    ) {
      setValidation([...validation, e.target.value.toLowerCase().trim()]);
      setInputBox("");
    }
  };

  return (
    <>
      <h2>
        What are the top {quantity} largest cities in {country}?
      </h2>
      {!validGuesses.every((val: string) => validation.includes(val)) && (
        <form onSubmit={(e) => e.preventDefault()} className='form2'>
          <label>
            </label>
            <input
              placeholder='Your guess here...'
              className='guessInput'
              type="text"
              value={inputBox}
              onChange={(e) => handleGuess(e)}
            />
        </form>
      )}
      {validGuesses.every((val: string) => validation.includes(val)) && (
        <p className="winner">🥳 You're a genius</p>
      )}
      {data && (
        <ul>
          {topCities.map((city: cities_cities, index) => {
            return (
              <li key={`${city.name}${city.population}`}>
                <p>{index + 1}</p>
                <p>Population: {city.population.toLocaleString()} </p>
                {validation.includes(city.name.toLowerCase()) && (
                  <p className="correct">{city.name}</p>
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
