import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Container, Row, Col } from 'react-bootstrap';
import { es } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { datesCalculator } from '../../../helpers/datesCalculator';
import { format, differenceInCalendarDays } from 'date-fns';
import Swal from 'sweetalert2';
import './editReserveUser.css';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: false,
});

const EditReserveUser = () => {
  const { id: booking_id } = useParams();
  const { token } = useContext(AuthContext);

  const [reserve, setReserve] = useState();
  const [serviceList, setServiceList] = useState([]);
  const [serviceCost, setServiceCost] = useState(0);
  const [oldPrice, setOldPrice] = useState();
  const [newPrice, setNewPrice] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [dataPackage, setdataPackage] = useState({});
  const [firstSelected, setFirstSelected] = useState();
  const [secondSelected, setSecondSelected] = useState();
  const [dataParcelUpdate, setDataParcelUpdate] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getReserveById = async () => {
      try {
        const result = await fetchData(
          `user/getReserveById/${booking_id}`,
          'get',
          null,
          token
        );
        setReserve(result.data);

        if (
          result.data &&
          result.data[0]?.start_date &&
          result.data[0]?.end_date
        ) {
          const resultPrice = datesCalculator(
            result.data[0].start_date,
            result.data[0].end_date
          );
          setOldPrice(resultPrice);
        }
      } catch (error) {
        console.log('Error al traer la reserva:', error);
      }
    };

    getReserveById();
  }, [booking_id, token]);

  console.log('DIME QUE AQUI ESTÁ EL PARCEL ID', reserve);

  useEffect(() => {
    const getServiceByReserve = async () => {
      try {
        const result = await fetchData(
          `user/getServiceByReserve/${booking_id}`,
          'get',
          null,
          token
        );
        const servicios = result.data;
        setServiceList(servicios);

        if (firstSelected && secondSelected) {
          const daysCount = differenceInCalendarDays(
            secondSelected,
            firstSelected
          );
          let calc = 0;

          servicios.forEach((serv) => {
            calc += daysCount * serv.price * serv.amount;
          });

          setServiceCost(calc);
        } else {
          setServiceCost(0);
        }
      } catch (error) {
        console.log('Error al traer servicios:', error);
      }
    };

    getServiceByReserve();
  }, [booking_id, token, firstSelected, secondSelected]);

  useEffect(() => {
    if (firstSelected && secondSelected) {
      if (secondSelected > firstSelected) {
        try {
          const formattedStart = format(firstSelected, 'yyyy-MM-dd');
          const formattedEnd = format(secondSelected, 'yyyy-MM-dd');
          const resultado = datesCalculator(formattedStart, formattedEnd);
          setNewPrice(resultado);
        } catch (error) {
          console.error('Error al calcular el nuevo precio:', error);
        }
      } else {
        setNewPrice(null);
      }
    } else {
      setNewPrice(null);
    }
  }, [firstSelected, secondSelected]);

  useEffect(() => {
    if (newPrice && typeof newPrice.priceTotal === 'number') {
      setTotalPrice(newPrice.priceTotal + serviceCost);
    } else {
      setTotalPrice(null);
    }
  }, [newPrice, serviceCost]);

  useEffect(() => {
    if (firstSelected && secondSelected && totalPrice !== null) {
      const formattedStart = format(firstSelected, 'yyyy-MM-dd');
      const formattedEnd = format(secondSelected, 'yyyy-MM-dd');

      setdataPackage({
        booking_id,
        start_date: formattedStart,
        end_date: formattedEnd,
        total: totalPrice,
      });
    }
  }, [firstSelected, secondSelected, totalPrice]);

  useEffect(() => {
    if (firstSelected && secondSelected && reserve?.[0]?.parcel_id) {
      const days = differenceInCalendarDays(secondSelected, firstSelected);
      if (days > 0) {
        setDataParcelUpdate({
          booking_id,
          parcel_id: reserve[0].parcel_id,
          startDate: firstSelected,
          totalDays: days,
        });
      } else {
        setDataParcelUpdate(null);
      }
    } else {
      setDataParcelUpdate(null);
    }
  }, [firstSelected, secondSelected, reserve, booking_id]);

  const handleUpdate = async () => {
    const result = await swalWithBootstrapButtons.fire({
      title: '¿Está seguro de querer modificar la reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, modificar reserva',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await fetchData(
          'user/reserveUpdate',
          'put',
          { dataPackage, dataParcelUpdate },
          token
        );
        await swalWithBootstrapButtons.fire({
          title: '¡Reserva Modificada!',
          text: 'Tu reserva ha sido modificada.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        navigate(-1);
      } catch (error) {
        console.error(error);
        await swalWithBootstrapButtons.fire({
          title: 'Error',
          text: 'No se pudo modificar la reserva. Intenta más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: 'Acción Cancelada',
        text: 'No se han aplicado los cambios',
        icon: 'info',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  const isDataPackageComplete =
    dataPackage &&
    dataPackage.booking_id &&
    dataPackage.start_date &&
    dataPackage.end_date &&
    typeof dataPackage.total === 'number';

  console.log(dataPackage);

  return (
    <div>
      <section className='editReserveUser-1'>
        <Container>
          <h1 className="text-center pt-5">{`Número de reserva: ${booking_id}`}</h1>
          <h2 className="text-center mt-5">
            Fecha a modificar (Los servicios se ajustarán al cambio de días)
          </h2>
          <Row className="pt-5 gap-4">
            <Col className="d-flex justify-content-center">
              <DayPicker
                captionLayout="dropdown"
                animate
                mode="single"
                selected={firstSelected}
                locale={es}
                onSelect={setFirstSelected}
                disabled={{ before: new Date() }}
                footer={
                  <div className="footer-centrado">
                    {firstSelected
                      ? `Día entrada modificado: ${firstSelected.toLocaleDateString()}`
                      : 'Selecciona las fechas'}
                  </div>
                }
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <DayPicker
                captionLayout="dropdown"
                animate
                mode="single"
                selected={secondSelected}
                locale={es}
                onSelect={setSecondSelected}
                disabled={{ before: new Date() }}
                footer={
                  <div className="footer-centrado">
                    {secondSelected
                      ? `Día salida modificado: ${secondSelected.toLocaleDateString()}`
                      : 'Selecciona las fechas'}
                  </div>
                }
              />
            </Col>
          </Row>

          <Row className="mt-5 editReserveUser-2 pb-2">
            <Col className="col-12 col-md-6 col-lg-6 d-flex justify-content-center flex-column align-items-center">
              <article>
                <h3 className='text-decoration-underline pb-2'>Reserva Actual:</h3>
                <p>
                  <strong>Fecha de entrada:</strong> {reserve?.[0]?.start_date} a las 12:00 PM
                </p>
                <p><strong>Fecha de salida:</strong> {reserve?.[0]?.end_date} a las 12:00 PM</p>
                <p><strong>Precio total:</strong> {reserve?.[0]?.total} €</p>
              </article>
            </Col>
            <Col className="d-flex justify-content-center flex-column align-items-center">
              <article>
                <h3 className='text-decoration-underline pb-2'>Reserva a Modificar</h3>
                <p>
                  <strong>Fecha de entrada:</strong>{' '}
                  {firstSelected ? format(firstSelected, 'yyyy-MM-dd') : ''} a
                  las 12:00 PM
                </p>
                <p>
                  <strong>Fecha de salida:</strong>{' '}
                  {secondSelected ? format(secondSelected, 'yyyy-MM-dd') : ''} a
                  las 12:00 PM
                </p>
                <p>
                  <strong>Precio alojamiento (sin servicios):</strong>{' '}
                  {newPrice ? `${newPrice.priceTotal} €` : ''}
                </p>
                <p>
                  <strong>Precio servicios ajustados:</strong>{' '}
                  {serviceCost ? `${serviceCost} €` : '0 €'}
                </p>
                <p>
                  <strong>Precio Total:</strong> {totalPrice !== null ? `${totalPrice} €` : ''}
                </p>
              </article>
            </Col>
          </Row>
          <div className="d-flex justify-content-center column-gap-5 py-5">
            {isDataPackageComplete && (
              <button type="button" className="botones" onClick={handleUpdate}>
                Aceptar
              </button>
            )}

            <button
              type="button"
              className="botones"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default EditReserveUser;
