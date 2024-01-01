import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [hideInput, setHideInput] = useState(true);
  const [hideMessage, setHideMessage] = useState(true);
  const [lovePercentage, setLovePercentage] = useState('');
  const [name, setName] = useState('');
  const containerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleClick = () => {
    setHideInput(false);
    setHideMessage(true);
    if (name.length !== 0) {
      setName('');
    }
  };
  const handleNameChange = e => {
    const newName = e.target.value;
    setName(newName);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (newName.trim() !== '') {
        sendNameToBackend(newName);
      }
    }, 1000);
  };

  const sendNameToBackend = newName => {
    axios
      .post('https://new-year-2024.onrender.com/post-name', { name: newName })
      .then(res => console.log('Added'))
      .catch(err => console.log('Error:', err));
    calculateLovePercentage(newName);
  };
  const calculateLovePercentage = newName => {
    if (newName.trim().toLowerCase() === 'archana') {
      setLovePercentage('100%');
    } else {
      const randomPercentage = Math.floor(Math.random() * 100) + 0;
      setLovePercentage(`${randomPercentage}%`);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (name !== '') {
      const id = setTimeout(() => {
        setHideMessage(false);
        setHideInput(true);
        return () => clearTimeout(id);
      }, 4000);
    }
  }, [name]);

  return (
    <div className="home_back" ref={containerRef}>
      <h1 className="new_year">Happy New Year</h1>
      <h1 className="year">2024</h1>
      <p>
        To get the personalized message from Ratikanta please click the below
        button and get to know how much he loves you
      </p>
      <button
        onClick={handleClick}
        style={{ display: 'block', fontSize: '20px' }}
      >
        click
      </button>
      {hideInput ? null : (
        <input
          type="text"
          value={name}
          onChange={e => handleNameChange(e)}
          placeholder="Enter your first name here"
          style={{ display: 'block', fontSize: '20px' }}
        />
      )}
      {hideMessage ? null : (
        <p className='message'>
          {' '}
          Wishing you, {name}, a joyous New Year filled with endless
          possibilities, abundant blessings, and heartfelt moments. May this
          year bring you immense happiness, success in all endeavors, cherished
          memories, and opportunities to shine. Here's to a year brimming with
          prosperity, good health, and fulfillment. Happy New Year!
          <h3>He Loves You {lovePercentage}</h3>
        </p>
      )}
    </div>
  );
};

export default Home;
