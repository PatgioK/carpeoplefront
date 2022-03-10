import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';
import Cars from '../cars';
import { PersonState } from './peopleSlice';
import { PersonButtonGroup } from './personButtonGroup';


interface PersonProps {
  dispatch: Dispatch<any>;
  person: PersonState;
}

function Person(props:PersonProps) {
  const [firstname, setFirstName] = useState(props.person.firstname);
  const [lastname, setLastName] = useState(props.person.lastname);
  const [email, setEmail] = useState(props.person.email);
  const dispatch = useDispatch();

  const fnameEle = <p className='fnameEle'>{props.person.firstname}</p>
  const lnameEle = <p className='fnameEle'>{props.person.lastname}</p>
  const emailEle = <p className='fnameEle'>{props.person.email}</p>
  return (
    <div className="person">
      <h2>person container</h2>
      {fnameEle} {lnameEle} {emailEle}

      <PersonButtonGroup
        dispatch={dispatch}
        person={props.person}
      />
      <Cars />
    </div>
  );
}

export default Person;
