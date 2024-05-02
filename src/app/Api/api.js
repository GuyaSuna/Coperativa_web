const URL = "http://localhost:5000"

const getSocio = async (UserNumber) => {
    try {
        const response = await fetch(`${URL}/socio/${UserNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error("Te jodiste");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error en getSocio:", error);
        throw new Error("Error al obtener los datos del socio");
    }
};





export default getSocio ;