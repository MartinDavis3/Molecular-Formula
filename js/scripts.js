// My functions

const isDigit = ( testChar ) => {
    let cc = testChar.charCodeAt(0);
    return cc > 47 && cc < 58; 
};

const isUppercase = ( testChar ) => { return testChar === testChar.toUpperCase() };

const mergeFormulae = ( formulaA, formulaB ) => {
    //Combines two formulae, held in seperate maps, into a new formula in the returned map.
    for (let [key, value] of formulaB.entries()) {
        //The chem element is already in formulaA, so add new number of atoms to original number.
        if ( formulaA.has( key ) ) {
            let ValA = formulaA.value( key );
            ValA += value;
            formulaA.set( key, valA);
        } else {
            //The chem element is not in formula, so add new chem element with number of atoms.
            formulaA.set( key, value );
        }
    }
    return formulaA;
}

makeMolFormula = function( chemFormula ) {
    var currChar, nextChar, currChemSymb, currNumString;
    //Parsing algorithm uses next character to decide what to do with previous one,
    //so need a stop character.
    // Note: currently assumes totally correct input.
    chemFormula = chemFormula + '@'    

    atoms = new Map();
    CurrChar = chemFormula.slice(0);

    for (let i = 1; i < chemFormula.length; i++) {
        nextChar = chemFormula.slice(i);
        if ( isDigit( currChar ) ) {
            if ( isDigit( nextChar ) ) {
                //Continuing a number
                currNumString += nextChar;
            } else {
                //Number finished, chem symbol starts
                atoms.set( currChemSymb, Number( currNumString ) );
                molFormula = mergeFormulae ( molFormula, atoms );
                currChemSymb = nextChar;
            }
        } else if ( nextChar !== "@" ) {
            // currChar is not a digit
            if ( isDigit( nextChar ) ) {
                //End of a chem symbol, start of a number
                currNumString = nextChar;
            } else if ( isUppercase( nextChar ) ) {
                //End of a chem symbol for which the number of atoms must be 1
                atoms.set( currSymb, number(1) )
                molFormula = mergeFormulae ( molFormula, atoms );
                //Start a new symbol
                currChemSymb = nextChar;    
            } else {
                //Otherwise nextChar must be lowercase - continue symbol
                currSymb += nextChar;
            }
        }
        atoms.clear();
        currChar = nextChar;
    }
}

function makeOutputString( molFormula ) {
    var outString;
    for (let [key, value] of molFormula.entries()) {
        outString += key + '<span>' + value + '</span>';
    }
}

currMolFormula = new Map();
var currOutputString;
var inputForm = document.getElementById( 'input-form' );

// Form submission listener
inputForm.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    // Get the input
    var currChemFormula = document.getElementById( 'chem-formula-input' ).value;
} );

currMolFormula = makeMolFormula( currChemFormula );
currOutputString = makeOutputString ( currMolFormula );

// Set communication output element
var outputPara = document.getElementById( 'output');
outputPara.innerHTML = currOutputString;

