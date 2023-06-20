import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Card } from "semantic-ui-react";



export default observer(function SubjectDetails() {

  const { subjectStore } = useStore();
  const { selectedSubject: subject, loadSubject, loadingInitial } = subjectStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadSubject(id);
  }, [id, loadSubject])

  if (loadingInitial || !subject) return <LoadingComponent />;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{subject.name}</Card.Header>
        <Card.Description>{subject.category}</Card.Description>
        <Card.Description>{subject.ects}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button as={Link} to={`/manageSubject/${subject.id}`} basic color='blue' content='Edit' />
          <Button as={Link} to='/subjects' basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}) 