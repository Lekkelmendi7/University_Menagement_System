import React from 'react';
import { Button, Container, Menu} from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { NavLink } from 'react-router-dom';



export default function NavBar(){
    const {universityStore}= useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    University Menagement System
                </Menu.Item>
                <Menu.Item as={NavLink} to='/universities' name='Universities'/>
                <Menu.Item as={NavLink} to='/errors' name='Errors'/>
                <Menu.Item >
                <Button as={NavLink} to='/createUniversity' positive content='Add University'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}