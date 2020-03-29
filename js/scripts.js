
const isDigit = ( char ) => {
    let cc = char.charCodeAt(0);
    return cc > 47 && cc < 58; 
};

const isUppercase = ( char ) => { return nextChar === nextChar.toUpperCase() };

var inputForm = document.getElementById( 'input-form' );

// Form submission listener
inputForm.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    // Get the input
    var chemFormula = document.getElementById( 'chem-formula-input' ).value;
} );

molFormula = new Map();

molFormula = function( chemFormula ) {
    var currChar, nextChar, currChemSymb, currNumString;
    //Parsing algorithm uses next character to decide what to do with previous one,
    //so need a stop character.
    chemFormula = chemFormula + '@'
    
    CurrChar = chemFormula.slice(0);

    for (let i = 1; i < chemFormula.length; i++) {
        nextChar = chemFormula.slice(i);
        if ( isDigit( currChar ) ) {
            if ( isDigit( nextChar ) ) {
                //Continuing a number
                currNumString += nextChar;
            } else {
                //Number finished, symbol starts
                atoms.set( currChemSymb, Number( currNumString )
            }

            if ( parsingSymb ) {
                //If a symbol is currently being parsed, number of atoms must be 1.
                molFormula.set( currSymb, number(1) )    
            } else {
                //Otherwise parsing a number and it is finished.
                molFormula.set( currSymb, number(currNum) )
            }
            currChar = nextChar
            if ( isDigit( nextChar ) ) {

            }
        }

    }
}

