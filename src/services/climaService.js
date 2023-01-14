import axios from "axios";

export async function GetWeather (city, units) {
    return axios({
        method:"GET",
        url:`https://api.openweathermap.org/data/2.5/weather?APPID=17df1cf54bb1166a821af2c364b240e8&q=${city}&units=${units}&lang=es`,
    });
};
