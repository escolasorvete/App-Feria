import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(
    109.6deg,
    rgb(235, 173, 254) 11.2%,
    rgb(254, 150, 150) 90.4%
  );
  font-family: "Roboto", sans-serif;
  padding-bottom: 20px;
`;

const AppHeader = styled.h1`
  color: #ffffff;
  font-size: 2.5em;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  max-width: 500px;
  background: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0px 0px 35px rgba(0, 0, 0, 0.1);
`;

const Segment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1em;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1em;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 1em;
  color: #f1a7e1;
  margin-bottom: 0.3em;
  align-self: center;
`;

const Input = styled.input`
  padding: 0.6em;
  font-size: 0.9em;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 0.3em;
  width: 70%;
`;

const DeleteButton = styled.button`
  align-items: center;
  appearance: none;
  background: linear-gradient(
    109.6deg,
    rgb(235, 173, 254) 11.2%,
    rgb(254, 150, 150) 90.4%
  );
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 100px;
  border-width: 0;
  box-shadow: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: CircularStd, sans-serif;
  font-size: 1rem;
  height: auto;
  justify-content: center;
  line-height: 1.5;
  padding: 6px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s, background-position 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  top: 5px;

  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    background-position: -20px -20px;
  }

  &:focus:not(:active) {
    box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 0.125em;
  }
`;

const SubmitButton = styled.button`
  align-items: center;
  appearance: none;
  background: linear-gradient(
    109.6deg,
    rgb(235, 173, 254) 11.2%,
    rgb(254, 150, 150) 90.4%
  );
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 100px;
  border-width: 0;
  box-shadow: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: CircularStd, sans-serif;
  font-size: 1rem;
  height: auto;
  justify-content: center;
  line-height: 1.5;
  padding: 6px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s, background-position 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  top: 5px;

  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    background-position: -20px -20px;
  }

  &:focus:not(:active) {
    box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 0.125em;
  }
`;

const App = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSegment, setNewSegment] = useState('');

  useEffect(() => {
    // Obtener el contenido del archivo JSON al cargar la página
    fetchSegments();
  }, [segments]);

  const fetchSegments = () => {
    axios
      .get("http://localhost:8000/api/json")
      .then((response) => {
        setSegments(response.data.segments);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error al obtener el contenido del archivo JSON");
        setLoading(false);
      });
  };

  const handleSegmentChange = (index, value) => {
    const updatedSegments = [...segments];
    updatedSegments[index] = value;
    setSegments(updatedSegments);
  };

  const handleSegmentDelete = (index) => {
    const updatedSegments = segments.filter((_, i) => i !== index);
    setSegments(updatedSegments);

    axios
      .delete(`http://localhost:8000/api/json/${index}`)
      .then((response) => {
        console.log(response.data);
        // Opcional: Mostrar un mensaje de éxito o realizar otras acciones necesarias
      })
      .catch((error) => {
        console.error("Error al eliminar el segmento:", error);
        // Opcional: Mostrar un mensaje de error o realizar otras acciones necesarias
      });
  };

  const handleSegmentCreate = () => {
    axios
      .post("http://localhost:8000/api/json", { segment: newSegment })
      .then((response) => {
        console.log(response.data);
        // Opcional: Mostrar un mensaje de éxito o realizar otras acciones necesarias
        setNewSegment("");
      })
      .catch((error) => {
        console.error("Error al crear el segmento:", error);
        // Opcional: Mostrar un mensaje de error o realizar otras acciones necesarias
      });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedJsonData = { segments: segments }; // Asegúrate de que la estructura sea { segments: [...] }
    console.log(updatedJsonData);
    // Enviar los datos actualizados del archivo JSON al servidor
    axios.defaults.headers["Content-Type"] = "application/json"; // Agrega esta línea para configurar el encabezado JSON
    axios
      .put(`http://localhost:8000/api/json`, updatedJsonData)
      .then((response) => {
        console.log("Archivo JSON actualizado:", response.data);
      })
      .catch((error) => {
        console.error("Error al actualizar el archivo JSON:", error);
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <AppHeader>PANEL CONTROL PREMIOS</AppHeader>
      <Form onSubmit={handleSubmit}>
        {segments.map((segment, index) => (
          <Segment key={index}>
            <Label>Segment {index + 1}:</Label>
            <Input
              type="text"
              value={segment}
              onChange={(event) =>
                handleSegmentChange(index, event.target.value)
              }
            />
            <ButtonGroup>
              <DeleteButton
                type="button"
                onClick={() => handleSegmentDelete(index)}
              >
                Eliminar
              </DeleteButton>
              <SubmitButton type="submit">Guardar</SubmitButton>
            </ButtonGroup>
          </Segment>
        ))}
        <Input
          type="text"
          value={newSegment}
          onChange={(event) => setNewSegment(event.target.value)}
        />
        <button type="button" onClick={handleSegmentCreate}>
          Crear
        </button>
      </Form>
    </Container>
  );
};

export default App;
