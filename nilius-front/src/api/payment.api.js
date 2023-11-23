
export const postOrderRequest = async (orderData) => {

    const response = await fetch('http://localhost:4000/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Especifica que el cuerpo de la solicitud es JSON
      },
      body: JSON.stringify(orderData), // Convierte orderData a formato JSON y lo agrega al cuerpo de la solicitud
    });

    //console.log(orderData);

    if (!response.ok) {
      throw new Error('Error al procesar la solicitud'); // Puedes manejar errores aquí según tus necesidades
    }

    const data = await response.json();
    //console.log(data.links[1].href);
    window.location.href = data.links[1].href;

};