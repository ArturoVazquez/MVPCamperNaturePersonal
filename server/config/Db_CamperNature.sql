DROP DATABASE camper_nature;
CREATE DATABASE camper_nature;
USE camper_nature;

CREATE TABLE vehicle(
vehicle_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(100),
    examples VARCHAR(150)
);

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
status tinyint NOT NULL DEFAULT 1,      -- 1 -confirmado  |  0 - cacelado
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

SELECT booking_service.booking_id, service.name, service.price, booking_service.amount FROM booking_service JOIN service ON booking_service.service_id = service.service_id WHERE service.is_included = 1 AND service.service_is_deleted = 0;
SELECT * FROM parcel;
SELECT * FROM booking_parcel;


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
('Persona Extra (+ 3 años)', 5.00, 'Coste por persona adicional', '14.jpg', 1, 4),
('Vaciado sin estancia', 5.00, 'Solo vaciado, sin pernocta', 'vaciado.jpg', 1, 1);

INSERT INTO booking (user_id, parcel_id, preferences, start_date, end_date, total)
VALUES
(1,  1, '', '2025-06-07', '2025-06-10', 0.00),
(1,  2, '', '2025-06-07', '2025-06-10', 0.00),
(1,  3, '', '2025-06-07', '2025-06-10', 0.00),
(1,  4, '', '2025-06-07', '2025-06-10', 0.00),
(1,  5, '', '2025-06-07', '2025-06-10', 0.00),
(1,  6, '', '2025-06-07', '2025-06-10', 0.00),
(1,  7, '', '2025-06-07', '2025-06-10', 0.00),
(1,  8, '', '2025-06-07', '2025-06-10', 0.00),
(1,  9, '', '2025-06-07', '2025-06-10', 0.00),
(1, 10, '', '2025-06-07', '2025-06-10', 0.00),
(1, 11, '', '2025-06-07', '2025-06-10', 0.00),
(1, 12, '', '2025-06-07', '2025-06-10', 0.00),
(1, 13, '', '2025-06-07', '2025-06-10', 0.00),
(1, 14, '', '2025-06-07', '2025-06-10', 0.00),
(1, 15, '', '2025-06-07', '2025-06-10', 0.00),
(1, 16, '', '2025-06-07', '2025-06-10', 0.00),
(1, 17, '', '2025-06-07', '2025-06-10', 0.00),
(1, 18, '', '2025-06-07', '2025-06-10', 0.00),
(1, 19, '', '2025-06-07', '2025-06-10', 0.00),
(1, 20, '', '2025-06-07', '2025-06-10', 0.00),
(1, 21, '', '2025-06-07', '2025-06-10', 0.00),
(1, 22, '', '2025-06-07', '2025-06-10', 0.00),
(1, 23, '', '2025-06-07', '2025-06-10', 0.00),
(1, 24, '', '2025-06-07', '2025-06-10', 0.00),
(1, 25, '', '2025-06-07', '2025-06-10', 0.00),
(1, 26, '', '2025-06-07', '2025-06-10', 0.00),
(1, 27, '', '2025-06-07', '2025-06-10', 0.00),
(1, 28, '', '2025-06-07', '2025-06-10', 0.00),
(1, 29, '', '2025-06-07', '2025-06-10', 0.00),
(1, 30, '', '2025-06-07', '2025-06-10', 0.00),
(1, 31, '', '2025-06-07', '2025-06-10', 0.00),
(1, 32, '', '2025-06-07', '2025-06-10', 0.00),
(1, 33, '', '2025-06-07', '2025-06-10', 0.00),
(1, 34, '', '2025-06-07', '2025-06-10', 0.00),
(1, 35, '', '2025-06-07', '2025-06-10', 0.00),
(1, 36, '', '2025-06-07', '2025-06-10', 0.00),
(1, 37, '', '2025-06-07', '2025-06-10', 0.00),
(1, 38, '', '2025-06-07', '2025-06-10', 0.00),
(1, 39, '', '2025-06-07', '2025-06-10', 0.00),
(1, 40, '', '2025-06-07', '2025-06-10', 0.00),
(1, 41, '', '2025-06-07', '2025-06-10', 0.00),
(1, 42, '', '2025-06-07', '2025-06-10', 0.00),
(1, 43, '', '2025-06-07', '2025-06-10', 0.00),
(1, 44, '', '2025-06-07', '2025-06-10', 0.00),
(1, 45, '', '2025-06-07', '2025-06-10', 0.00),
(1, 46, '', '2025-06-07', '2025-06-10', 0.00),
(1, 47, '', '2025-06-07', '2025-06-10', 0.00),
(1, 48, '', '2025-06-07', '2025-06-10', 0.00),
(1, 49, '', '2025-06-07', '2025-06-10', 0.00),
(1, 50, '', '2025-06-07', '2025-06-10', 0.00),
(1, 51, '', '2025-06-07', '2025-06-10', 0.00),
(1, 52, '', '2025-06-07', '2025-06-10', 0.00),
(1, 53, '', '2025-06-07', '2025-06-10', 0.00),
(1, 54, '', '2025-06-07', '2025-06-10', 0.00),
(1, 55, '', '2025-06-07', '2025-06-10', 0.00),
(1, 56, '', '2025-06-07', '2025-06-10', 0.00);
-- Inserción en booking_parcel para cada día de estancia (2025-06-07 a 2025-06-10) para cada reserva.
-- Se asume que los booking_id asignados son del 1 al 56 en el mismo orden de parcel_id (porque la tabla estaba vacía).
INSERT INTO booking_parcel (booking_id, parcel_id, day)
VALUES
-- Reserva 1, parcela 1
(1,  1, '2025-06-07'),
(1,  1, '2025-06-08'),
(1,  1, '2025-06-09'),
(1,  1, '2025-06-10'),
-- Reserva 2, parcela 2
(2,  2, '2025-06-07'),
(2,  2, '2025-06-08'),
(2,  2, '2025-06-09'),
(2,  2, '2025-06-10'),
-- Reserva 3, parcela 3
(3,  3, '2025-06-07'),
(3,  3, '2025-06-08'),
(3,  3, '2025-06-09'),
(3,  3, '2025-06-10'),
-- Reserva 4, parcela 4
(4,  4, '2025-06-07'),
(4,  4, '2025-06-08'),
(4,  4, '2025-06-09'),
(4,  4, '2025-06-10'),
-- Reserva 5, parcela 5
(5,  5, '2025-06-07'),
(5,  5, '2025-06-08'),
(5,  5, '2025-06-09'),
(5,  5, '2025-06-10'),
-- Reserva 6, parcela 6
(6,  6, '2025-06-07'),
(6,  6, '2025-06-08'),
(6,  6, '2025-06-09'),
(6,  6, '2025-06-10'),
-- Reserva 7, parcela 7
(7,  7, '2025-06-07'),
(7,  7, '2025-06-08'),
(7,  7, '2025-06-09'),
(7,  7, '2025-06-10'),
-- Reserva 8, parcela 8
(8,  8, '2025-06-07'),
(8,  8, '2025-06-08'),
(8,  8, '2025-06-09'),
(8,  8, '2025-06-10'),
-- Reserva 9, parcela 9
(9,  9, '2025-06-07'),
(9,  9, '2025-06-08'),
(9,  9, '2025-06-09'),
(9,  9, '2025-06-10'),
-- Reserva 10, parcela 10
(10, 10, '2025-06-07'),
(10, 10, '2025-06-08'),
(10, 10, '2025-06-09'),
(10, 10, '2025-06-10'),
-- Reserva 11, parcela 11
(11, 11, '2025-06-07'),
(11, 11, '2025-06-08'),
(11, 11, '2025-06-09'),
(11, 11, '2025-06-10'),
-- Reserva 12, parcela 12
(12, 12, '2025-06-07'),
(12, 12, '2025-06-08'),
(12, 12, '2025-06-09'),
(12, 12, '2025-06-10'),
-- Reserva 13, parcela 13
(13, 13, '2025-06-07'),
(13, 13, '2025-06-08'),
(13, 13, '2025-06-09'),
(13, 13, '2025-06-10'),
-- Reserva 14, parcela 14
(14, 14, '2025-06-07'),
(14, 14, '2025-06-08'),
(14, 14, '2025-06-09'),
(14, 14, '2025-06-10'),
-- Reserva 15, parcela 15
(15, 15, '2025-06-07'),
(15, 15, '2025-06-08'),
(15, 15, '2025-06-09'),
(15, 15, '2025-06-10'),
-- Reserva 16, parcela 16
(16, 16, '2025-06-07'),
(16, 16, '2025-06-08'),
(16, 16, '2025-06-09'),
(16, 16, '2025-06-10'),
-- Reserva 17, parcela 17
(17, 17, '2025-06-07'),
(17, 17, '2025-06-08'),
(17, 17, '2025-06-09'),
(17, 17, '2025-06-10'),
-- Reserva 18, parcela 18
(18, 18, '2025-06-07'),
(18, 18, '2025-06-08'),
(18, 18, '2025-06-09'),
(18, 18, '2025-06-10'),
-- Reserva 19, parcela 19
(19, 19, '2025-06-07'),
(19, 19, '2025-06-08'),
(19, 19, '2025-06-09'),
(19, 19, '2025-06-10'),
-- Reserva 20, parcela 20
(20, 20, '2025-06-07'),
(20, 20, '2025-06-08'),
(20, 20, '2025-06-09'),
(20, 20, '2025-06-10'),
-- Reserva 21, parcela 21
(21, 21, '2025-06-07'),
(21, 21, '2025-06-08'),
(21, 21, '2025-06-09'),
(21, 21, '2025-06-10'),
-- Reserva 22, parcela 22
(22, 22, '2025-06-07'),
(22, 22, '2025-06-08'),
(22, 22, '2025-06-09'),
(22, 22, '2025-06-10'),
-- Reserva 23, parcela 23
(23, 23, '2025-06-07'),
(23, 23, '2025-06-08'),
(23, 23, '2025-06-09'),
(23, 23, '2025-06-10'),
-- Reserva 24, parcela 24
(24, 24, '2025-06-07'),
(24, 24, '2025-06-08'),
(24, 24, '2025-06-09'),
(24, 24, '2025-06-10'),
-- Reserva 25, parcela 25
(25, 25, '2025-06-07'),
(25, 25, '2025-06-08'),
(25, 25, '2025-06-09'),
(25, 25, '2025-06-10'),
-- Reserva 26, parcela 26
(26, 26, '2025-06-07'),
(26, 26, '2025-06-08'),
(26, 26, '2025-06-09'),
(26, 26, '2025-06-10'),
-- Reserva 27, parcela 27
(27, 27, '2025-06-07'),
(27, 27, '2025-06-08'),
(27, 27, '2025-06-09'),
(27, 27, '2025-06-10'),
-- Reserva 28, parcela 28
(28, 28, '2025-06-07'),
(28, 28, '2025-06-08'),
(28, 28, '2025-06-09'),
(28, 28, '2025-06-10'),
-- Reserva 29, parcela 29
(29, 29, '2025-06-07'),
(29, 29, '2025-06-08'),
(29, 29, '2025-06-09'),
(29, 29, '2025-06-10'),
-- Reserva 30, parcela 30
(30, 30, '2025-06-07'),
(30, 30, '2025-06-08'),
(30, 30, '2025-06-09'),
(30, 30, '2025-06-10'),
-- Reserva 31, parcela 31
(31, 31, '2025-06-07'),
(31, 31, '2025-06-08'),
(31, 31, '2025-06-09'),
(31, 31, '2025-06-10'),
-- Reserva 32, parcela 32
(32, 32, '2025-06-07'),
(32, 32, '2025-06-08'),
(32, 32, '2025-06-09'),
(32, 32, '2025-06-10'),
-- Reserva 33, parcela 33
(33, 33, '2025-06-07'),
(33, 33, '2025-06-08'),
(33, 33, '2025-06-09'),
(33, 33, '2025-06-10'),
-- Reserva 34, parcela 34
(34, 34, '2025-06-07'),
(34, 34, '2025-06-08'),
(34, 34, '2025-06-09'),
(34, 34, '2025-06-10'),
-- Reserva 35, parcela 35
(35, 35, '2025-06-07'),
(35, 35, '2025-06-08'),
(35, 35, '2025-06-09'),
(35, 35, '2025-06-10'),
-- Reserva 36, parcela 36
(36, 36, '2025-06-07'),
(36, 36, '2025-06-08'),
(36, 36, '2025-06-09'),
(36, 36, '2025-06-10'),
-- Reserva 37, parcela 37
(37, 37, '2025-06-07'),
(37, 37, '2025-06-08'),
(37, 37, '2025-06-09'),
(37, 37, '2025-06-10'),
-- Reserva 38, parcela 38
(38, 38, '2025-06-07'),
(38, 38, '2025-06-08'),
(38, 38, '2025-06-09'),
(38, 38, '2025-06-10'),
-- Reserva 39, parcela 39
(39, 39, '2025-06-07'),
(39, 39, '2025-06-08'),
(39, 39, '2025-06-09'),
(39, 39, '2025-06-10'),
-- Reserva 40, parcela 40
(40, 40, '2025-06-07'),
(40, 40, '2025-06-08'),
(40, 40, '2025-06-09'),
(40, 40, '2025-06-10'),
-- Reserva 41, parcela 41
(41, 41, '2025-06-07'),
(41, 41, '2025-06-08'),
(41, 41, '2025-06-09'),
(41, 41, '2025-06-10'),
-- Reserva 42, parcela 42
(42, 42, '2025-06-07'),
(42, 42, '2025-06-08'),
(42, 42, '2025-06-09'),
(42, 42, '2025-06-10'),
-- Reserva 43, parcela 43
(43, 43, '2025-06-07'),
(43, 43, '2025-06-08'),
(43, 43, '2025-06-09'),
(43, 43, '2025-06-10'),
-- Reserva 44, parcela 44
(44, 44, '2025-06-07'),
(44, 44, '2025-06-08'),
(44, 44, '2025-06-09'),
(44, 44, '2025-06-10'),
-- Reserva 45, parcela 45
(45, 45, '2025-06-07'),
(45, 45, '2025-06-08'),
(45, 45, '2025-06-09'),
(45, 45, '2025-06-10'),
-- Reserva 46, parcela 46
(46, 46, '2025-06-07'),
(46, 46, '2025-06-08'),
(46, 46, '2025-06-09'),
(46, 46, '2025-06-10'),
-- Reserva 47, parcela 47
(47, 47, '2025-06-07'),
(47, 47, '2025-06-08'),
(47, 47, '2025-06-09'),
(47, 47, '2025-06-10'),
-- Reserva 48, parcela 48
(48, 48, '2025-06-07'),
(48, 48, '2025-06-08'),
(48, 48, '2025-06-09'),
(48, 48, '2025-06-10'),
-- Reserva 49, parcela 49
(49, 49, '2025-06-07'),
(49, 49, '2025-06-08'),
(49, 49, '2025-06-09'),
(49, 49, '2025-06-10'),
-- Reserva 50, parcela 50
(50, 50, '2025-06-07'),
(50, 50, '2025-06-08'),
(50, 50, '2025-06-09'),
(50, 50, '2025-06-10'),
-- Reserva 51, parcela 51
(51, 51, '2025-06-07'),
(51, 51, '2025-06-08'),
(51, 51, '2025-06-09'),
(51, 51, '2025-06-10'),
-- Reserva 52, parcela 52
(52, 52, '2025-06-07'),
(52, 52, '2025-06-08'),
(52, 52, '2025-06-09'),
(52, 52, '2025-06-10'),
-- Reserva 53, parcela 53
(53, 53, '2025-06-07'),
(53, 53, '2025-06-08'),
(53, 53, '2025-06-09'),
(53, 53, '2025-06-10'),
-- Reserva 54, parcela 54
(54, 54, '2025-06-07'),
(54, 54, '2025-06-08'),
(54, 54, '2025-06-09'),
(54, 54, '2025-06-10'),
-- Reserva 55, parcela 55
(55, 55, '2025-06-07'),
(55, 55, '2025-06-08'),
(55, 55, '2025-06-09'),
(55, 55, '2025-06-10'),
-- Reserva 56, parcela 56
(56, 56, '2025-06-07'),
(56, 56, '2025-06-08'),
(56, 56, '2025-06-09'),
(56, 56, '2025-06-10');