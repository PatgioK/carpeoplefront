import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "react";
import Cars from "../cars";
import { PersonState } from "./peopleSlice";
import { PersonButtonGroup } from "./personButtonGroup";
import { setSyntheticLeadingComments } from "typescript";

interface PersonProps {
  dispatch: Dispatch<any>;
  person: PersonState;
  toggleEditForm: () => void;
  submitEdit: any;
  personToEdit: number;
}


function Person(props: PersonProps) {
  const [firstname, setFirstName] = useState(props.person.firstname);
  const [lastname, setLastName] = useState(props.person.lastname);
  const [email, setEmail] = useState(props.person.email);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(props.personToEdit === props.person.id)

  useEffect(() => {
    setIsEditing(props.personToEdit === props.person.id)
  }, [props.personToEdit, props.person.id])


function submitHandler(e: React.FormEvent<HTMLElement>) {
  e.preventDefault();
  const formData = {
    person: {
      id: props.person.id,
      firstname: props.person.firstname,
      lastname: props.person.lastname,
      email: props.person.email,
    }
  }
  props.submitEdit(formData)
  resetState();
}

function resetState() {
  setFirstName(props.person.firstname);
  setLastName(props.person.lastname);
  setEmail(props.person.email);
}

  const fnameEle = <p className="fnameEle">{props.person.firstname}</p>;
  const lnameEle = <p className="fnameEle">{props.person.lastname}</p>;
  const emailEle = <p className="fnameEle">{props.person.email}</p>;

  const editableFName = (
    <input
      type="text"
      className="form-control text-start"
      value={firstname}
      onChange={(e) => setFirstName(e.target.value)}
    ></input>
  );
  const editableLName = (
    <input
      type="text"
      className="form-control text-start"
      value={lastname}
      onChange={(e) => setLastName(e.target.value)}
    ></input>
  );
  const editableEmail = (
    <input
      type="text"
      className="form-control text-start"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    ></input>
  );

const submitButton = <button
    type='submit'
    className=''
    onClick={(e) => submitHandler(e)}>submit</button>

  return (
    <div className="person">
      <h2>person container</h2>
      {isEditing ? editableFName : fnameEle} {isEditing ? editableLName :lnameEle} {isEditing ? editableEmail :emailEle}
      {isEditing ? submitButton : ""}
      <PersonButtonGroup dispatch={dispatch} person={props.person} toggleEditForm={props.toggleEditForm} />
      <Cars />
    </div>
  );
}

export default Person;
