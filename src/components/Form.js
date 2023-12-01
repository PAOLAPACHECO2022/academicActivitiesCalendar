import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Formulaire = (props) => {
  const [userValue, setUserValue] = useState('');
  const [otroValue, setOtroValue] = useState('');
  const [otraValue, setOtraValue] = useState('');

  const handleChange = (e) => {
    setUserValue(e.target.value);
    props.setChangingValue(false);
  };

  const otrohandleChange = (e) => {
    setOtroValue(e.target.value);
    props.setOtroChangingValue(false);
  };

  const otrahandleChange = (e) => {
    setOtraValue(e.target.value);
    props.setOtraChangingValue(false);
  };

  const Submit = (e) => {
	e.preventDefault();
  
	if (userValue === '') {
	  return;
	} else {
	  props.setActivitiesList([
		...props.activitiesList,
		{
		  date: props.pickedDate,
		  value: userValue,
		  otroValue: otroValue,
		  otraValue: otraValue,
		  id: props.activitiesList.length,
		},
	  ]);
	  setUserValue('');
	  setOtroValue('');
	  setOtraValue('');
	}
  
	props.setChangingValue(false);
	props.setActive(false);
  };

  return (
    
		<div className="container w-75 mt-3 p-3 border border-success rounded activities" active={props.active ? 'true' : 'false'}>
      <h2>ACTIVIDAD</h2>
      <Form onSubmit={Submit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Date: {props.pickedDate}</Form.Label>
        </Form.Group>


		<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
		<Form.Select aria-label="Default select example"as="textarea" rows={3} value={userValue} onChange={handleChange} required >
      <option>Asignatura</option>
      <option value="Matemàticas">Matemàticas</option>
      <option value="Sociales">Sociales</option>
      <option value="Ingles">Ingles</option>
	  <option value="Humanidades">Humanidades</option>
	  <option value="Quimica">Quimica</option>
	  <option value="Fisica">Fisica</option>
    </Form.Select>
	</Form.Group>
        
      
        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea2">
          <Form.Label>Indicador de logro</Form.Label>
          <Form.Control as="textarea" rows={3} value={otroValue} onChange={otrohandleChange} required />
        </Form.Group>
        <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} value={otraValue} onChange={otrahandleChange} required />
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Formulaire;
