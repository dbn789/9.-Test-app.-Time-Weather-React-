import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Weather = () => {
    const [value, setValue] = useState('');
    const [city, setCity] = useState('');
    const [answer, setAnswer] = useState('');
    const [background, setBackground] = useState({});
    const [selectedApi, setSelectedApi] = useState('');

    useEffect(() => {
        const urlPicture = encodeURI(
            `https://www.google.com/maps/place/${city}`
        );

        getPicture(urlPicture).then((res) => {
            setBackground((prev) => {
                return {
                    ...prev,
                    background: `url(${res}) no-repeat center / cover`,
                };
            });
        });

        getWeather(selectedApi).then(() => {
            setValue('');
        });
    }, [city, selectedApi]);

    async function getWeather(api) {
        const firstLetter = city?.at(0)?.toUpperCase();
        const upCity = `${firstLetter}${city?.slice(1)}`;
        let url, path;
        if (api === '0') {
            url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=4bdbac45f3241992fc2b62d1c7b364a1`;
            path = ['main', 'temp'];
        } else {
            url = `http://api.weatherapi.com/v1/current.json?key=d8047b282f314059b3a101248231211&q=${city}&aqi=no`;
            path = ['current', 'temp_c'];
        }

        try {
            const data = await axios.get(url);
            const temp = data.data[path[0]][path[1]];

            setAnswer(`Погода в городе ${upCity} ${temp} градусов`);
        } catch (e) {
            setAnswer('Город не найден. Попробуйте ещё!');
            console.log(e);
        }
    }

    async function getPicture(url) {
        const reg = /googleusercontent\.com\/p\/[A-Za-z0-9-]+\\/g;
        try {
            const data = await axios.get(url);
            const text = data.data;
            const token = text.match(reg)[+selectedApi];

            return token
                .replace('\\', '=s1575')
                .replace(
                    'googleusercontent.com/p/',
                    'https://lh3.ggpht.com/p/'
                );
        } catch (e) {
            return 'https://source.unsplash.com/user/c_v_r/1575x750';
        }
    }

    return (
        <div className="container" style={background}>
            <Link className="back" to="/">
                Назад
            </Link>
            <div className="weather">
                <span className="title">Выберите сервис погоды:</span>
                <select
                    value={selectedApi}
                    onChange={(e) => setSelectedApi(e.target.value)}
                >
                    <option value="0">openweathermap.org</option>
                    <option value="1">weatherapi.com</option>
                </select>

                <input
                    type="text"
                    value={value}
                    placeholder="Напишите город"
                    onChange={(e) => setValue(e.target.value)}
                ></input>
                <button type="submit" onClick={() => setCity(value)}>
                    Узнать погоду
                </button>

                <div className="result">{answer}</div>
            </div>
        </div>
    );
};

export default Weather;
