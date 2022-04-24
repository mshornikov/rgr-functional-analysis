class Matrix {
    constructor(n, m, numbers) {
        this.n = n;
        this.m = m;
        this.numbers = numbers;
    } 

    get_n() {
        return this.n;
    }

    get_m() {
        return this.m;
    }

    get_numbers() {
        return this.numbers;
    }
    
    add_row( array = []) {
        this.n += 1;
        this.numbers.push(array);
    }

    printMatrix() {
        for (var n = 0; n < this.n; n++) {
            for (var m = 0; m < this.m; m++) {
                document.write(this.numbers[n][m] + " ");
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

        var minor = new Matrix(this.m - 1, this.m - 1, row_minor);
        return minor;
    }

    get_determinant() {
        var determinant = 0; 
        for (var m = 0; m < this.m; m++) {
            this.numbers[0][m]
        }
    }
}

m = new Matrix(4, 4, [[3, -3, -5, 8], [-3, 2, 4, -6], [2, -5, -7, 5], [-4, 3, 5, -6]]);
m.printMatrix();
document.write('<br>');
m.add_row([1, 2, 3, 4]);
m.printMatrix();
document.write('<br>');
m.printMinor(1, 4);