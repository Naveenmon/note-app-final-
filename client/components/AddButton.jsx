import React from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom'

const Button = styled.button`
  background-color: #8A2BE2;
  color: #fff;
  border: none;
  border-radius: 25%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  position: fixed;
  bottom: 32px;
  right: 90px;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const AddButton = () => {
  return (
    <Link to={'/write'}>
        <Button>
            <Plus size={32} />
        </Button>
    </Link>
  );
};

export default AddButton;