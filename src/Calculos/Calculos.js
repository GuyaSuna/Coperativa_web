const viviendas = {
    "2" : 5.55 ,
    "3" : 6.93
}

const vivienda2 = 5.55;

const vivienda3 = 6.93;


//valor de la vivienda en pesos * valor de reajuste anual

const valorCuotaEnPesos = (ur) => {
    // vivienda2 = vivienda2 * ur.buy
    
}





// 1/4 * UR -> pesos  = recargoPesos 
const Recargo = (fechaPago , setRecargo , ur) => {
    if (!fechaPago) {
        return;
      }
      const fecha = new Date(fechaPago + 'T00:00:00');
      const dia = fecha.getUTCDate();
      console.log(dia)

      console.log("Ur" , ur)

    if (dia < 16) {
        setRecargo(0);
    } else if (dia > 15 && dia <= 30) {
        setRecargo(Math.round(ur.buy * (1 / 4)));
    } else if (dia > 30) {
        setRecargo(Math.round(ur.buy * (1 / 2))); 
    }
}




export {
    Recargo,

}