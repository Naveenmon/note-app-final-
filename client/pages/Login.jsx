import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../src/assets/logo.png'

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #8A2BE2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color:  ;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 0;
  font-size: 14px;
`;

const RegisterLink = styled(Link)`
  color: #1877f2;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
const Logo = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;

`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email,
        password: password,
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      navigate('/');
    } catch (err) {
      console.error('Error during login:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo src={logo} width={45} height={45}></Logo>
        {/* <LoginTitle>Login</LoginTitle> */}
        <LoginForm onSubmit={handleLogin}>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit">Login</SubmitButton>
          <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
            Register New Account?{" "}
            <RegisterLink to="/register">Register</RegisterLink>
          </div>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;