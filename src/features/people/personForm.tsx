import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createPersonAsync } from './peopleSlice';


function PersonForm() {
    //pass dispatch through props?
    const dispatch = useDispatch();
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [eMail, setEmail] = useState('');

    function submitHandler(e: React.FormEvent<HTMLElement>) {
        //don't want to go anywhere so prevent default
        e.preventDefault();
        const formData = {
            person: {
                firstname: fname,
                lastname: lname,
                email: eMail,
            }
        }
        dispatch(createPersonAsync(formData));
        resetState();
    }

    function resetState() {
        setFName('');
        setLName('');
        setEmail('');
    }

    return <div>
        <h1>person form</h1>
        <form>
            <input
            type='text'
            className='form-control text-start'
            name='fnameinput'
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            />
            <input
            type='text'
            className='form-control text-start'
            name='fnameinput'
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            />
            <input
            type='text'
            className='form-control text-start'
            name='fnameinput'
            value={fname}
            onChange={(e) => setEmail(e.target.value)}
            />

            <button
                type='submit'
                onClick={(e) => submitHandler(e)}>Submit</button>

        </form>
    </div>

}

export default PersonForm();