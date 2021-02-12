import "../App.css";
import { ChangeEvent } from "react";
import { useRecoilState } from 'recoil';
import QuizSection from "./QuizSection";
import StateQuiz from "./StateQuiz";
import { Country, Quantity, UsQuiz } from "../recoil/atoms";

const InputCountry: React.FC = () => {
  const [, setCountry] = useRecoilState(Country);
  const [, setQuantity] = useRecoilState(Quantity);
  const [usQuiz, setQuiz] = useRecoilState(UsQuiz);

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  const handleQuantChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <>
      <form className='form1'>
        <label>Pick a country:</label>
        <select
          id="country"
          onChange={(e) => handleCountryChange(e)}
        >
          <option value="Australia">Australia</option>
          <option value="Canada">Canada</option>
          <option value="People's Republic of China">China</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
          <option value="India">India</option>
          <option value="Japan">Japan</option>
          <option value="South Africa">South Africa</option>
          <option value="United Kingdom">UK</option>
          <option value="United States of America">USA</option>
        </select>
        <label>How many cities would you like to guess:</label>
        <select
          id="quantity"
          onChange={(e) => handleQuantChange(e)}
          style={{ margin: "1rem" }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <label>
          {
            usQuiz ? 'Uncheck to go back to city quiz' : 'Switch to American states quiz' 
          }
          <input
            type="checkbox"
            checked={usQuiz}
            onChange={() => setQuiz(!usQuiz)}
          />
        </label>
      </form>
      {usQuiz ? (
        <StateQuiz />
      ) : (
        <QuizSection />
      )}
    </>
  );
};

export default InputCountry;
