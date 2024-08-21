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
const Recargo = (fechaPago, setRecargo, ur) => {
    if (!fechaPago || !ur) {
        return;
    }

    const fechaActual = new Date(); 
    const fecha = new Date(fechaPago + 'T00:00:00'); 

    const dia = fecha.getUTCDate();
    const mesPago = fecha.getUTCMonth(); 
    const mesActual = fechaActual.getUTCMonth(); 

    console.log("Fecha de pago:", fecha);
    console.log("Fecha actual:", fechaActual);
    console.log("Mes de pago:", mesPago);
    console.log("Mes actual:", mesActual);

    if (mesPago < mesActual) {
        setRecargo(Math.round(ur.buy * (1 / 2)));
    } 
    else if (mesPago === mesActual) {
        if (dia <= 15) {
            setRecargo(0);
        } else if (dia > 15) {
            setRecargo(Math.round(ur.buy * (1 / 4)));
        }
    }
}
  




export {
    Recargo,

}