let mat = [
  [1, -3, 4, 3],
  [2, -5, 6, 6],
  [-3, 3, 4, 6]
]

const mostrar = (matriz) => {
  matriz.forEach((fila) => console.log(fila));
  console.log("");
}

const sumarFilas = (matriz, origen, destino, factor) => {
  matriz[destino - 1].forEach((elemento, i) => {
    matriz[destino - 1][i] = elemento + matriz[origen - 1][i] * factor;
  });

  // matriz[destino - 1] = matriz[destino - 1].map((elemento, i) => {
  //   return elemento + matriz[origen - 1][i] * factor;
  // });
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

const encontrarFilaPivote = (matriz, columna) => {
  let numeroFila;
  matriz.forEach((fila, i) => {
    if (fila[columna - 1] === 1 && i + 1 >= columna) numeroFila = i + 1;
  });
  return numeroFila;
}

const escalonar = (matriz) => {
  let numeroFilas = matriz.reduce((resultado) => resultado += 1, 0);

  for (let columnaActual = 1; columnaActual <= numeroFilas; columnaActual++) {
    let filaPivote = encontrarFilaPivote(matriz, columnaActual);

    if (filaPivote !== undefined) {
      if (columnaActual !== filaPivote) {
        console.log(`F${columnaActual} <-> F${filaPivote}`);
        intercambioFilas(matriz, columnaActual, filaPivote);
        mostrar(matriz);
      }

      for (let filaActual = 1; filaActual <= numeroFilas; filaActual++) {
        if (filaActual !== columnaActual) {
          let factor = matriz[filaActual - 1][columnaActual - 1] * -1;
          console.log(`F${filaActual} ${factor < 0 ? "-" : "+"} ${Math.abs(factor)}F${columnaActual} -> F${filaActual}`);
          sumarFilas(matriz, columnaActual, filaActual, factor);
        }
      }
      mostrar(matriz);
    } else {
      let divisor = matriz[columnaActual - 1][columnaActual - 1];
      if (divisor !== 0) {
        console.log(`F${columnaActual} / ${divisor} -> F${columnaActual}`);
        multiplicarFila(matriz, columnaActual, 1 / divisor);
        mostrar(matriz);
  
        columnaActual--;
      }
    }
  }
}

console.log("Matriz original\n");
mostrar(mat);
console.log("\nEscalonando...\n");
escalonar(mat);