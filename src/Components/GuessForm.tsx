import '../App.css';
import { RouteComponentProps } from '@reach/router';
import { useState, ChangeEvent } from 'react';

interface GuessFormProps extends RouteComponentProps {
    name: string;
};



const GuessForm: React.FC<GuessFormProps> = ({name}) => {
    const [correct, setCorrect] = useState<Boolean>(false)

    const handleGuess = (e: ChangeEvent<HTMLInputElement> , name: string) => {
        setCorrect((e.target.value).toLowerCase() === name.toLowerCase());   
    }

  return (
    <>
      <form>
          <label>
              Guess:
              <input type="text" onChange={(e) => handleGuess(e, name)}/>
          </label>
      </form>
      {correct && (
          <p>CORRECT! 🎉</p>
      )
      }
    </>
  );
};

export default GuessForm;