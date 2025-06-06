import React, { useEffect, useState, useContext } from 'react';
import api from '../API/axiosInstance';
import { Card, Row, Col, Alert, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { FaCalendarAlt, FaUserMd, FaClock, FaTooth } from 'react-icons/fa';
import NavBarCrud from './NavBar/NavBarCrud';

const MiCitasDoctores = () => {
  const [citas, setCitas] = useState([]);
  const [doctoras, setDoctoras] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDoctora, setSelectedDoctora] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchDoctoras();
    fetchServicios();
    fetchCitas();
  }, []);

  const fetchDoctoras = async () => {
    try {
      const response = await api.get('/doctora');
      setDoctoras(response.data);
    } catch (err) {
      setError('Error al cargar las doctoras');
    }
  };

  const fetchServicios = async () => {
    try {
      const response = await api.get('/servicio');
      setServicios(response.data);
    } catch (err) {
      // No crítico
    }
  };

  const fetchCitas = async () => {
    try {
      const response = await api.get('/citas');
      setCitas(response.data.data || response.data || []);
    } catch (err) {
      setError('Error al cargar las citas');
    }
  };

  const getServicioNombre = (id) => {
    const servicio = servicios.find(s => s._id === (id?._id || id));
    return servicio ? servicio.Nombre : 'Sin asignar';
  };

  const getDoctoraNombre = (id) => {
    const doctora = doctoras.find(d => d._id === (id?._id || id));
    return doctora ? `${doctora.Nombres} ${doctora.Apellidos}` : 'Sin asignar';
  };

  const citasFiltradas = selectedDoctora
    ? citas.filter(cita => cita.doctora?._id === selectedDoctora || cita.doctora === selectedDoctora)
    : citas;

  // Obtener el rol del usuario
  const userRol = typeof user?.Permiso === "string" ? user.Permiso : user?.Permiso?.rol || user?.Permiso?.Rol || "";

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <NavBarCrud userRol={userRol} />
      <div style={{ flex: 1, padding: '20px', marginLeft: '250px' }}>
        <div className="container py-4">
          <h2 className="mb-4 text-center">Agenda de Citas por Doctor(a)</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-4">
            <Form.Label>Filtrar por Doctor(a)</Form.Label>
            <Form.Select
              value={selectedDoctora}
              onChange={(e) => setSelectedDoctora(e.target.value)}
            >
              <option value="">Todos los doctores</option>
              {doctoras.map(doc => (
                <option key={doc._id} value={doc._id}>
                  {doc.Nombres} {doc.Apellidos}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row>
            {citasFiltradas.length === 0 ? (
              <Col className="text-center">
                <Alert variant="info">No hay citas disponibles</Alert>
              </Col>
            ) : (
              citasFiltradas.map(cita => (
                <Col md={4} sm={6} xs={12} key={cita._id} className="mb-4">
                  <Card style={{ 
                    borderRadius: 15, 
                    boxShadow: '0 2px 12px rgba(73,182,178,0.08)',
                    border: 'none'
                  }}>
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <FaUserMd size={24} color="#49b6b2" className="me-2" />
                        <Card.Title className="mb-0" style={{ color: '#556f70' }}>
                          {getDoctoraNombre(cita.doctora)}
                        </Card.Title>
                      </div>
                      
                      <div className="d-flex align-items-center mb-2">
                        <FaTooth size={20} color="#49b6b2" className="me-2" />
                        <span style={{ color: '#7d7e7d' }}>
                          {getServicioNombre(cita.servicios)}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mb-2">
                        <FaCalendarAlt size={20} color="#49b6b2" className="me-2" />
                        <span style={{ color: '#7d7e7d' }}>
                          {cita.fecha ? cita.fecha.split('T')[0] : 'N/A'}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mb-3">
                        <FaClock size={20} color="#49b6b2" className="me-2" />
                        <span style={{ color: '#7d7e7d' }}>
                          {cita.hora || 'N/A'}
                        </span>
                      </div>

                      <div className="mt-3">
                        <small className="text-muted">
                          Paciente: {cita.nombreCliente} {cita.apellidoCliente}
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default MiCitasDoctores; 