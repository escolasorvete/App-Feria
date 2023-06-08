import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener el contenido del archivo JSON al cargar la página
    fetchSegments();
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedJsonData = { segments: segments }; // Asegúrate de que la estructura sea { segments: [...] }
    console.log(updatedJsonData);
    // Enviar los datos actualizados del archivo JSON al servidor
    axios.defaults.headers['Content-Type'] = 'application/json'; // Agrega esta línea para configurar el encabezado JSON
    axios
      .put(`http://localhost:8000/api/json`, updatedJsonData)
      .then(response => {
        console.log('Archivo JSON actualizado:', response.data);
      })
      .catch(error => {
        console.error('Error al actualizar el archivo JSON:', error);
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>PANEL CONTROL SEGMENTS</h1>
      <form onSubmit={handleSubmit}>
        {segments.map((segment, index) => (
          <div key={index}>
            <label>
              Segment {index + 1}:
              <input
                type="text"
                value={segment}
                onChange={(event) =>
                  handleSegmentChange(index, event.target.value)
                }
              />
            </label>
            <button type="button" onClick={() => handleSegmentDelete(index)}>
              Eliminar
            </button>
            <br />
          </div>
        ))}
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default App;
