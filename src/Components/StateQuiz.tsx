import "../App.css";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { GET_STATES } from "../queries";
import { cache } from "../cache";
import { useState, ChangeEvent, useEffect } from "react";

// Needs types.

interface StateQuizProps extends RouteComponentProps {}

export const localClient: ApolloClient<NormalizedCacheObject> = new ApolloClient(
  {
    cache,
    uri: "http://localhost:4000/",
  }
);

const StateQuiz: React.FC<StateQuizProps> = () => {
  const { data, loading, error } = useQuery<any>(GET_STATES, {
    client: localClient,
  });
  const [validation, setValidation] = useState<string[]>([]);
  const [inputBox, setInputBox] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(360);
  const [formatTime, setFormatTime] = useState<string>('');

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
      const minutes: string = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60).toString()}` : `${Math.floor(seconds / 60).toString()}`;
      const remainder: string = seconds - (Number(minutes) * 60) < 10 ? `0${seconds - (Number(minutes) * 60)}` : `${seconds - (Number(minutes) * 60)}`;
      if (minutes !== '0') {
        setFormatTime(`${minutes}:${remainder}`);
      } else {
        setFormatTime(`00:${remainder}`);
      }
    } else {
      setSeconds(0);
    }
  }, [seconds]);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>Not found</p>;

  const validGuesses: string[] = data.states.map((state: any) =>
    state.name.toLowerCase()
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

  if (seconds === 0) {
    return <p>Out of time. You got {validation.length}/{validGuesses.length} correct.</p>
  }

  return (
    <>
      <h2>Name all the states of the USA.</h2>
      {!validGuesses.every((val: string) => validation.includes(val)) && (
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Guess a State:
            <input
              type="text"
              value={inputBox}
              onChange={(e) => handleGuess(e)}
            />
          </label>
        </form>
      )}
      <p style={{fontSize:'2rem'}}>
        {formatTime}
      </p>
      {validGuesses.every((val: string) => validation.includes(val)) && (
        <p className="winner">🥳 You're a genius</p>
      )}
      {data && (
        <ul>
          {data.states.map((state: any) => {
            return (
              <li key={`${state.name}`}>
                {validation.includes(state.name.toLowerCase()) && (
                  <p className="correct">{state.name}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default StateQuiz;
