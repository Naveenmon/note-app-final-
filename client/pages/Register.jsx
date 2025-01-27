import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../src/assets/logo.png'
import { ToastContainer, toast } from 'react-toastify';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const RegisterTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const RegisterForm = styled.form`
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
    background-color: rgb(117, 5, 223);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 0;
  font-size: 14px;
`;

const LoginLink = styled(Link)`
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

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const handleRegister = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { 
                name: name, 
                email: email, 
                password: password 
            });
            if (res.data.success) {
              toast.success(res.data.message, {
                position: 'top-right',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                  navigate("/login"); 
                }
              });
            } else {
              toast.error(res.data.message || 'Something went wrong!', {
                position: 'top-right',
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                  navigate("/register"); 
                }
              });
            }
        } catch(error) {
            const errorData = await error.res.data;
            setErrorMessage(errorData.message);
        }
    };

    return (
        <RegisterContainer>
            <RegisterCard>
                <Logo src={logo} width={45} height={45}></Logo>
                {/* <RegisterTitle>Register</RegisterTitle> */}
                <RegisterForm onSubmit={handleRegister}>
                    <InputField 
                        type='text' 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        placeholder='Enter Name'
                        required
                    />
                    <InputField 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        placeholder='Enter email'
                        required
                    />
                    <InputField 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        placeholder='Enter Password'
                        required
                    />
                    <SubmitButton type='submit'>Register</SubmitButton>
                    
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    
                    <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
                        Already have Account?{" "}
                        <LoginLink to={'/login'}>Login</LoginLink>
                    </div>
                </RegisterForm>
            </RegisterCard>
            <ToastContainer />
        </RegisterContainer>
    );
};

export default Register;