import { useState } from 'react';
import Cars from '../cars';
import { PersonState } from './peopleSlice';


function Person(props: PersonState) {
  const [firstname, setFirstName] = useState(props.firstname);
  const [lastname, setLastName] = useState(props.lastname);
  const [email, setEmail] = useState(props.email);

  const fnameEle = <p className='fnameEle'>{props.firstname}</p>
  const lnameEle = <p className='fnameEle'>{props.lastname}</p>
  const emailEle = <p className='fnameEle'>{props.email}</p>
  return (
    <div className="person">
      <h2>person container</h2>
      {fnameEle} {lnameEle} {emailEle}

      <Cars />
    </div>
  );
}

export default Person;
