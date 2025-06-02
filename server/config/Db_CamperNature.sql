-- DROP DATABASE camper_nature;
CREATE DATABASE camper_nature;
USE camper_nature;

CREATE TABLE user(
user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50), 
    lastname VARCHAR(100), 
    address VARCHAR(200), 
	prefix VARCHAR(10),
    phone VARCHAR(30), 
    birth_date DATE,
    email VARCHAR(100) NOT NULL UNIQUE, 
    password VARCHAR(200) NOT NULL,
    country VARCHAR(100), 
    document_type VARCHAR(50),
    document_number VARCHAR(30) UNIQUE,
    car_registration VARCHAR(30),
    car_brand VARCHAR(250),
    user_type TINYINT NOT NULL DEFAULT 1,
    is_accepted BOOLEAN NOT NULL DEFAULT 0,  -- politica de uso
    is_deleted BOOLEAN NOT NULL DEFAULT 0,  -- si el usuario decide cerrar la cuenta
    is_confirmed BOOLEAN NOT NULL DEFAULT 0, -- si ha confirmado con el email
    is_disabled BOOLEAN NOT NULL DEFAULT 0,  -- si el admin lo deshabilita
    registration_date DATETIME NOT NULL default CURRENT_TIMESTAMP,
    vehicle_id INT UNSIGNED,
    CONSTRAINT fk_vehicle_1 FOREIGN KEY (vehicle_id) 
    REFERENCES vehicle(vehicle_id) ON DELETE CASCADE ON UPDATE CASCADE
);

select * FROM user;


CREATE TABLE parcel(
parcel_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    size tinyint unsigned
);


CREATE TABLE booking(
booking_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    parcel_id TINYINT UNSIGNED NOT NULL,    
    preferences VARCHAR(255),
    reservation_date DATETIME NOT NULL default CURRENT_TIMESTAMP,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total DECIMAL(7,2) NOT NULL,  -- 99999,99
status tinyint NOT NULL DEFAULT 1,      -- 1 -confirmado  |  2 - cacelado
    CONSTRAINT fk_user_1 FOREIGN KEY (user_id) 
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_parcel_1 FOREIGN KEY (parcel_id)
    REFERENCES parcel(parcel_id)
);
SELECT * FROM booking;

CREATE TABLE service(
service_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(6,2) NOT NULL, -- 9999,99
    description VARCHAR(255) NOT NULL,
    service_img VARCHAR(255) NOT NULL,
    is_included BOOLEAN NOT NULL DEFAULT 0,
    max_total TINYINT NOT NULL,
    service_is_deleted BOOLEAN NOT NULL DEFAULT 0
);

select * from service;


CREATE TABLE booking_service(
booking_id BIGINT UNSIGNED NOT NULL,
    service_id SMALLINT UNSIGNED NOT NULL,
    amount TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (booking_id, service_id),
    CONSTRAINT fk_booking_1 FOREIGN KEY (booking_id)
    REFERENCES booking(booking_id),
    CONSTRAINT fk_service_1 FOREIGN KEY (service_id)
    REFERENCES service(service_id)    
);

SELECT * FROM booking_service;
create table booking_parcel(
    booking_id BIGINT UNSIGNED NOT NULL,
    parcel_id TINYINT UNSIGNED NOT NULL,
    day DATE NOT NULL,
    CONSTRAINT fk_booking_2 FOREIGN KEY (booking_id)
    REFERENCES booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_parcel_2 FOREIGN KEY (parcel_id)
    REFERENCES parcel(parcel_id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM parcel;
SELECT * FROM booking_parcel;


-- Insertar usuarios
INSERT INTO user (name, lastname, address, prefix, phone, birth_date, email, password, country, document_type, document_number, car_registration, car_brand, vehicle_id, is_confirmed)
VALUES
('Laura', 'Pérez Gómez', 'Calle del Sol, 123', '+34', '612345678', '1990-05-20', 'laura@example.com', 'hashed_password_1', 'España', 'DNI', '12345678A', '12345', 'Ford Transit', 2, 1),
('Carlos', 'Ruiz Ortega', 'Av. de la Playa, 45', '+34', '634567890', '1985-10-15', 'carlos@example.com', 'hashed_password_2', 'España', 'DNI', '87654321B', '1234A', 'VW California', 1, 1);

-- Insertar 56 parcelas: 44 de 60 m², 11 de 50 m², 1 de 70 m² (adaptada)
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (60);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (50);
INSERT INTO parcel (size) VALUES (70);

-- Insertar reservas
INSERT INTO booking (user_id, parcel_id, preferences, start_date, end_date, total, status)
VALUES
(1, 1, 'Cerca de baños', '2025-06-10', '2025-06-15', 125.00, 1),
(2, 2, 'Sombra por la mañana', '2025-07-01', '2025-07-07', 210.00, 2);

-- Servicios incluidos (is_included = 0)
INSERT INTO service (name, price, description, service_img, is_included, max_total) VALUES
('Parcela para una autocaravana o furgoneta camper', 0.00, 'Incluido en la tarifa base', 'camper.png', 0, 1),
('2 personas', 0.00, 'Incluido en la tarifa base', 'dospersonas.png', 0, 2),
('Aseos y duchas con agua caliente', 0.00, 'Uso ilimitado', 'ducha.png', 0, 1),
('Carga de agua potable y vaciado', 0.00, 'Servicio de carga y vaciado', 'aguaPotable.png', 0, 1),
('Niños/as de hasta 3 años', 0.00, 'Gratuito', 'bebe.png', 0, 1),
('1 mascota', 0.00, 'Incluido en la tarifa base', 'perrito.png', 0, 1),
('Wifi en zonas comunes', 0.00, 'Conexión gratuita', 'wifi.png', 0, 1);
-- Temporadas (también se usan como servicios con is_included = 0)
INSERT INTO service (name, price, description, service_img, is_included, max_total) VALUES
('Temporada Alta', 20.00, 'Julio, Agosto, Semana Santa y San Juan', 'tempalta.png', 0, 1),
('Temporada Baja', 15.00, 'Resto del año', 'tembaja.png', 0, 1);
-- Servicios extra (is_included = 1)
INSERT INTO service (name, price, description, service_img, is_included, max_total) VALUES
('Electricidad', 5.00, 'Toma de corriente por día', '10.jpg', 1, 1),
('Persona Extra (+ 3 años)', 5.00, 'Coste por persona adicional', '14.jpg', 1, 5),
('Vaciado sin estancia', 5.00, 'Solo vaciado, sin pernocta', 'vaciado.jpg', 1, 1);
-- Insertar relación reserva-servicio
INSERT INTO booking_service (booking_id, service_id, amount) VALUES
(1, 7, 1),
(1, 2, 1),
(2, 7, 1),
(2, 9, 1);
