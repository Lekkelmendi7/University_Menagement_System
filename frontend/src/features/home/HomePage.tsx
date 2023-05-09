import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';

export default function HomePage() {
    return(
        <Segment inverted textAlign='center' vertical className='masthead'> 
        <Container content='text'>
            <Header as='h1' inverted>
                <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
            </Header>
            <Header as='h2' inverted content='University Menagement System'/>
            <Button as={Link} to='/universities' size='huge' inverted>
                Take me to the Universities!
            </Button>
            </Container>
        </Segment>
    )
}