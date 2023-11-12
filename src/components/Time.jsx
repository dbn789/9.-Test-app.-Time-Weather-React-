import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Time = () => {
    const [time, setTime] = useState('');
    const regTime = /\d\d:\d\d:\d\d/;
    const regCity = /\(.+,/;

    useEffect(() => {
        setTime(Date().match(regTime)[0]);
        const timer = setTimeout(() => {
            setTime(Date().match(regTime)[0]);
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div>
            <Link className="back" to="/">
                Назад
            </Link>
            <h1 className="time">
                Местное время в городе{' '}
                {Date().match(regCity)[0].replace('(', '').replace(',', '')}{' '}
                {time}
            </h1>
        </div>
    );
};

export default Time;
