class Matrix {
    constructor(numbers) {
        this.numbers = numbers;
        let m = this.numbers[0].length;
        for (var i = 0; i < this.get_n(); i++) {
          if (this.numbers[i].length != m) {
              console.log("Error: Number of columns is different");
          }
        }
    } 

<<<<<<< HEAD
    get_n() {
      return this.numbers.length;
    }

    get_m() {
        return this.numbers[0].length;
    }

    get_dimensions() {
        return [this.numbers.length, this.numbers[0].length];

    isCorrectPosition(x, y) {
      return x > 0 && x <= this.get_n() && y > 0 && y <= this.get_m();
    }
    
    get_symbol(x, y) {
        if (this.isCorrectPosition(x, y)){
          return this.numbers[x - 1][y - 1];
>>>>>>> b9ece44a07c17b3a95cdb75332744cc330fce3de
        }
        else {
            console.log("Error: Index out of range");
            return 'error';
        }
    }

<<<<<<< HEAD
    set_symbol(s, x, y) {
        if (isCorrectPosition(x, y)) {
            this.numbers[x - 1][y - 1] = s;
>>>>>>> b9ece44a07c17b3a95cdb75332744cc330fce3de
        }
        console.log("Error: Index out of range");
    }

    add_row(array = []) { // adding a row to the end
        this.numbers.push(array);
    }

    add_column(array) { // adding a column to the end
        for (var i = 0; i < array.length; i++) {
            this.numbers[i].push(array[i]);
        }
    }

    del_row(serial_number = this.get_n()) { // delete defined row
        this.numbers.splice(serial_number - 1, 1);
    }

    del_column(number = this.get_m()) { // delete defined column
        for (var i = 0; i < this.get_n(); i++) {
            this.numbers[i].splice(number - 1, 1);
        } 
    }

    printMatrix() { // print matrix
        for (var n = 0; n < this.get_n(); n++) {
            for (var m = 0; m < this.get_m(); m++) {
                document.write(" " + this.numbers[n][m] + " ");
            }
            document.write('<br>')
        }
    }

<<<<<<< HEAD
    printMinor(x, y) {
        get_minor(x, y).printMatrix();
>>>>>>> b9ece44a07c17b3a95cdb75332744cc330fce3de

    printSymbol(x, y) { // print defined symbol
        document.write(this.get_symbol(x, y));
        document.write('<br>')
    }
}

function get_minor(matrix, x, y) {
    var row_minor = [];

    for (var n = 0; n < matrix.get_n(); n++) {
        row_minor.push([]);
        for (var m = 0; m < matrix.get_m(); m++) {   
            if (m != y - 1 && n != x - 1) {
                row_minor[n].push(matrix.get_numbers()[n][m]);
            }
        }
    }

    // for (var i = 0; i <= row_minor.length; i++) {
    //     if (row_minor[i] == 0) {
    //         row_minor.splice(i, 1);
    //     }
    // }

    matrix.del_row(x);
    matrix.del_column(y);

    var minor = new Matrix(row_minor);
    return matrix;
}

// Getting determinant
function get_determinant(matrix, type = "column", number = 1) {
    var determinant = 0;
    if (matrix.get_m() == 2 & matrix.get_n() == 2) {
        determinant = matrix.get_numbers()[0][0] * matrix.get_numbers()[1][1] - matrix.get_numbers()[1][0] * matrix.get_numbers()[0][1];
    }
    else  {
        for (var i = 0; i < matrix.get_numbers()[0].length; i++) {
            if (type == "row") {
                determinant += Math.pow((-1), number - 1) * Math.pow((-1), i)* matrix.get_numbers()[number - 1][i] * get_determinant(get_minor(matrix, number, i+1));
            }
            if (type == "column") {
                determinant += Math.pow((-1), number - 1) * Math.pow((-1), i)* matrix.get_numbers()[i][number - 1] * get_determinant(get_minor(matrix, i+1, number));
            }
        }
    }
    return determinant;
}

// Getting sum of two matrices
function add(matrix1, matrix2) {
    
    if (matrix1.get_dimensions()[0] != matrix2.get_dimensions()[0] || matrix1.get_dimensions()[1] != matrix2.get_dimensions()[1]){
        console.log("Error: Matrices must be of the same dimension");
        return -1;
    }
    else {
        var sum = new Matrix([]);
        for (var i = 1; i <= matrix1.get_n(); i++) {
            sum.add_row([]);
            for (var j = 1; j <= matrix1.get_m(); j++) {
                sum.set_symbol(matrix1.get_symbol(i, j) + matrix2.get_symbol(i, j), i, j);
            }
        }
        return sum;
    }
}

// Getting subtraction of two matrices
function sub(matrix1, matrix2) {
    
    if (matrix1.get_dimensions()[0] != matrix2.get_dimensions()[0] || matrix1.get_dimensions()[1] != matrix2.get_dimensions()[1]){
        console.log("Error: Matrices must be of the same dimension");
        return -1;
    }
    else {
        var sum = new Matrix([]);
        for (var i = 1; i <= matrix1.get_n(); i++) {
            sum.add_row([]);
            for (var j = 1; j <= matrix1.get_m(); j++) {
                sum.set_symbol(matrix1.get_symbol(i, j) - matrix2.get_symbol(i, j), i, j);
            }
        }
        return sum;
    }
}

// Getting multiplication of number and matrix
function multNum(matrix, num) {
    var sum = new Matrix([]);
    for (var i = 1; i <= matrix.get_n(); i++) {
        sum.add_row([]);
        for (var j = 1; j <= matrix.get_m(); j++) {
            sum.set_symbol(matrix.get_symbol(i, j) * num, i, j);
        }
    }
    return sum;
}

// Getting multiplication of two matrices
function mult(matrix1, matrix2) {
    if (matrix1.get_m() != matrix2.get_n()) {
        console.log("Error: Matrices must be n*m & m*d");
        return;
    }
    let mul = new Matrix([]);
        
    for(let i = 1; i <= matrix1.get_n(); ++i) {
        mul.add_row([]);
        for(let j = 1; j <= matrix2.get_m(); ++j) {
            var c = 0;
            for (let k = 1; k <= matrix1.get_m(); ++k) {
                c += matrix1.get_symbol(i, k) * matrix2.get_symbol(k, j);
            }
            mul.set_symbol(c, i, j);
        }
    }    

    return mul;
}

<<<<<<< HEAD
function pow(matrix1, degree = 2) {
>>>>>>> b9ece44a07c17b3a95cdb75332744cc330fce3de

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

<<<<<<< HEAD
document.write("lol");
document.write(m1.get_symbol(1,1);
>>>>>>> b9ece44a07c17b3a95cdb75332744cc330fce3de
