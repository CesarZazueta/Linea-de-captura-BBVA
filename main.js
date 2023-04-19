
const btnEl = document.querySelector('.boton');

const ClickHandler = async () => {

    let V_Establecimiento = document.getElementById("Id_Establecimiento").value;
    let V_Tipo_Pago = document.getElementById("Id_Tipo_Pago").value;
    let V_Importe_Entero = document.getElementById("Id_Importe_Entero").value;
    let V_Importe_Decimal = document.getElementById("Id_Importe_Decimal").value;
    let V_Dia = document.getElementById("Id_Dia").value;
    let V_Mes = document.getElementById("Id_Mes").value;
    let V_Anio = document.getElementById("Id_Anio").value;
    let V_Referencia_Principal = document.getElementById("Id_Principal").value;
    let V_Referencia_Adicional = document.getElementById("Id_Adicional").value;


    switch(V_Tipo_Pago){
        case '1':
            V_Tipo_Pago = "0"+V_Tipo_Pago;
        break;
        case '2':
            V_Tipo_Pago = "0"+V_Tipo_Pago;
        break;
        case '3':
            V_Tipo_Pago = "0"+V_Tipo_Pago;
        break;
        case '4':
            V_Tipo_Pago = "0"+V_Tipo_Pago;
        break;
        case '5':
            V_Tipo_Pago = "0"+V_Tipo_Pago;
        break;
        case '6':
            V_Tipo_Pago = "0"+V_Tipo_Pago;
        break;
        case '7':
            V_Tipo_Pago = "0"+V_Tipo_Pago;
        break;
        case '8':
            V_Tipo_Pago = "0"+V_Tipo_Pago;
        break;
        case '9':
            V_Tipo_Pago = "0"+V_Tipo_Pago;
        break;
    }

    switch(V_Importe_Decimal){

        case '':
            V_Importe_Decimal = V_Importe_Decimal + "00";
            break;

        case '1':
            V_Importe_Decimal = V_Importe_Decimal + "0";
        break;
        case '2':
            V_Importe_Decimal = V_Importe_Decimal + "0";
        break;
        case '3':
            V_Importe_Decimal = V_Importe_Decimal + "0";
        break;
        case '4':
            V_Importe_Decimal = V_Importe_Decimal + "0";
        break;
        case '5':
            V_Importe_Decimal = V_Importe_Decimal + "0";
        break;
        case '6':
            V_Importe_Decimal = V_Importe_Decimal + "0";
        break;
        case '7':
            V_Importe_Decimal = V_Importe_Decimal + "0";
        break;
        case '8':
            V_Importe_Decimal = V_Importe_Decimal + "0";
        break;
        case '9':
            V_Importe_Decimal = V_Importe_Decimal + "0";
        break;
    }

    let Importe = V_Importe_Entero + V_Importe_Decimal;

    let json = JSON.stringify({
        "Establecimiento": V_Establecimiento,
        "Tipo_Pago": V_Tipo_Pago,
        "importe": Importe,
        "Dia": V_Dia,
        "Mes": V_Mes,
        "Anio": V_Anio,
        "Referencia_Principal": V_Referencia_Principal,
        "Referencia_Adicional": V_Referencia_Adicional
      });

    let Linea_Captura = {
        Establecimiento: V_Establecimiento,
        Tipo_Pago: V_Tipo_Pago,
        importe: Importe,
        Dia: V_Dia,
        Mes: V_Mes,
        Anio: V_Anio,
        Referencia_Principal: V_Referencia_Principal,
        Referencia_Adicional: V_Referencia_Adicional
    };

    const JSONLineaCaptura = JSON.stringify(Linea_Captura);
    console.log(Linea_Captura);
    console.log(JSONLineaCaptura);


    //Las cabeceras que tengo establecidas al momento son estas:




    let res = await fetch("http://www.lineacapturabbva.somee.com/api/Linea_Captura_BBVA",{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSONLineaCaptura
            });


    let LP;
     if (res.ok) {  // si el HTTP-status es 200-299 // obtener cuerpo de la respuesta (método debajo)
    LP = await res.text();
    } else {
    alert("Error-HTTP: " + res.status);
    }
    console.log(LP);

    document.getElementById('Id_Linea_de_Captura').value=LP;
    let I_LP = document.getElementById("Id_Linea_de_Captura").value;

    JsBarcode("#barcode", LP);
}

btnEl.addEventListener('click',ClickHandler);





