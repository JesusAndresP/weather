import { Button, Grid, IconButton, Input, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
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
  const [iconCode, setIconCode] = useState();
  const [unit, setUnit] = useState('metric');
  const [city, setCity] = useState('Bogota');

  const handleUnit = (e) => {
    setUnit(e.target.value);
  };

  const onSubmitHandler = (data) => {
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
        setIconCode(weatherService.data.weather[0].icon);
        if (city !== city) {
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

  let iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";

  return (
    <div>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        direction="row" >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Input
            autoFocus
            sx={{
              "& fieldset": { border: 'none' },
              input: { color: '#757575' }
            }}
            id="city"
            name="city"
            className="input__search"
            placeholder="Bucar otra ciudad"
            disableUnderline
            helperText={errors.city ? errors.city.message : ""}
            onChange={(e) => setCity(e.target.value)}
            {...register("city")}

            FormHelperTextProps={{
              style: {
                margin: "-5px 0 1px 0px",
                color: "#e52900",
                fontSize: 10
              },
            }}
            endAdornment={
              <IconButton
                type="submit"
                color="#757575"
              >
                <SearchIcon />
              </IconButton>
            }
          />
        </form>

        <Select
          value={unit}
          onChange={handleUnit}
          hint="Unidad">
          <MenuItem value={"standard"}>K°</MenuItem>
          <MenuItem value={"metric"}>C°</MenuItem>
          <MenuItem value={"imperial"}>F°</MenuItem>
        </Select>
      </Grid>

      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid className="section__weather"
          container
          direction="row"
          justifyContent="center"
          alignItems="center">
          <Grid item>
            <p className="heading-primary">{name}</p>
            <p className="heading-main">{parseInt(temp)} {unitLetter}</p>
          </Grid >
          <Grid item >
            <img className="section__wicon" src={iconurl} alt="Weather icon" />
          </Grid>
        </Grid>
      </Grid >
      <p className="subHeading-primary">Máx.: {parseInt(max)} {unitLetter}</p>
      <p className="subHeading-primary">Mín.: {parseInt(min)} {unitLetter}</p>

      <section className="section__details">
        <p>Humedad: {hum} %</p>
        <p>Sensación termica: {parseInt(senTerm)}{unitLetter}</p>
      </section>
    </div>
  );
}

export default Principal;
