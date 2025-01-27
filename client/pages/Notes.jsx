import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmptyNote from '../components/EmptyNote';
import SingleNote from './SingleNote';
import { Link } from 'react-router-dom'
import axios from 'axios';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 32px;
  padding-top: 50px;
  padding-left: 90px;
  padding-right: 90px;
  padding-bottom: 50px;
`;

const NoteCard = styled.div`
  background-color: ${props => props.color};
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
  padding: 32px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-8px);
  }
`;

const NoteTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const NoteContent = styled.p`
  font-size: 16px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;
const StyledLink = styled(Link)`
  text-decoration: none; 
  color: inherit; 
`;

const Notes = ({searchTerm}) => {
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      if (response.data) {
        
        setData((prev)=>({...prev, dataA: response.data.notes, dataB: response.data.notes}))
      } else {
        console.log("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  useEffect(() => {

  
    fetchNotes();
    
  }, []);

  const [data, setData] = useState({
    dataA:  [],
    dataB:[]
  })

  console.log(data)

  useEffect(()=>{
    const searchFilter = data?.dataA?.filter((item)=>item?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) )
    setData((prev)=>({...prev, dataB: searchFilter}))
  }, [searchTerm])

  return (
    <AppContainer>
      {data?.dataB.length > 0 ? (
        data?.dataB.map(note => (
          <StyledLink to={`/notes/${note._id}`} key={note._id}>
            <NoteCard color={note.color}>
              <NoteTitle>{note.title}</NoteTitle>
              <NoteContent>{note.content}</NoteContent>
           </NoteCard>
           </StyledLink>
        ))
      ) : (
        <EmptyNote/>
      )}
    </AppContainer>
  );
};

export default Notes;