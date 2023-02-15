import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupationOptions, setOccupationOptions] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    async function fetchOptions() {
      const response = await fetch(
        "https://frontend-take-home.fetchrewards.com/form"
      );
      const data = await response.json();
      setOccupationOptions(data.occupations);
      setStateOptions(data.states);
    }
    fetchOptions();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (fullName && email && password && selectedOccupation && selectedState) {
      const data = {
        name: fullName,
        email: email,
        password: password,
        occupation: selectedOccupation,
        state: selectedState,
      };
      fetch("https://frontend-take-home.fetchrewards.com/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          setFormSubmitted(true);
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <div className="form-container">
      <h1> Fetch Rewards </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <label>
          Occupation:
          <select
            value={selectedOccupation}
            onChange={(event) => setSelectedOccupation(event.target.value)}
            required
          >
            <option value="">Select an occupation</option>
            {occupationOptions.map((occupation, index) => (
              <option key={index} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </label>
        <label>
          State:
          <select
            value={selectedState}
            onChange={(event) => setSelectedState(event.target.value)}
            required
          >
            <option value="">Select a state</option>
            {stateOptions.map((state, index) => (
              <option key={index} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      {formSubmitted && (
        <p>Form submitted successfully! Thank you for your response.</p>
      )}
    </div>
  );
}
