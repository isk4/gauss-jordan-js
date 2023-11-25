let mat1 = [
  [1, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 1, 0],
];

let mat2 = [
  [1, 0, 4, 5],
  [0, 0, 6, 8],
  [0, 0, 4, 9],
];

let mat3 = [
  [3, 0, 3, 3, 3],
  [-3, 1, -2, -4, -1],
  [-5, 4, 9, 1, 13],
  [7, 6, 13, 1, 19]
];

const mostrar = (matriz) => {
  matriz.forEach((fila) => console.log(fila));
  console.log("");
}

const sumarFilas = (matriz, origen, destino, factor) => {
  matriz[destino - 1].forEach((elemento, i) => {
    matriz[destino - 1][i] = elemento + matriz[origen - 1][i] * factor;
  });
}

const intercambioFilas = (matriz, filaX, filaY) => {
  let aux = matriz[filaX - 1];
  matriz[filaX - 1] = matriz[filaY - 1];
  matriz[filaY - 1] = aux;
}

const multiplicarFila = (matriz, fila, factor) => {
  matriz[fila - 1].forEach((elemento, i) => {
    let resultado = elemento * factor;
    matriz[fila - 1][i] = resultado == 0 ? 0 : resultado;
  });
}

const encontrarFilaPivote = (matriz, filaDesde, columna) => {
  let numeroFila;
  for (let fila = filaDesde; fila <= matriz.length; fila++)
  {
    if (matriz[fila - 1][columna - 1] === 1) {
      numeroFila = fila;
    }
  }
  return numeroFila;
}

const encontrarValorEnColumna = (matriz, filaDesde, columna) => {
  let numeroFila;
  for (let fila = filaDesde; fila <= matriz.length; fila++)
  {
    if (matriz[fila - 1][columna - 1] !== 0) {
      numeroFila = fila;
    }
  }
  return numeroFila;
}

const gaussJordan = (matriz) => {
  let numeroFilas = matriz.length;
  let numeroColumnas = matriz[0].length;
  let filaActual = 1;
  let columnaActual = 1;

  while (columnaActual <= numeroColumnas && filaActual <= numeroFilas) {
    let filaPivote = encontrarFilaPivote(matriz, filaActual, columnaActual);

    if (filaPivote) {
      if (filaActual !== filaPivote) {
        console.log(`F${filaActual} <-> F${filaPivote}`);
        intercambioFilas(matriz, filaActual, filaPivote);
        mostrar(matriz);
      }

      let operaciones = false;
      for (let fila = 1; fila <= numeroFilas; fila++) {
        let factor = matriz[fila - 1][columnaActual - 1] * -1;
        if (factor !== 0 && fila !== filaActual) {
          operaciones = true;
          console.log(`F${fila} ${factor < 0 ? "-" : "+"} ${Math.abs(factor)} F${filaActual} -> F${fila}`);
          sumarFilas(matriz, filaActual, fila, factor);
        }
      }

      if (operaciones) mostrar(matriz);
      columnaActual++;
      filaActual++;
    } else {
      let valorActual = matriz[filaActual - 1][columnaActual - 1];

      if (valorActual !== 0) {
        console.log(`1/${valorActual} F${filaActual} -> F${filaActual}`);
        multiplicarFila(matriz, filaActual, 1 / valorActual);
        mostrar(matriz);
  
      } else {
        let filaSiguienteValor = encontrarValorEnColumna(matriz, filaActual, columnaActual);

        if (filaSiguienteValor) {
          console.log(`F${filaActual} <-> F${filaSiguienteValor}`);
          intercambioFilas(matriz, filaActual, filaSiguienteValor);
          mostrar(matriz);
        } else {
          columnaActual++;
        }
      }
    }
  }
}

console.log("Matriz original\n");
mostrar(mat1);
console.log("\nEscalonando...\n");
gaussJordan(mat1);