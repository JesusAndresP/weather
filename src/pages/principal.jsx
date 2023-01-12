import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetWeather } from "../services/climaService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Principal() {

  const schema = yup.object().shape({
    city: yup.string().required("Campo obligatorio")
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });
  const [name, setName] = useState('');
  const [temp, setTemp] = useState();
  const [hum, setHum] = useState();
  const [max, setMax] = useState();
  const [min, setMin] = useState();
  const [senTerm, setSenTerm] = useState();
  const [unit, setUnit] = useState('metric');
  const [city, setCity] = useState('Bogota');

  const handleUnit = (e) => {
    setUnit(e.target.value);
  };

  const onSubmitHandler = (data) =>{
    console.log("HAND",data);
    setCity(data.city);
    reset();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const weatherService = await GetWeather(city, unit);
        setName(weatherService.data.name);
        setTemp(weatherService.data.main?.temp);
        setHum(weatherService.data.main?.humidity);
        setMax(weatherService.data.main?.temp_max);
        setMin(weatherService.data.main?.temp_min);
        setSenTerm(weatherService.data.main?.feels_like);
        if(city !== city){
          fetchData();
        }
      }
      catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    };
    fetchData();
  }, [unit, city]);



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
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
          id="city"
          name="city"
          disableUnderline 
          placeholder="Bucar otra ciudad"
          helperText={errors.city?.message}
          onChange={(e) => setCity(e.target.value)}
          {...register("city")}
          />
          <Button variant="contained" type="submit">Buscar</Button>
        </form>
      
        <Select
          value={unit}
          onChange={handleUnit}
          hint="Unidad">
          <MenuItem value={"standard"}>K°</MenuItem>
          <MenuItem value={"metric"}>C°</MenuItem>
          <MenuItem value={"imperial"}>F°</MenuItem>
        </Select>
      <h1>{name}</h1>
      <h1>{temp}{unitLetter}</h1>
      <h3>Humedad: {hum} %</h3>
      <h3>Sensación termica: {senTerm}{unitLetter}</h3>
      <h3>Temp máxima: {max}{unitLetter}</h3>
      <h3>Temp minima: {min}{unitLetter}</h3>
    </div>
  );
}

export default Principal;
