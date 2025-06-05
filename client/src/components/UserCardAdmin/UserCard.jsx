import { Card, Button, Row, Col } from 'react-bootstrap';

export const UserCard = ({ user, onDisabled, onEnabled }) => {
  return (
    <Card className="mb-4 shadow-sm w-100">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <h5 className="fw-bold mb-2">
              {user.name} {user.lastname}
            </h5>
          </Col>
          <Col xs={12} md={6} className="text-md-end text-center mt-2 mt-md-0">
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
          </Col>
        </Row>
        <hr className="my-3" />
        <Row className="text-muted">
          <Col xs={12} md={4} className="mb-2">
            <div>
              <strong>Email:</strong>
              <div className="text-break">{user.email}</div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <div>
              <strong>Teléfono:</strong>
              <div>{user.phone}</div>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <div>
              <strong>Documento:</strong>
              <div>
                {user.document_type} - {user.document_number}
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
