//This is for the Rule 30 Example.

// A class to manage the CA

class CA {

  int generation;  /* Variable that stores the # of generations */
  int[] ruleset;   /* An array to save the ruleset defined below for creating new generations */
  int w = 5; /* Variable affecting the # of colums and rows */
  int[][] matrix;  // Store a history of generations in 2D array, not just one

  int cols; /* # of columns */
  int rows; /* # of rows */


  CA(int[] r) {
    ruleset = r; /* sets ruleset equal to r */
    cols = width/w; /* #of columns */
    rows = height/w; /* #of rows */
    matrix = new int[cols][rows]; /* saves the # of cols and rows in a 2-D array */
    restart(); /* calls restarst function */
  }

  // Make a random ruleset
  void randomize() {
    for (int i = 0; i < 8; i++) {
      ruleset[i] = int(random(2));
    }
  }

  // Reset to generation 0 using for loops to count rows and columns
  void restart() {
    for (int i = 0; i < cols; i++) {
      for (int j = 0; j < rows; j++) {
        matrix[i][j] = 0;
      }
    }
    matrix[cols/2][0] = 1;    // We arbitrarily start with just the middle cell having a state of "1"
    generation = 0; 
  }


  // The process of creating the new generation
  void generate() {

    // For every spot, determine new state by examing current state, and neighbor states
    // Ignore edges that only have one neighor
    for (int i = 0; i < cols; i++) {
      int left  = matrix[(i+cols-1)%cols][generation%rows];   // Left neighbor state
      int me    = matrix[i][generation%rows];       // Current state
      int right = matrix[(i+1)%cols][generation%rows];  // Right neighbor state
      matrix[i][(generation+1)%rows] = rules(left, me, right); // Compute next generation state based on ruleset
    }
    generation++; // proceeds to the next generation
  }

  // Drawing the cell, where 0 representing one colour and 1 representing another colour
  void display() {
    int offset = generation%rows;

    for (int i = 0; i < cols; i++) {
      for (int j = 0; j < rows; j++) {
        int y = j - offset;
        if (y <= 0) y = rows + y;
        if (matrix[i][j] == 1) fill(0);
        else                   fill(255);
        noStroke();
        rect(i*w, (y-1)*w, w, w);
      }
    }
  }
  //Examines neighbourhood cells to return the ruleset for each of the 8 possible configurations (1 = on 0 =off)
  int rules (int a, int b, int c) {
    if (a == 1 && b == 1 && c == 1) return ruleset[7];
    if (a == 1 && b == 1 && c == 0) return ruleset[6];
    if (a == 1 && b == 0 && c == 1) return ruleset[5];
    if (a == 1 && b == 0 && c == 0) return ruleset[4];
    if (a == 0 && b == 1 && c == 1) return ruleset[3];
    if (a == 0 && b == 1 && c == 0) return ruleset[2];
    if (a == 0 && b == 0 && c == 1) return ruleset[1];
    if (a == 0 && b == 0 && c == 0) return ruleset[0];
    return 0;
  }

  // The CA is done if it reaches the bottom of the screen
  boolean finished() {
    if (generation > height/w) {
      return true;
    } 
    else {
      return false;
    }
  }
}

//-----------------------------------------------------------------------------------

CA ca;   // An object to describe a Wolfram elementary Cellular Automata


void setup() {
  size(800, 100); /* Generates the canvas and its size */
  frameRate(30); /* Sets the frame rate */
  background(255); /* Sets background colour */
  int[] ruleset = {0,1,1,1,1,0,0,0}; /* Defines the ruleset by which new generations are created (8 possibilities) */
  
  ca = new CA(ruleset);// Initialize CA
}

void draw() {
  ca.display(); /* Displays all available generations */
  ca.generate(); /* Generates a new generation */
}
