import { date } from "quasar";
export const Fechas = {
  larga(arg) {
    let formattedString = date.formatDate(arg, "ddd DD/MM/YY - hh:mm a", {
      days: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ],
      daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      monthsShort: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ]
    });
    // console.log(formattedString);
    return formattedString;
  },
  Corta(arg) {
    let formattedString = date.formatDate(arg, "ddd DD/MM/YY", {
      days: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ],
      daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      monthsShort: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ]
    });
    // console.log(formattedString);
    return formattedString;
  }
};
