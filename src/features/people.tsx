import { useState } from "react";
import Person from './person';

function People() {
  const [PeopleList, setPeople] = useState([0]);
  return (
    <div className="personcontainer">
      <h1>people container</h1>
      {PeopleList.map((peep, peepidx) => {
        return <Person key={peepidx} personData={peep} />
      })}
    </div>
  );
}
export default People;
