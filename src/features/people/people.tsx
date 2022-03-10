import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectPerson, fetchPersonAsync, Statuses, selectStatus } from "./peopleSlice";
import Person from './person';
import { PersonState } from "./peopleSlice";
import {PersonForm } from "./personForm";

function People() {
  //usestate just to render containers for now
  const [PeopleList, setPeopleList] = useState([0]);

  const people = useAppSelector(selectPerson);
  const status = useAppSelector(selectStatus);


  // workaround: using normal dispatch, useAppDispatch cant be used in callback
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPersonAsync());
  }, [dispatch])

  let contents;


  if(status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = <><div className="personcontainer">
      <h3>{status}</h3>
      <PersonForm />
      
      {people && people.length > 0 && people.map(person => {
        let {firstname, lastname, email, id} = person;
        return <Person key={person.id} {...person}/>
      })}
      </div></>
  }

  return ( <div>
    {contents}
    </div>
  );
}
export default People;
