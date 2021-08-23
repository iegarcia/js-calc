const app = document.getElementById("app");

//Creacion de elementos y/o variables
//------------------------------------------------------
let operaciones = ["+", "-", "*", "/"];

let tabla, tableRow;
const CANT_NUMEROS = 9;
//------------------------------------------------------

//Colocacion de elementos en el DOM
//------------------------------------------------------

createCalc();

//Armado de funciones
//------------------------------------------------------

function createCalc() {
  let area = createStructure(); //Genera la estructura de la calculadora(area de calculo, tabla que contendrá los botones, botón para borrar)

  createTableRow(); //Crea una columna
  placeOperations(area); //Coloca las operaciones en la tabla
  placeNumbers(area); //Coloca los números en la tabla
  placeExtra(area); //Coloca el resto de botones (negativos, cero, punto)
}

function createStructure() {
  let areaCalculo = document.createElement("input");
  // areaCalculo.disabled = true;
  areaCalculo.value = 0;
  areaCalculo.setAttribute("class", "area");
  areaCalculo.setAttribute(
    "onkeypress",
    "return event.charCode != 46 && event.charCode != 44 && event.charCode >= 42 && event.charCode <= 57"
  );
  // onkeypress = "return (event.charCode != 46 && event.charCode != 44 && event.charCode >= 42 && event.charCode <= 57)";

  let btnBorrar = document.createElement("button");
  btnBorrar.innerText = "C";
  btnBorrar.addEventListener("click", function () {
    areaCalculo.value = 0;
  });

  btnBorrar.setAttribute("class", "btn btn-dark borrar");

  tabla = document.createElement("table");
  app.append(areaCalculo, btnBorrar, tabla);
  return areaCalculo;
}

function createTableRow() {
  tableRow = document.createElement("tr");
  tabla.append(tableRow);
}

function placeOperations(area) {
  for (let index = 0; index < operaciones.length; index++) {
    let button = createButton(operaciones[index]);
    button.setAttribute("class", "btn btn-secondary");
    button.addEventListener("click", function () {
      area.value += " " + button.textContent + " ";
    });
  }
}

function placeNumbers(area) {
  createTableRow();
  let contador = 0;
  let btnNumber;
  for (let i = 1; i <= CANT_NUMEROS; i++) {
    if (contador != 3) {
      btnNumber = createButton(i);
      contador++;
    } else {
      createTableRow();
      btnNumber = createButton(i);
      contador = 1;
    }
    setButton(btnNumber, area);
  }
}

function placeExtra(area) {
  createTableRow();
  let negativo = createButton("+/-");
  let cero = createButton(0);
  let punto = createButton(".");
  let equal = createButton("=");

  punto.addEventListener("click", function () {
    area.value == 0
      ? showMessage(
          "Operaciones con decimales que incluyan 0 aun no implementadas (Ej: 0.9 + 6) ",
          "info"
        )
      : (area.value += ".");
  });
  cero.addEventListener("click", function () {
    area.value == 0 ? (area.value = 0) : (area.value += 0);
  });
  negativo.addEventListener("click", function () {
    area.value == 0 ? (area.value = "-") : console.log("negativos");
  });
  equal.addEventListener("click", function () {
    let datos = area.value.split(" ");
    realizarCalculo(Number(datos[0]), Number(datos[2]), datos[1], area);
  });

  equal.setAttribute("class", "btn btn-success");
}

function setButton(button, area) {
  //Asigna la acción a cada botón
  button.addEventListener("click", function () {
    area.value == 0
      ? (area.value = button.textContent)
      : (area.value += button.textContent);
  });
}

function createButton(valor) {
  //Crea la celda de la tabla y le coloca el botón dentro
  let data = document.createElement("td");
  let button = document.createElement("button");
  button.setAttribute("id", valor);
  button.setAttribute("class", "btn btn-primary");
  button.innerText = valor;
  data.append(button);
  tableRow.append(data);
  return button;
}

function realizarCalculo(n1, n2, operador, area) {
  //En base al operador se elige la operación a realizar
  switch (operador) {
    case "+":
      area.value = sumar(n1, n2);
      break;
    case "-":
      area.value = restar(n1, n2);
      break;
    case "/":
      area.value = dividir(n1, n2);
      break;
    case "*":
      area.value = multiplicar(n1, n2);
      break;
  }
  setTimeout(function () {
    area.value = 0;
  }, 7000);

  generarContador();
}

function generarContador() {
  let p = document.getElementById("nota");
  let contador = 7;
  let temporizador = setInterval(() => {
    if (contador != 0) {
      contador--;
      p.innerHTML = `<strong>Nota:</strong> Una vez apretado = se limpiara el area de calculo en ${contador} segundos`;
      console.log(contador);
    } else {
      p.innerHTML =
        "<strong>Nota:</strong> Una vez apretado = se limpiara el area de calculo en 7 segundos";
      clearInterval(temporizador);
    }
  }, 1000);
}

function sumar(n1, n2) {
  return n1 + n2;
}

function restar(n1, n2) {
  return n1 - n2;
}

function multiplicar(n1, n2) {
  return n1 * n2;
}

function dividir(n1, n2) {
  let resultado = 0;
  n2 <= 0
    ? showMessage("Error: No se puede dividir entre cero", "danger")
    : (resultado = n1 / n2);

  return resultado;
}

function showMessage(message, type) {
  let alertPlaceholder = document.getElementById("liveAlert");
  let wrapper = document.createElement("div");

  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" id="close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  alertPlaceholder.append(wrapper);

  let close = document.getElementById("close");
  close.addEventListener("click", function () {
    alertPlaceholder.removeChild(alertPlaceholder.childNodes[0]);
  });

  setTimeout(function () {
    alertPlaceholder.removeChild(alertPlaceholder.childNodes[0]);
  }, 7000);
}
