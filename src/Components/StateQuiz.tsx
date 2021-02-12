import "../App.css";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import { GET_STATES } from "../queries";
import { cache } from "../cache";
import { useState, ChangeEvent, useEffect } from "react";
import { useRecoilValue, useRecoilState } from 'recoil';
import { Validated } from "../recoil/atoms";
import { CorrectAnswers } from "../recoil/selectors";

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
  const [correct, setValidation] = useRecoilState<string[]>(Validated);
  const [inputBox, setInputBox] = useState<string>("");
  const [seconds, setSeconds] = useState<number>(360);
  const [formatTime, setFormatTime] = useState<string>('');
  const numCorrect = useRecoilValue(CorrectAnswers);

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

  const validGuesses: string[] = data.states.map((state: any) => state.name.toLowerCase());

  const handleGuess = (e: ChangeEvent<HTMLInputElement>) => {
    setInputBox(e.target.value);
    const guess = e.target.value.toLowerCase().trim()
    if (
      validGuesses.includes(guess)
    ) {
      setValidation([...correct, guess]);
      setInputBox("");
    }
  };

  if (seconds === 0) {
    return <p>Out of time. You got {numCorrect}/{validGuesses.length} correct.</p>
  }

  return (
    <>
      <h2>Name all the states of the USA.</h2>
      {validGuesses.length !== numCorrect && (
        <form onSubmit={(e) => e.preventDefault()} className='form2'>
          <label>
            <input
              placeholder='Your guess here...'
              className='guessInput'
              type="text"
              value={inputBox}
              onChange={(e) => handleGuess(e)}
            />
          </label>
        </form>
      )}
      <p style={{fontSize:'2rem', margin: 'auto', width: '200px', fontFamily: 'Barrio', backgroundImage: 'linear-gradient(to right, rgba(0,0,0, 1) 50%, rgba(0,0,0, .7) 80%, rgba(0,0,0, .5) 90%, rgba(0,0,0, 0))'}}>
        {formatTime}
      </p>
      {validGuesses.length === numCorrect && (
        <p className="winner">🥳 You're a genius</p>
      )}
      {data && (
        <ul>
          {data.states.map((state: any, index: number) => {
            return (
              <li key={`${state.name}`}>
                <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', borderStyle: 'dotted', borderWidth: '0 1px 0 0', borderColor: 'rgba(6, 125, 143, 1)'}}>
                <p>{index + 1}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                {correct.includes(state.name.toLowerCase()) && (
                  <p className="correct">{state.name}</p>
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

export default StateQuiz;
