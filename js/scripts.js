
var inputForm = document.getElementById( 'input-form' );

// Form submission listener
inputForm.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    // Get the input
    var chemFormula = document.getElementById( 'chem-formula-input' ).value;
} );

molFormula = new Map();

molFormula = function( chemFormula ) {
    var currChar, nextChar, currSymb, currNum, parsingSymb, parsingNum;
    //Parsing algorithm uses next character to decide what to do with previous one,
    //so need a stop character.
    chemFormula = chemFormula + '@'
    
    CurrChar = chemFormula.slice(0);

    for (let i = 1; i < chemFormula.length; i++) {
        nextChar = chemFormula.slice(i);
        if ( nextChar === nextChar.toUpperCase() || nextChar === '@' ) {
            //The next character is a capital (or stop) so current element finished.
            if ( parsingSymb ) {
                //If a symbol is currently being parsed, number of atoms must be 1.
                molFormula.set( currSymb, number(1) )    
            } else {
                //Otherwise parsing a number and it is finished.
                molFormula.set( currSymb, number(currNum) )
            }
        }

    }
}