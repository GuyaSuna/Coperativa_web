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
const Recargo = (fechaEmision, fechaPago, setRecargo, ur) => {
    // Verifica que fechaPago y ur existan y que ur.buy sea un número
    if (!fechaPago || !ur || isNaN(ur)) {
        console.log("retorno fallo");
        console.log("fechaPago:", fechaPago);
        console.log("ur:", ur);
        return;
    }
 
    const fechaActual = new Date();
    const fechaPagoParsed = new Date(fechaPago + 'T00:00:00');
    const fechaEmisionParsed = new Date(fechaEmision + 'T00:00:00');
    
    const diaPago = fechaPagoParsed.getUTCDate();
    const mesPago = fechaPagoParsed.getUTCMonth();
    const mesActual = fechaActual.getUTCMonth();
    const mesEmision = fechaEmisionParsed.getUTCMonth();

    console.log("Fecha de pago:", fechaPagoParsed);
    console.log("Fecha actual:", fechaActual);
    console.log("Mes de emisión:", mesEmision);
    console.log("Mes de pago:", mesPago);
    console.log("Mes actual:", mesActual);
    console.log("entro");

    // Comparar el mes de pago con el mes de emisión
    if (mesPago > mesEmision) {
        // Si el pago fue en un mes posterior, aplicar recargo de 1/2 UR
        setRecargo(Math.round(ur * (1 / 2)));
    } else if (mesPago === mesEmision) {
        // Si el pago fue en el mismo mes, verificar el día del pago
        if (diaPago <= 15) {
            setRecargo(0); // No hay recargo si se paga antes o el día 15
        } else {
            setRecargo(Math.round(ur * (1 / 4))); // Recargo de 1/4 UR si se paga después del día 15
        }
    } else {
        // Si el pago fue en un mes anterior, no debería haber recargo
        setRecargo(0);
    }
};



export {
    Recargo,

}