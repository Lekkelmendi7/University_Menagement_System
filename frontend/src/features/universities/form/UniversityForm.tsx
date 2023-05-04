import { Button, Form, Segment } from "semantic-ui-react";
import { University } from "../../../app/models/university";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';


export default observer (function UniversityForm(){
    const {universityStore}= useStore();
    const {selectedUniversity,createUniversity, updateUniversity, 
        loading, loadingInitial, loadUniversity}= universityStore;
        
    const {id}=useParams();
    const navigate = useNavigate();

    const[university, setUniversity]= useState({
        id:'',
        name:'',
        date:'',
        email:'',
        phoneNumber:''
    });

    useEffect(() => {
        if (id) loadUniversity(id).then(university => setUniversity(university!));
    }, [id, loadUniversity])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const{name, value}= event.target;
        setUniversity({...university, [name]: value})
    }

    function handleSubmit(){
        if(!university.id){
            university.id = uuid();
            createUniversity(university).then(() => navigate(`/universities/${university.id}`))
        }
        else{
            updateUniversity(university).then(() => navigate(`/universities/${university.id}`))
        }
    }


    if(loadingInitial) return <LoadingComponent  content='Loading university...'/>
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={university.name} name='name' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={university.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='Email' value={university.email} name='email' onChange={handleInputChange}/>
                <Form.Input placeholder='Phone Number' value={university.phoneNumber} name='phoneNumber' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/universities' floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})