const URL = "http://localhost:5000"


const getSocio = async(UserNumber) => {
   console.log("opa")
    try{
        console.log("al menos entro")
     const response = await fetch(`${URL}/socio/${UserNumber}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json' 
        },
    });
    console.log("al menos llego")
    
    if(!response.ok){
        throw new Error("Te jodiste")
    }

    const data = await response.json()

    return data
}  catch (error){
    throw new Error(error)
}
}





export default getSocio ;