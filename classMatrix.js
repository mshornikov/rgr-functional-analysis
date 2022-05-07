class Matrix {
    constructor(array) {
        this.array = array;
        let columns = this.array[0].length;
        for (let i = 0; i < this.getAmountOfColumns(); i++) {
          if (this.array[i].length != columns) {
              console.log("Error: Number of columns is different");
          }
        }
    } 

    getAmountOfRows() { 
      return this.array.length;
    }

    getAmountOfColumns() {
        return this.array[0].length;
    }
    
    getArray() {
        return this.array;
    }
    
    getDimensions() {
        return [this.array.length, this.array[0].length];
    }

    isCorrectPosition(x, y) {
      return x > 0 && x <= this.getAmountOfColumns() && y > 0 && y <= this.getAmountOfRows();
    }
    
    getSymbol(x, y) {
        if (this.isCorrectPosition(x, y)){
          return this.array[x - 1][y - 1];
       }
        else {
            console.log("Error: Index out of range");
            return 'error';
        }
    }
    
    setSymbol(s, x, y) {
        if (isCorrectPosition(x, y)) {
            this.array[x - 1][y - 1] = s;
        }
        console.log("Error: Index out of range");
    }

    addRow(row = []) { // adding a row to the end
        this.array.push(row);
    }

    addColumn(column) { // adding a column to the end
        for (let i = 0; i < column.length; i++) {
            this.array[i].push(column[i]);
        }
    }

    deleteRow(number = this.getAmountOfColumns()) { // delete defined row
        this.array.splice(number - 1, 1);
    }

    deleteColumn(number = this.getAmountOfRows()) { // delete defined column
        for (let i = 0; i < this.getAmountOfColumns(); i++) {
            this.array[i].splice(number - 1, 1);
        } 
    }

    printMatrix() { // print matrix
        for (let n = 0; n < this.getAmountOfColumns(); n++) {
            for (let m = 0; m < this.getAmountOfRows(); m++) {
                document.write(" " + this.array[n][m] + " ");
            }
            document.write('<br>');
        }
    }

    printMinor(x, y) {
        getMinor(x, y).printMatrix();
    }    
    printSymbol(x, y) { // print defined symbol
        document.write(this.getSymbol(x, y));
        document.write('<br>');
    }
}

function getMinor(matrix, x, y) {
    let row_minor = [];

    for (let n = 0; n < matrix.getAmountOfColumns(); n++) {
        row_minor.push([]);
        for (let m = 0; m < matrix.getAmountOfRows(); m++) {   
            if (m != y - 1 && n != x - 1) {
                row_minor[n].push(matrix.array[n][m]);
            }
        }
    }

    // for (let i = 0; i <= row_minor.length; i++) {
    //     if (row_minor[i] == 0) {
    //         row_minor.splice(i, 1);
    //     }
    // }

    matrix.deleteRow(x);
    matrix.deleteColumn(y);

    let minor = new Matrix(row_minor);
    return matrix;
}

// Getting determinant
function getDeterminant(matrix, type = "column", number = 1) {
    let determinant = 0;
    if (matrix.getAmountOfRows() == 2 & matrix.getAmountOfColumns() == 2) {
        determinant = matrix.array[0][0] * matrix.array[1][1] - matrix.array[1][0] * matrix.array[0][1];
    }
    else  {
        for (let i = 0; i < matrix.array[0].length; i++)  {
            if (type == "row") {
                determinant += Math.pow((-1), number - 1) * Math.pow((-1), i)* matrix.array[number - 1][i] * getDeterminant(getMinor(matrix, number, i+1));
            }
            if (type == "column") {
                determinant += Math.pow((-1), number - 1) * Math.pow((-1), i)* matrix.array()[i][number - 1] * getDeterminant(getMinor(matrix, i+1, number));
            }
        }
    }
    return determinant;
}

// Getting sum of two matrices
function add(matrix1, matrix2) {
    
    if (matrix1.getDimensions()[0] != matrix2.getDimensions()[0] || matrix1.getDimensions()[1] != matrix2.getDimensions()[1]){
        console.log("Error: Matrices must be of the same dimension");
        return -1;
    }
    else {
        let sum = new Matrix([]);
        for (let i = 1; i <= matrix1.getAmountOfColumns(); i++) {
            sum.addRow([]);
            for (let j = 1; j <= matrix1.getAmountOfRows(); j++) {
                sum.setSymbol(matrix1.getSymbol(i, j) + matrix2.getSymbol(i, j), i, j);
            }
        }
        return sum;
    }
}

// Getting subtraction of two matrices
function sub(matrix1, matrix2) {
    
    if (matrix1.getDimensions()[0] != matrix2.getDimensions()[0] || matrix1.getDimensions()[1] != matrix2.getDimensions()[1]){
        console.log("Error: Matrices must be of the same dimension");
        return -1;
    }
    else {
        let sum = new Matrix([]);
        for (let i = 1; i <= matrix1.getAmountOfColumns(); i++) {
            sum.addRow([]);
            for (let j = 1; j <= matrix1.getAmountOfRows(); j++) {
                sum.setSymbol(matrix1.getSymbol(i, j) - matrix2.getSymbol(i, j), i, j);
            }
        }
        return sum;
    }
}

// Getting multiplication of number and matrix
function multNum(matrix, num) {
    let sum = new Matrix([]);
    for (let i = 1; i <= matrix.getAmountOfColumns(); i++) {
        sum.addRow([]);
        for (let j = 1; j <= matrix.getAmountOfRows(); j++) {
            sum.setSymbol(matrix.getSymbol(i, j) * num, i, j);
        }
    }
    return sum;
}

// Getting multiplication of two matrices
function mult(matrix1, matrix2) {
    if (matrix1.getAmountOfRows() != matrix2.getAmountOfColumns()) {
        console.log("Error: Matrices must be n*m & m*d");
        return;
    }
    let mul = new Matrix([]);
        
    for(let i = 1; i <= matrix1.getAmountOfColumns(); ++i) {
        mul.addRow([]);
        for(let j = 1; j <= matrix2.getAmountOfRows(); ++j) {
            let c = 0;
            for (let k = 1; k <= matrix1.getAmountOfRows(); ++k) {
                c += matrix1.getSymbol(i, k) * matrix2.getSymbol(k, j);
            }
            mul.setSymbol(c, i, j);
        }
    }    

    return mul;
}

function pow(matrix1, degree = 2) {

}

// Getting inverse matrix
function inverse(matrix1) {

}

// Getting division of two matrices
function div(matrix1, matrix2) {

}

m = new Matrix([[3, -3, -5, 8], [-3, 2, 4, -6], [2, -5, -7, 5]]);
test = new Matrix([[1, 2, 3], [9, 5, 4], [8, 6, 7]]);

m1 = new Matrix([[1, 3], [6, 5]]);
m2 = new Matrix([[4, 6], [1, 2]]);

document.write("");