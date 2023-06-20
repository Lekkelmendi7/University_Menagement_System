import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function SubjectList() {
    const { subjectStore } = useStore();
    const { deleteSubject, subjects,  loading } = subjectStore;

    const [target, setTarget] = useState('');

    function handleSubjectDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteSubject(id);
    }

    return (
        <Segment>
            <Item.Group divided>
            {subjects.map((subject) => (
                    <Item key={subject.id}>
                        <Item.Content>
                            <Item.Header as='a'>{subject.name}</Item.Header>
                            <Item.Description>
                                <div>Category: {subject.category}</div>
                                <div>ECTS: {subject.ects}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/subjects/${subject.id}`} floated='right' content='View' color='blue' />
                                <Button
                                    name={subject.id}
                                    loading={loading && target === subject.id}
                                    onClick={(s) => handleSubjectDelete(s, subject.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    ))}
            </Item.Group>
        </Segment>
    )
})