import Table from 'react-bootstrap/Table';
//import { BsPen } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdGppGood} from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import React,  { useState} from 'react';

const Activities = (props) => {
	const [changingRow, setChangingRow] = useState(null);
  
	const deleteRow = (idToDelete) => {
	  const updatedActivities = props.activitiesList.filter(activity => activity.id !== idToDelete);
  
	  props.setActivitiesList(updatedActivities);
  
	  if (updatedActivities.length === 0) {
		localStorage.clear();
	  }
  
	  setChangingRow(null);
	  props.setIdToDelete('');
	};
  
	const deleteAll = () => {
	  props.setActivitiesList([]);
	  localStorage.clear();
	  setChangingRow(null);
	};
  
	//const changeRow = (idToChange) => {
	//  setChangingRow(idToChange);
	 // props.setIdToDelete(idToChange);
	//};
  

	const validateRow = (idToUpdate, field, updatedValue) => {
	  const indexToUpdate = props.activitiesList.findIndex(activity => activity.id === idToUpdate);
  
	  if (indexToUpdate !== -1 && updatedValue.trim() !== '') {
		const updatedActivities = [...props.activitiesList];
		updatedActivities[indexToUpdate][field] = updatedValue;
		props.setActivitiesList(updatedActivities);
	  }
  
	  setChangingRow(null);
	  props.setChangingValue(false);
	  props.setIdToDelete('');
	};
  
	const handleClick = () => {
	  props.setActive(false);
	};
  
	const handleCellClick = (id) => {
	  if (changingRow === id) {
		// Click en una celda que ya está en modo de edición
		return;
	  }
  
	  setChangingRow(id);
	  props.setIdToDelete(id);
	};
  
	return (
	  <div className="container mt-3 p-3 rounded activities" onClick={handleClick}>
		<Table striped bordered hover size="sm">
		  <thead>
			<tr>
			  <th>#</th>
			  <th>Date</th>
			  <th>Asignatura</th>
			  <th>Indicador de logro</th>
			  <th>Actividades</th>
			</tr>
		  </thead>
		  <tbody>
			{props.activitiesList.map((element, i) => (
			  <tr key={element.id}>
				<td>{i + 1}</td>
				<td>{element.date}
				</td>
				<td>
				  <div onClick={() => handleCellClick(element.id)}>
					{changingRow === element.id ? (
					  <div>
						<input
						  type="text"
						  value={element.value}
						  onChange={(e) => validateRow(element.id, 'value', e.target.value)}
						  onBlur={() => setChangingRow(null)}
						/>
						<MdGppGood css={'color: green'} onClick={() => validateRow(element.id, 'value', element.value)} />
					  </div>
					) : (
					  <div>{element.value}</div>
					)}
				  </div>
				</td>
				<td>
				  <div onClick={() => handleCellClick(element.id)}>
					{changingRow === element.id ? (
					  <div>
						<input
						  type="text"
						  value={element.otroValue}
						  onChange={(e) => validateRow(element.id, 'otroValue', e.target.value)}
						  onBlur={() => setChangingRow(null)}
						/>
						<MdGppGood css={'color: green'} onClick={() => validateRow(element.id, 'otroValue', element.otroValue)} />
					  </div>
					) : (
					  <div>{element.otroValue}</div>
					)}
				  </div>
				</td>
				<td>
				  <div onClick={() => handleCellClick(element.id)}>
					{changingRow === element.id ? (
					  <div>
						<input
						  type="text"
						  value={element.otraValue}
						  onChange={(e) => validateRow(element.id, 'otraValue', e.target.value)}
						  onBlur={() => setChangingRow(null)}
						/>
						<MdGppGood css={'color: green'} onClick={() => validateRow(element.id, 'otraValue', element.otraValue)} />
					  </div>
					) : (
					  <div>{element.otraValue}</div>
					)}
					<RiDeleteBinLine onClick={() => deleteRow(element.id)} />
				  </div>
				</td>
			  </tr>
			))}
		  </tbody>
		</Table>
		{props.activitiesList.length > 1 ? (
		  <Button variant="danger" onClick={deleteAll}>
			Delete all list
		  </Button>
		) : null}
	  </div>
	);
  };
  
  export default Activities;
  