import "../App.css";
import { ChangeEvent, useState } from "react";
import QuizSection from "./QuizSection";
import StateQuiz from "./StateQuiz";

const InputCountry: React.FC = () => {
  const [country, setCountry] = useState<string>("Australia");
  const [quantity, setQuantity] = useState<number>(5);
  const [checked, setChecked] = useState<boolean>(false);

  console.log(checked);

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  const handleQuantChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <>
      <form>
        <label>
          States Quiz
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </label>
        <label>Pick a country:</label>
        <select
          id="country"
          onChange={(e) => handleCountryChange(e)}
          style={{ margin: "1rem" }}
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
        <label>How many cities would you like to see:</label>
        <select
          id="quantity"
          onChange={(e) => handleQuantChange(e)}
          style={{ margin: "1rem" }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </form>
      {checked ? (
        <StateQuiz />
      ) : (
        <QuizSection country={country} quantity={quantity} />
      )}
    </>
  );
};

export default InputCountry;
