import Cars from '../cars';
import { PersonState } from './peopleSlice';


function Person(props: PersonState) {
  return (
    <div className="person">
      <h2>person container</h2>
      <p>{props.firstname} {props.lastname} {props.email}</p>
      <Cars />
    </div>
  );
}

export default Person;
