class Matrix {
    constructor(array) {
        this.array = array; //array of arrays of numbers that is a matrix
        let columns = this.array[0].length; 
        for (let i = 0; i < this.getNumberOfRows(); i++) { //cheking for missng columns in input
          if (this.array[i].length != columns) {
              console.log("Error: Number of columns is different from row to row");
          }
        }
    } 
    
    // Getting number of rows
    getNumberOfRows() { 
      return this.array.length;
    }

    // Getting number of columns 
    getNumberOfColumns() {
        return this.array[0].length;
    }
    
    // Getting array thath contains matrix
    getArray() {
        return this.array;
    }
    
    // Getting dimensions of Matrix [amount of rows, amount of columns]
    getDimensions() {
        return [this.array.length, this.array[0].length];
    }

    // Checking for correct position input
    isCorrectPosition(x, y) {
      return x > 0 && x <= this.getNumberOfColumns() && y > 0 && y <= this.getNumberOfRows();
    }
    
    // Getting symbol by it coordindates
    getSymbol(x, y) {
        if (this.isCorrectPosition(x, y)){
             return this.array[x - 1][y - 1];
        }
        else {
            console.log("Error: Index out of range");
            return 'error';
        }
    }
    
    // Setting symbol by it coordinates
    setSymbol(newValue, x, y) {
        if (this.isCorrectPosition(x, y)) {
            this.array[x - 1][y - 1] = newValue;
            return;
        } 
        else {
            console.log("Error: Index out of range");
            return "error";
        }
        
    }

    // adding a row to the end
    addRow(row = []) { 
        this.array.push(row);
    }
    
    // adding a column to the end
    addColumn(column) { 
        for (let i = 0; i < column.length; i++) {
            this.array[i].push(column[i]);
        }
    }

    // delete defined row
    deleteRow(number = this.getNumberOfColumns()) { 
        this.array.splice(number - 1, 1);
    }
  
    // delete defined column
    deleteColumn(number = this.getNumberOfRows()) {
        for (let i = 0; i < this.getNumberOfColumns(); i++) {
            this.array[i].splice(number - 1, 1);
        } 
    }
    
    // Printing the matrix
    printMatrix() {
        for (let n = 0; n < this.getNumberOfColumns(); n++) {
            for (let m = 0; m < this.getNumberOfRows(); m++) {
                document.write(" " + this.array[n][m] + " ");
            }
            document.write('<br>');
        }
    }
    
    // Printing minor of matrix by it coordinates
    printMinor(x, y) {
        getMinor(x, y).printMatrix();
    }    
    
    // Printing symbol by it coordinates
    printSymbol(x, y) {  
        document.write(this.getSymbol(x, y));
        document.write('<br>');
    }
}

// Getting minor of matrix by coordinates
function getMinor(matrix, x, y) {
    let row_minor = [];

    for (let n = 0; n < matrix.getNumberOfColumns(); n++) {
        row_minor.push([]);
        for (let m = 0; m < matrix.getNumberOfRows(); m++) {   
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
    if (matrix.getNumberOfRows() == 2 & matrix.getNumberOfColumns() == 2) {
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
        for (let i = 1; i <= matrix1.getNumberOfColumns(); i++) {
            sum.addRow([]);
            for (let j = 1; j <= matrix1.getNumberOfRows(); j++) {
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
        for (let i = 1; i <= matrix1.getNumberOfColumns(); i++) {
            sum.addRow([]);
            for (let j = 1; j <= matrix1.getNumberOfRows(); j++) {
                sum.setSymbol(matrix1.getSymbol(i, j) - matrix2.getSymbol(i, j), i, j);
            }
        }
        return sum;
    }
}

// Getting multiplication of number and matrix
function multNum(matrix, num) {
    let sum = new Matrix([]);
    for (let i = 1; i <= matrix.getNumberOfColumns(); i++) {
        sum.addRow([]);
        for (let j = 1; j <= matrix.getNumberOfRows(); j++) {
            sum.setSymbol(matrix.getSymbol(i, j) * num, i, j);
        }
    }
    return sum;
}

// Getting multiplication of two matrices
function mult(matrix1, matrix2) {
    if (matrix1.getNumberOfRows() != matrix2.getNumberOfColumns()) {
        console.log("Error: Matrices must be n*m & m*d");
        return;
    }
    let mul = new Matrix([]);
        
    for(let i = 1; i <= matrix1.getNumberOfColumns(); ++i) {
        mul.addRow([]);
        for(let j = 1; j <= matrix2.getNumberOfRows(); ++j) {
            let c = 0;
            for (let k = 1; k <= matrix1.getNumberOfRows(); ++k) {
                c += matrix1.getSymbol(i, k) * matrix2.getSymbol(k, j);
            }
            mul.setSymbol(c, i, j);
        }
    }    

    return mul;
}

//Getting power of matrix (by default = 2)
function pow(matrix1, degree = 2) {

}

// Getting inverse matrix
function inverse(matrix1) {

}

// Getting division of two matrices
function div(matrix1, matrix2) {

}

// Declarations
m = new Matrix([[3, -3, -5, 8], [-3, 2, 4, -6], [2, -7, 4, 5]]);
test = new Matrix([[1, 2, 3], [9, 5, 4], [8, 6, 7]]);

m1 = new Matrix([[1, 3], [6, 5]]);
m2 = new Matrix([[4, 6], [1, 2]]);

document.write();