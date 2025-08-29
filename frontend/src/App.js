import React, {useState, useEffect} from 'react';
import './App.css';
import { TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import { useState,useEffect } from 'react';
import axios from 'axios';


const App=()=>{
  const[areas, setAreas]= useState([]);
  const[roles, setRoles] = useState([]);
  const[selectedArea, setSelectedArea] = useState('');

  useEffect(()=>{
    fetchAreas(); //fetch sirve para comunicarse con un servidor y obtener datos (o enviar datos) sin recargar la página
    // fetchRoles();
  }, []);

  const fetchAreas = async()=> {
    try {
      const response = await axios.get('http://localhost:5000/api/areas')
      setAreas(response.data.body);
      console.log(response.data.body);
    } catch (error) {
      console.error('Error fetching areas: ', error);
    }
  };

  const fetchRoles = async (idArea) => {
  if(!idArea) return; // si no hay área, no hacemos nada
  try {
    const response = await axios.get(`http://localhost:5000/api/roles/${idArea}`);
    setRoles(response.data.body);
  } catch (error) {
    console.error('Error fetching roles: ', error);
  }
};

  // const fetchRoles = async (idArea='')=>{
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/roles',{
  //       params:{idArea}, //ojo con esta coma
  //     });
  //     setRoles(response.data.body);
  //     console.log({idArea}); //para verificar  que idArea venga con algo
      
  //   } catch (error) {
  //     console.error('Error fetching roles: ', error);
  //   }
  // };

  const handleAreaChange = (event) => {
  const selectedId = event.target.value;
  setSelectedArea(selectedId);

  if (selectedId) {
    fetchRoles(selectedId);
  } else {
    setRoles([]); // limpia el DataGrid cuando se selecciona "None"
  }
};

    //ojo con esto adecuarlo a lo que tienes
  const columns = [ 
    {field: 'id_rol', headerName: 'ID', width: 90},
    {field: 'nombre_rol', headerName: 'Rol', width: 200}, 
  ];

  return(
    <div style={ {height: 400, width:'100%'}}>
      <TextField
        select
        label= 'Areas'
        value={selectedArea}
        onChange={handleAreaChange}
        style={{marginBottom:20, width:200}}>
          <MenuItem value= "">
            <em>None</em>
          </MenuItem>
          {areas.map((area)=>(
            <MenuItem key={area.id_area} value={area.id_area}>
              {area.nombre_area}
            </MenuItem>
          ) )}
      </TextField>
      <DataGrid 
        rows={roles} 
        columns={columns} 
        getRowId={(row) => row.id_rol} 
        pageSize={5} 
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};



  // function App() {
  //   return (
  //     <div style={{ height: 400, width: '100%' }}>
  //     <TextField
  //       select
  //       label="Areas"
  //       style={{ marginBottom: 20, width: 200 }}
  //     > 
  //     </TextField>
     
  //   </div>
  //   );
  // }

  export default App;

