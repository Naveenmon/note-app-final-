import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { SketchPicker } from 'react-color'; // Import SketchPicker from react-color

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 32px;
  background-color: #f9f9f9;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  z-index: 11;
  position: relative;
`;

const Section = styled.div`
  margin-bottom: 24px;

  label {
    display: block;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
    color: #333;
  }

  .input-box {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #8A2BE2;
      box-shadow: 0 0 4px rgba(0, 123, 255, 0.2);
    }
  }

  textarea.input-box {
    resize: none;
    height: 120px;
  }
`;

const Button = styled.button`
  display: block;
  margin-top: 16px;
  padding: 12px 24px;
  background-color: #8A2BE2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgb(115, 0, 223);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;

  &:hover {
    color: rgb(153, 0, 255);
  }
`;

const ColorPickerWrapper = styled.div`
  display: flex;
  justify-content: center; /* Centers the picker horizontally */
  align-items: center; /* Centers the picker vertically */
  
  .sketch-picker {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    border: 1px solid #ccc;
    padding: 8px;
  }

  .sketch-picker .color {
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.1);
  }

  .sketch-picker .sketch-picker__header {
    background-color: #8a2be2;
    color: #fff;
    border-radius: 8px 8px 0 0;
    padding: 8px;
    font-weight: bold;
    text-align: center;
  }
`;

const NoteForm = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: "",
    color: "#ffffff", // Default color
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleColorChange = (color) => {
    setNote((prevNote) => ({
      ...prevNote,
      color: color.hex, // Update the color state with the selected color's hex code
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/notes/write', {
        title: note.title,
        content: note.content,
        tag: note.tags,
        color: note.color,
      });

      if (response.data.success) {
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            setNote({ title: "", content: "", tags: "", color: "" });
            navigate("/"); 
          }
        });
      } else {
        toast.error(response.data.message || 'Something went wrong!', {
          position: 'top-right',
          autoClose: 500,
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
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleClose = () => {
    navigate("/"); 
  };

  return (
    <Overlay>
      <FormContainer>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Section>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="input-box"
            name="title"
            placeholder="Enter title..."
            value={note.title}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="input-box"
            name="content"
            placeholder="Enter note content..."
            value={note.content}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            className="input-box"
            id="tags"
            name="tags"
            placeholder="Enter tags separated by commas..."
            value={note.tags}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <label htmlFor="color">Pick a Color</label>
          <ColorPickerWrapper>
            <SketchPicker
              color={note.color} // Pass the current color value
              onChange={handleColorChange} // Update the color on change
            />
          </ColorPickerWrapper>
        </Section>

        <Button onClick={handleSubmit} disabled={!note.title || !note.content}>
          Create Note
        </Button>
      </FormContainer>
      <ToastContainer />
    </Overlay>
  );
};

export default NoteForm;
