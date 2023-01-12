import { FormControl, MenuItem, Select, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetWeather } from "../services/climaService";

function Principal() {
  const [temp, setTemp] = useState();
  const [hum, setHum] = useState();
  const [max, setMax] = useState();
  const [min, setMin] = useState();
  const [senTerm, setSenTerm] = useState();
  const [unit, setUnit] = useState('metric');

  const city = "Mountain View";

  const handleUnit = (e) => {
    setUnit(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const weatherService = await GetWeather(city, unit);
        setTemp(weatherService.data.main.temp);
        setHum(weatherService.data.main.humidity);
        setMax(weatherService.data.main.temp_max);
        setMin(weatherService.data.main.temp_min);
        setSenTerm(weatherService.data.main.feels_like);
      }
      catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    };
    fetchData();
  }, [unit]);

  let unitLetter;
  if (unit === 'metric') {
    unitLetter = 'C°';
  } else if (unit === 'imperial') {
    unitLetter = 'F°';
  } else {
    unitLetter = 'K°';
  }

  return (
    <div className="principal">
      <FormControl>
        <Select
          value={unit}
          onChange={handleUnit}
          hint="Unidad">
          <MenuItem value={"standard"}>K°</MenuItem>
          <MenuItem value={"metric"}>C°</MenuItem>
          <MenuItem value={"imperial"}>F°</MenuItem>
        </Select>
      </FormControl>
      <h1>{temp}{unitLetter}</h1>
      <h3>Humedad: {hum} %</h3>
      <h3>Sensación termica: {senTerm}{unitLetter}</h3>
      <h3>Temp máxima: {max}{unitLetter}</h3>
      <h3>Temp minima: {min}{unitLetter}</h3>
    </div>
  );
}

export default Principal;
