import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [universities, setUniversities]= useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/universities').then(response=>{
    setUniversities(response.data);
    })
  }, []) 

  return (
    <div>
      <Header as='h2' icon='university' content='University Menagement System' />
        <List>
          {universities.map((university: any)=>(
            <List.Item key={university.id}>
              {university.name}
            </List.Item>
          ))}
        </List>
</div>
  );
}

export default App;
