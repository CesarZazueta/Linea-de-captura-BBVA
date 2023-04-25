const btnEl = document.querySelector('.boton');
let peso_convertido;
let peso = "0.00";

function ValidarCaracteres(){
    let Caracteres = document.getElementById("Id_Principal").value;
    let cadenaObjecto = new String(Caracteres);
    var Contador = cadenaObjecto.length;
    console.log(cadenaObjecto);
    console.log(Contador);
    if(Contador == 30){
        document.getElementById("Id_Adicional").disabled = false;
    }
    else{
        document.getElementById("Id_Adicional").disabled = true;
        document.getElementById("Id_Adicional").value = "";
    }

}

function convertirEntero(){
    document.getElementById("Id_Importe_Entero").value = peso;
}


function convertirMoneda(){
    let Convertidor = new Intl.NumberFormat('eng-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    peso = document.getElementById("Id_Importe_Entero").value;
    peso_convertido = Convertidor.format(peso);
    console.log(peso_convertido);
    document.getElementById("Id_Importe_Entero").value = peso_convertido;
    console.log(peso);
}

function Numero_Aleatorio(max) {
  return Math.floor(Math.random() * max);
}


const ClickHandler = async () => {

    let i = 0;
    let x = 0;
    let entero ="";
    let decimales ="";
    let V_Establecimiento = document.getElementById("Id_Establecimiento").value;
    let V_Tipo_Pago = document.getElementById("Id_Tipo_Pago").value;
    let V_Importe_Entero = document.getElementById("Id_Importe_Entero").value;
    let V_Dia = document.getElementById("Id_Dia").value;
    let V_Mes = document.getElementById("Id_Mes").value;
    let V_Anio = document.getElementById("Id_Anio").value;
    let V_Referencia_Principal = document.getElementById("Id_Principal").value;
    let V_Referencia_Adicional = document.getElementById("Id_Adicional").value;

    if(V_Tipo_Pago == "00" || V_Tipo_Pago == "0" || V_Tipo_Pago == ""  ){
        alert("El tipo de pago " + V_Tipo_Pago + " es invalido, por favor digite un tipo de pago correcto");
        document.getElementById("Id_Tipo_Pago").value = "";
        return 0;
    }


    if(V_Importe_Entero < 1 || V_Importe_Entero == "" || peso == "0.00"){
        alert("El importe " + peso + " es invalido, por favor digite un importe valido");
        document.getElementById("Id_Importe_Entero").value = "";
        return 0;
    }


    if(V_Anio < 2013){
        alert("El año " + V_Anio + " no es valido, porfavor introdusca un año igual o mayor a 2013");
        document.getElementById("Id_Anio").value = "2013";
        return 0;
    }

    


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

    let dinero = peso + ".00";

    //Enteros
    do {
        if(dinero[i] != '.'){
            entero = entero + dinero[i];
            //console.log(entero);
        }
        else{
            if(dinero[i+2] == '.'){
                    entero = entero + dinero[i+1] + "0";
                //console.log(entero);
            }
            else if(dinero[i+1]== '.'){
                entero = entero + "00"
                console.log("Hola");
            }
            else{
                entero = entero + dinero[i+1] + dinero[i+2];
                //console.log(dinero[i+2]);
                //console.log(entero);
            }
            x=2
        }
        i++;
      } while (x != 2);

    dinero = entero;

    let Importe = dinero;


    //crear numero aleatorio
    //ReferenciaPrincipal + referencia adicional + importe + anio + mes + dia +numerosAleatorios
    var Numero_A = Numero_Aleatorio(1000000);


    console.log(Numero_A);
    Numero_A = Numero_A.toString();

    const clave = 'bWK0gJc1wn6X2e0$&2uY';
    let cadena = V_Referencia_Principal + V_Referencia_Adicional + Importe + V_Anio + V_Mes + V_Dia + Numero_A;
    console.log(cadena);
    let firma = CryptoJS.HmacSHA256(cadena, clave);
    let base64 = firma.toString(CryptoJS.enc.hex);
    base64 = base64.toUpperCase();
    console.log(base64)


    let json_LineaCaptura = JSON.stringify({
        "Establecimiento": V_Establecimiento,
        "Tipo_Pago": V_Tipo_Pago,
        "importe": Importe,
        "Dia": V_Dia,
        "Mes": V_Mes,
        "Anio": V_Anio,
        "Referencia_Principal": V_Referencia_Principal,
        "Referencia_Adicional": V_Referencia_Adicional,
        "Numero_Aleatorio": Numero_A,
        "Firma": base64
      });


    //const JSONLineaCaptura = JSON.stringify(Linea_Captura);
    console.log(json_LineaCaptura);


   
    //Las cabeceras que tengo establecidas al momento son estas:
    /*
    let url_localhost =  "http://localhost:7128/";

    let res = await fetch("http://www.lineacapturabbva.somee.com/api/Linea_Captura_BBVA",{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: json_LineaCaptura
            });
*/
    let res = await fetch('http://www.lineacapturabbva.somee.com/api/Linea_Captura_BBVA');
    let LP = "";
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





