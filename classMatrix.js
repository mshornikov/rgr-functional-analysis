class Matrix {
    constructor(numbers) {
        this.numbers = numbers;
        this.n = this.numbers.length;
        this.m = this.numbers[0].length;
        console.log(this.numbers[0]);
        for (var i = 0; i < this.numbers.length; i++) {
            if (this.numbers[i].length != this.m) {
                console.log("Number of columns is different");
            }
        }
    } 

    get_n() {
        return this.n;
    }

    get_m() {
        return this.m;
    }

    get_dimensions() {
        return [this.n, this.m];
    }

    get_numbers() {
        return this.numbers;
    }
    
    add_row( array = []) {      
        this.numbers.push(array);
    }

    add_column(array) {
        for (var i = 0; i < array.length; i++) {
            this.numbers[i].push(array[i]);
        }
    }

    del_row(serial_number = this.numbers.length - 1) {
        this.numbers.splice(serial_number, 1);
    }

    printMatrix() {
        for (var n = 0; n < this.n; n++) {
            for (var m = 0; m < this.m; m++) {
                document.write(" " + this.numbers[n][m] + " ");
            }
            document.write('<br>')
        }
    }

    printMinor(x, y) {
        this.get_minor(x, y).printMatrix();
    }

    get_minor(x, y) {
        var row_minor = [];
        // for (var s = 0; s < this.m - 1; s++) {
        //     row_minor.push([]);
        // }
        // console.log(row_minor);
        for (var n = 0; n < this.n; n++) {
            row_minor.push([]);
            for (var m = 0; m < this.m; m++) {   
                // console.log('n = ' + n + " m = " + m);
                // console.log(this.numbers[n][m]);
                // console.log(row_minor);
                if (m != y - 1 && n != x - 1) {
                    row_minor[n].push(this.numbers[n][m]);
                }
            }
        }

        for (var i = 0; i <= row_minor.length; i++) {
            if (row_minor[i] == 0) {
                row_minor.splice(i, 1);
                // console.log('0');
            }
        }
        console.log(row_minor);
        var minor = new Matrix(row_minor);
        return minor;
    }

    get_determinant() {
        var determinant = 0;
        console.log("determinant = " + determinant);
        if (this.m == 2 & this.n == 2) {
            determinant = this.numbers[0][0] * this.numbers[1][1] - this.numbers[1][0] * this.numbers[0][1];
            console.log("determinant = " + determinant);
        }
        else  {
            for (var i = 0; i < this.numbers[0].length; i++) {
                determinant += Math.pow((-1), i) * this.numbers[0][i] * this.get_minor(1, i+1).get_determinant();
                console.log("determinant = " + determinant);
            }
        }
        return determinant;
    }
}

m = new Matrix([[3, -3, -5, 8], [-3, 2, 4, -6], [2, -5, -7, 5], [-4, 3, 5, -6]]);
test = new Matrix([[1, -2, 3], [4, 0, 6], [-7, 8, 9]]);
m.printMatrix();
document.write('<br>');
test.printMatrix();
document.write('<br>');
document.write(m.get_determinant());