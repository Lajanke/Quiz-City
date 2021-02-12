import "../App.css";
import { useQuery } from "@apollo/client";
import { GET_CITIES } from "../queries";
import { useState, ChangeEvent, useEffect } from "react";
import { cities, cities_cities, citiesVariables } from "../types/cities";
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { Country, Quantity, Validated } from "../recoil/atoms";
import { CorrectAnswers } from "../recoil/selectors";

const QuizSection: React.FC = () => {
  const country = useRecoilValue<string>(Country);
  const quantity = useRecoilValue<number>(Quantity);
  const { data, loading, error } = useQuery<cities, citiesVariables>(
    GET_CITIES,
    {
      variables: { countryName: country },
    }
  );
  const [correct, setValidation] = useRecoilState<string[]>(Validated);
  const resetValidated = useResetRecoilState(Validated);
  const [inputBox, setInputBox] = useState<string>("");
  const numCorrect = useRecoilValue(CorrectAnswers);

  useEffect(() => {
    resetValidated();
  }, [country, resetValidated]);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Not found</p>;

  const topCities: cities_cities[] = data.cities
    .slice()
    .sort((a: cities_cities, b: cities_cities) => {
      return b.population - a.population;
    })
    .slice(0, quantity);

  const validGuesses: string[] = topCities.map((city: cities_cities) => city.name.toLowerCase());

  const handleGuess = (e: ChangeEvent<HTMLInputElement>) => {
    setInputBox(e.target.value);
    const guess = e.target.value.toLowerCase().trim();
    if (
      validGuesses.includes(guess)
    ) {
      setValidation([...correct, guess]);
      setInputBox("");
    }
  };

  return (
    <>
      <h2>
        What are the top {quantity} largest cities in {country}?
      </h2>
      {validGuesses.length !== numCorrect && (
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
      {validGuesses.length === numCorrect && (
        <p className="winner">🥳 You're a genius</p>
      )}
      {data && (
        <ul>
          {topCities.map((city: cities_cities, index) => {
            return (
              <li key={`${city.name}${city.population}`}>
                <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', borderStyle: 'dotted', borderWidth: '0 1px 0 0', borderColor: 'rgba(6, 125, 143, 1)'}}>
                <p>{index + 1}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <p style={{textAlign: 'left', marginLeft: '1rem'}}>Population: {city.population.toLocaleString()} </p>
                {correct.includes(city.name.toLowerCase()) && (
                  <p className="correct">{city.name}</p>
                )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default QuizSection;
