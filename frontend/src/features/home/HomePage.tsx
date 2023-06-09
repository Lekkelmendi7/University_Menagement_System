import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    const ridirectToLogin = () => {
        modalStore.openModal(<LoginForm/>);
    }

    const redirectToRegister = () => {
        modalStore.openModal(<RegisterForm />);
    }

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container content='text'>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    University Management System
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content={`Welcome back ${userStore.user?.displayName}`} />
                        <Button as={Link} to='/universities' size='huge' inverted>
                            Go to Universities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register
                        </Button> 
                    </>
                )}


            </Container>
        </Segment>
    )
})