import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from './components/Calendar';
import Formulaire from './components/Form';
import Activities from './components/Activities';
import { useState, useEffect } from 'react';

import Footer from './components/Footer';
//mport Col from 'react-bootstrap/esm/Col';
 // Asegúrate de tener la ruta correcta al componente

// ... (importaciones)

function App() {
  const [pickedDate, setPickedDate] = useState('');
  const [active, setActive] = useState(false);
  const [activitiesList, setActivitiesList] = useState([]);
  const [userValue, setUserValue] = useState('');
  const [changingValue, setChangingValue] = useState(false);
  const [idToDelete, setIdToDelete] = useState('')
  const [otro, setOtro] = useState('');
  const [otroChangingValue, setOtroChangingValue] = useState(false);
  const [otra, setOtra] = useState('');
  const [otraChangingValue, setOtraChangingValue] = useState(false);



  const handleClick = (prev) => {
    if (prev.target.className === 'calendarTd') {
      setActive(true);
    } else if (prev.target.className === 'App') {
      setActive(false);
      setChangingValue(false);
    }

    if (prev.target.className === 'calendar') {
      setChangingValue(false);
    }
  };

  for (let i = 0; i < activitiesList.length; i++) {
    let doublon = 0;

    activitiesList.forEach((element) => {
      element?.date === pickedDate && doublon++;
    });

    if (doublon > 10) {
      alert(
        'Un évenement est déjà créé à cette date, veuillez le supprimer si vous voulez en créer un nouveau'
      );
      activitiesList.pop();
    }
  }

  useEffect(() => {
    const fillLocals = () => {
      let saved = localStorage.getItem('List');
      let locals = JSON.parse(saved);

      if (activitiesList[0]) {
        localStorage.setItem('List', JSON.stringify(activitiesList));
      }
      if (!activitiesList[0] && locals) {
        setActivitiesList(locals);
      }
    };

    fillLocals();
  }, [activitiesList]);

  return (
    <div className="App" onClick={handleClick}>
      <div className="bg"></div>
      <div className="container appContainer">
        <h1>Calendar</h1>
        <div className="cal">
          <div className="calnum">
            <Calendar
              setPickedDate={setPickedDate}
              active={active}
              setActive={setActive}
              changingValue={changingValue}
              setChangingValue={setChangingValue}
            />
            <Formulaire
              pickedDate={pickedDate}
              active={active}
              setActive={setActive}
              setActivitiesList={setActivitiesList}
              activitiesList={activitiesList}
              userValue={userValue}
              setUserValue={setUserValue}
              setChangingValue={setChangingValue}
              otro={otro}
              setOtro={setOtro}
              otroChangingValue={otroChangingValue}
              setOtroChangingValue={setOtroChangingValue}
              otra={otra}
              setOtra={setOtra}
              otraChangingValue={otraChangingValue}
              setOtraChangingValue={setOtraChangingValue}
            />
          </div>

          <Activities
           activitiesList={activitiesList}
           setActive={setActive}
           setIdToDelete={setIdToDelete} 
           idToDelete={idToDelete} 
           setActivitiesList={setActivitiesList}
           changingValue={changingValue}
           setChangingValue={setChangingValue}
        
          
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
