import React from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player'; 
import lottie from '../src/assets/lottie.json'

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;

  h2 {
    font-size: 24px;
    color: #555;
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    color: #888;
  }
`;

export const EmptyNote = () => {
  return (
    <EmptyContainer>
      <Player
        autoplay
        loop
        src={lottie} 
        style={{ height: '400px', width: '400px' }}
      />
      <h2>No Notes Yet</h2>
      <p>Your notes will appear here once you create them.</p>
    </EmptyContainer>
  );
};

export default EmptyNote;