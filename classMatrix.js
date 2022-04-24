class Matrix {
    constructor(numbers) {
        this.numbers = numbers;
    } 

    get_n() {
        var n = this.numbers.length;
        return n;
    }

    get_m() {
        var m = this.numbers[0].length;
        for (var i = 0; i < this.numbers.length; i++) {
            if (this.numbers[i].length != m) {
                console.log("Number of columns is different");
                return -1;
            }
        }
        return m;
    }

    get_dimensions() {
        return [this.get_n(), this.get_m()];
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
        for (var n = 0; n < this.get_n(); n++) {
            for (var m = 0; m < this.get_m(); m++) {
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
        for (var n = 0; n < this.get_n(); n++) {
            row_minor.push([]);
            for (var m = 0; m < this.get_m(); m++) {   
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

        var minor = new Matrix(this.get_m() - 1, this.get_m() - 1, row_minor);
        return minor;
    }

    get_determinant() {
        var determinant = 0; 
        for (var m = 0; m < this.get_m(); m++) {
            this.numbers[0][m]
        }
    }
}

m = new Matrix([[3, -3, -5, 8], [-3, 2, 4, -6], [2, -5, -7, 5], [-4, 3, 5, -6]]);
m.printMatrix();
document.write('<br>');
m.add_row([1, 2, 3, 4]);
m.printMatrix();
document.write('<br>');
m.add_column([1, 2, 3, 4, 5]);
m.printMatrix();

document.write(m.get_dimensions());