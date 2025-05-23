import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./verified.css";

const Verified = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error")) {
      setIsError(true);
    }
  }, [location.search]);

  return (
    <section className="verified-section d-flex justify-content-center align-items-center text-center">
      <Container>
        <h1 className="mb-4">
          {isError ? "Enlace inválido o expirado" : "Cuenta verificada"}
        </h1>
        <p className="mb-4">
          {isError
            ? "El enlace de verificación no es válido o ya fue usado. Si ya verificaste tu cuenta, inicia sesión normalmente."
            : "¡Tu cuenta ha sido activada! Ya puedes iniciar sesión."}
        </p>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Ir al login
        </Button>
      </Container>
    </section>
  );
};

export default Verified;
