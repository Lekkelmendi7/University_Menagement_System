import { Button, Form, Segment } from "semantic-ui-react";
import { University } from "../../../app/models/university";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer (function UniversityForm(){
    const {universityStore}= useStore();
    const {selectedUniversity, closeForm, createUniversity, updateUniversity, loading}= universityStore;
    
    const initialState = selectedUniversity ?? {
        id:'',
        name:'',
        date:'',
        email:'',
        phoneNumber:''
    }

    const[university, setUniversity]= useState(initialState);

 

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const{name, value}= event.target;
        setUniversity({...university, [name]: value})
    }

    function handleSubmit(){
        university.id ? updateUniversity(university) : createUniversity(university);
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={university.name} name='name' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={university.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='Email' value={university.email} name='email' onChange={handleInputChange}/>
                <Form.Input placeholder='Phone Number' value={university.phoneNumber} name='phoneNumber' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='left' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})