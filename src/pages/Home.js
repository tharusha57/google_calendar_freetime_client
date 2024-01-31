import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [inputText, setInputText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading , setIsloading] = useState(false);
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleStartDateTimeChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateTimeChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e) => {

    if (inputText  == '' || startDate  == '' || endDate == ''){
        alert('Please Fill all the fields')
    }else{
        try {

          setIsloading(true);

          const startTime = new Date(startDate).toISOString();
          const endTime = new Date(endDate).toISOString();

          console.log(startTime , endTime);

          const response = await axios.post('http://localhost:4000/getFreeTime', {
              "timeMin": startTime,
              "timeMax": endTime,
              "id": inputText
          });

            if(response){
                setIsloading(false);
                setResults(response.data);
                console.log(response)
            }

        } catch (error) {
            setIsloading(false);
            setResults(null);
            console.log(error)
        }
    }
  }

  return (
    <div className="home-container">
      <div>
        <label htmlFor="textInput">Enter Google Calendar ID :</label>
        <input
          type="text"
          id="textInput"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="dateTimeInput">Select Start Date and Time :</label>
        <input
          type="datetime-local"
          id="dateTimeInput"
          value={startDate}
          onChange={handleStartDateTimeChange}
        />
      </div>
      <div>
        <label htmlFor="dateTimeInput">Select End Date and Time :</label>
        <input
          type="datetime-local"
          id="dateTimeInput"
          value={endDate}
          onChange={handleEndDateTimeChange}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      
      {isLoading ? <h1>Loading....</h1> : ''}

      {results && (
        <div>
          <h2>Free Time Results:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                Start: {result.start} - End: {result.end}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default Home;
