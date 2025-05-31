import { eachDayOfInterval, format, parseISO } from 'date-fns';

export const datesCalculator = (startDate, endDate) => {
  const initialDate = parseISO(startDate);
  const finalDate = parseISO(endDate);
  const [from, to] =
    initialDate < finalDate
      ? [initialDate, finalDate]
      : [finalDate, initialDate];
  const daysArray = eachDayOfInterval({ start: from, end: to });

  const formattedDays = daysArray;
  console.log(formattedDays);
  let priceTotal = 0;
  
  for (let i = 0; i < formattedDays.length - 1; i++) {
    let day = formattedDays[i].getDate();
    let month = formattedDays[i].getMonth();
    let year = formattedDays[i].getFullYear();
    const semanaSantaInicio = new Date(year, 3, 13);
    const semanaSantaFin = new Date(year, 3, 20);
    if(month === 6 || month === 7){
      priceTotal = priceTotal + 20;
    }else if (formattedDays[i] >= semanaSantaInicio && formattedDays[i] <= semanaSantaFin){
      priceTotal = priceTotal + 20;
    } else if (month === 5 && (day === 23 || day === 24)){
      priceTotal = priceTotal + 20;
    } else {
      priceTotal = priceTotal + 15;
    }
  }

  return priceTotal;
};
