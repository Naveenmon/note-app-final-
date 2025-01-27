import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';  

const NoteContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background-color: ${(props) => props.color };
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
  font-family: 'Arial', sans-serif;
  position: relative;
`;

const NoteTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color:rgb(0, 0, 0);
  margin-bottom: 20px;
  text-align: center;
  text-transform: capitalize;
  letter-spacing: 1px;
`;

const NoteContent = styled.p`
  font-size: 18px;
  color: #000;
  line-height: 1.8;
  margin-bottom: 20px;
  word-wrap: break-word;
  white-space: pre-line;
`;

const NoteTags = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #000;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  span {
    font-weight: 500;
    color:rgb(0, 0, 0);
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color:rgb(3, 3, 3);
    }
  }
`;

const NoteDate = styled.p`
  font-size: 14px;
  color: #000;
  display: flex;
  justify-content: start;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  color:rgb(0, 0, 0);
  cursor: pointer;
  font-weight: 600;
  transition: color 0.3s;

  &:hover {
    color:rgb(255, 255, 255);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: ${(props) => (props.primary ? "#3498db" : "#e74c3c")};
  }
`;

const SingleNote = () => {
  const { id } = useParams(); 
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notes/${id}`);
        setNote(response.data);
      } catch (err) {
        setError("Failed to fetch the note. Please try again later.");
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/notes/${id}`);
      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 1000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            navigate("/"); 
          }
        });
      } else {
        toast.error(response.data.message || 'Something went wrong!', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            navigate("/"); 
          }
        });
      }
    } catch (error) {
      console.log("Error in Deleting Post");
    }
  };

  const handleEdit = () => {
    console.log("Navigating to update page with ID:", id);  // Debugging the ID
    navigate(`/notes/edit/${id}`);
  };

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!note) {
    return <p>Loading...</p>;
  }

  // Format the created date
  const formattedDate = note.createdAt ? format(new Date(note.createdAt), 'MMMM dd, yyyy') : 'No date available';

  return (
    <NoteContainer color={note.color}>
      <BackButton onClick={() => window.history.back()}>← </BackButton>
      <NoteTitle>{note.title}</NoteTitle>
      <NoteContent>{note.content}</NoteContent>
      <NoteTags>
        <strong>Tags:</strong> {note.tag ? note.tag : "No tags available"}
      </NoteTags>
      <NoteDate><strong>Date Created: {" "}</strong> {formattedDate}</NoteDate>
      <ActionButtons>
        <IconButton onClick={handleEdit} primary>
          <FaEdit />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <FaTrashAlt />
        </IconButton>
      </ActionButtons>
      <ToastContainer />
    </NoteContainer>
  );
};

export default SingleNote;
