import { Card, Button } from 'react-bootstrap';

export const UserCard = ({ user, onDisabled, onEnabled }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-2">
          {user.name} {user.lastname}
        </Card.Title>
        <Card.Text>
          <strong>Email:</strong> {user.email} <br />
          <strong>Teléfono:</strong> {user.phone} <br />
          <strong>Documento:</strong> {user.document_type} -{' '}
          {user.document_number}
        </Card.Text>
        <div className="d-flex justify-content-end">
          {user.is_disabled === 0 ? (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDisabled(user.user_id)}
            >
              Deshabilitar
            </Button>
          ) : (
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => onEnabled(user.user_id)}
            >
              Habilitar
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
