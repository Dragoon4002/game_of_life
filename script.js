function make2Darray(cols,rows){
    let arr = new Array(cols);
    for(let i=0; i< arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let res = 10;

function setup(){
    createCanvas(1500,800);
    cols = width / res;
    rows = width / res;
    
    grid =  make2Darray(cols,rows);
    for(let i= 0; i<cols; i++){
        for(let j= 0; j<rows; j++){
            grid[i][j] = floor(random(2));

        }
    }
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * res;
            let y = j * res;

            // Draw initial state
            if (grid[i][j] == 1) {
                fill(255); // Stays alive, white
            } else {
                fill(0); // Stays dead, black
            }
            stroke(0);
            rect(x, y, res - 1, res - 1);
        }
    }

    let next = make2Darray(cols, rows);

    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let neighbors = countNeighbor(grid, i, j);
            let state = grid[i][j];
            let x = i * res;
            let y = j * res;
            /*
            if (state == 0 && neighbors == 3) {
                // Becomes alive, green
                fill(0, 200, 0);
                stroke(0);
                rect(x, y, res - 1, res - 1);
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                // Dies, red
                fill(200, 0, 0);
                stroke(0);
                rect(x, y, res - 1, res - 1);
                next[i][j] = 0;
            } else {
                // Stays the same
                if (state == 1) {
                    fill(255); // Stays alive, white
                } else {
                    fill(0); // Stays dead, black
                }
                stroke(0);
                rect(x, y, res - 1, res - 1);
                next[i][j] = state;
            }
                */
            if(state == 0 && neighbors == 3){next[i][j]=1;}
            else if(state == 1 && (neighbors < 2 || neighbors>3)){next[i][j]=0;}
            else{next[i][j]=state;}
        }
    }

    grid = next;
}


function countNeighbor(grid, x, y){
    sum = 0;
    for(let i = -1; i<2; i++){
        for(let j=-1; j<2; j++){
            if(x+i >= 0 && y+j >= 0 && x+i < grid.length && y+j < grid.length)
            sum += grid[x+i][y+j];
        }
    }
    sum -= grid[x][y];
    return sum;
}