import React, { useState } from 'react';
import { Button, Container, Dropdown, Image, Menu, DropdownMenu, MenuItem } from 'semantic-ui-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { IconContext } from 'react-icons';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export default observer(function Navbar() {
  const { userStore: { user, logout } } = useStore();



  return (
    <>
    <Menu inverted fixed='top'>
      <Container>
        {/* Menu items */}
        <Menu.Item as={NavLink} to='/' header>
        <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
        University Menagement System
        </Menu.Item>
        <Menu.Item as={NavLink} to="/universities" name='Universities'/>
        <Menu.Item as={NavLink} to="/errors" name='Errors'/>
        <Menu.Item >
        <Button as={NavLink} to="/createUniversity" positive content='Add University'/>
        </Menu.Item>
        <MenuItem position='right'>
          <Image src={user?.image || '/assets/user.png'} />
          <Dropdown pointing='top left' text={user?.displayName}>
            <DropdownMenu>
              {/* Dropdown items */}
              <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
              <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </DropdownMenu>
          </Dropdown>
        </MenuItem>
      </Container>
    </Menu>
    </>
  )
})