"use strict";

// Atomic weight from International Union of Pure and Applied Chemistry,
// Commission on isotopic abundances and atomic weights.
// https://www.ciaaw.org/atomic-weights.htm
const elmtSymb = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Th', 'Pa', 'U']
const atWt =['1.00784', '4.002602', '6.938', '9.0121831', '10.806', '12.0096', '14.00643', '15.99903', '18.998403163', '20.1797', '22.98976928', '24.304', '26.9815384', '28.084', '30.973761998', '32.059', '35.446', '39.792', '39.0983', '40.078', '44.955908', '47.867', '50.9415', '51.9961', '54.938043', '55.845', '58.933194', '58.6934', '63.546', '65.38', '69.723', '72.63', '74.921595', '78.971', '79.901', '83.798', '85.4678', '87.62', '88.90584', '91.224', '92.90637', '95.95', '101.07', '102.90549', '106.42', '107.8682', '112.414', '114.818', '118.71', '121.76', '127.6', '126.90447', '131.293', '132.90545196', '137.327', '138.90547', '140.116', '140.90766', '144.242', '150.36', '151.964', '157.25', '158.925354', '162.5', '164.930328', '167.259', '168.934218', '173.045', '174.9668', '178.486', '180.94788', '183.84', '186.207', '190.23', '192.217', '195.084', '196.96657', '200.592', '204.382', '207.2', '208.9804', '232.0377', '231.03588', '238.02891']
var atomicWeight = new Map()
for ( let i = 0; i < elmtSymb.length; i++) {
    atomicWeight.set( elmtSymb[i], atWt[i] )
};

// console.log( atomicWeight );

// My functions

const isDigit = ( testChar ) => {
    let cc = testChar.charCodeAt(0);
    return cc > 47 && cc < 58; 
};

//braces not obligatory, but prefer consistent syntax.
const isUppercase = ( testChar ) => { return testChar === testChar.toUpperCase() };

const mergeFormulae = ( formulaA, formulaB ) => {
    //Combines two formulae, held in seperate maps, into a new formula in the returned map.
    for (let [key, value] of formulaB.entries()) {
        //The chem element is already in formulaA, so add new number of atoms to original number.
        if ( formulaA.has( key ) ) {
            let valA = formulaA.get( key );
            valA += value;
            formulaA.set( key, valA);
        } else {
            //The chem element is not in formula, so add new chem element with number of atoms.
            formulaA.set( key, value );
        }
    }
    return formulaA;
}

const makeMolFormula = ( chemFormula ) => {
    var currChar, nextChar, currChemSymb, currNumString;
    var atoms = new Map();
    var molFormula = new Map();
    //Parsing algorithm uses next character to decide what to do with previous one,
    //so need a stop character.
    // Note: currently assumes totally correct input.
    chemFormula = chemFormula + '@'

    currChar = chemFormula.slice(0, 1);
    currChemSymb = currChar;

    for (let i = 1; i < chemFormula.length; i++) {
        nextChar = chemFormula.slice( i, i+1 );
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
        } else {
            // currChar is not a digit
            if ( isDigit( nextChar ) ) {
                //End of a chem symbol, start of a number
                currNumString = nextChar;
            } else if ( isUppercase( nextChar ) ) {
                //End of a chem symbol for which the number of atoms must be 1
                atoms.set( currChemSymb, Number(1) );
                molFormula = mergeFormulae ( molFormula, atoms );
                //Start a new symbol
                currChemSymb = nextChar;    
            } else {
                //Otherwise nextChar must be lowercase - continue symbol
                currChemSymb += nextChar;
            }
        }
        atoms.clear();
        currChar = nextChar;
    }
    return molFormula;
}

const makeOutputString = ( molFormula ) => {
    var outString = "";
    for (let [key, value] of molFormula.entries() ) {
        if ( value === 1 ) {
            outString += key;    
        } else {
            outString += key + '<sub>' + value + '</sub>';
        }
    }
    return outString;
}

const calcMolWeight = ( molFormula ) => {
    var molWeight = Number(0)
    for (let [chemSymb, numAtoms] of molFormula.entries() ) {
        if ( atomicWeight.has( chemSymb ) ) {
            molWeight += Number( numAtoms ) * Number( atomicWeight.get( chemSymb ) );   
        } else {
            molWeight = undefined;
        }
    }
    return molWeight;
}

const calcNumAtoms = ( molFormula ) => {
    var totNumAtoms = Number(0)
    for (let [chemSymb, numAtoms] of molFormula.entries() ) {
            totNumAtoms += Number( numAtoms );   
    }
    return totNumAtoms;
}

const outPrecision = 4;
var currChemFormula, currOutputString, currNumAtoms, currMolWt;
var currMolFormula = new Map();
var outputFormula, outputMolWt, outputTable;
var inputForm = document.getElementById( 'input-form' );
var inputBox = document.getElementById( 'chem-formula-input' );
// inputBox.value = 'CH3COOH';

// Form submission listener
inputForm.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    // Get the input
    currChemFormula = inputBox.value;

    currMolFormula = makeMolFormula( currChemFormula );
    currOutputString = makeOutputString ( currMolFormula );
    
    outputFormula = document.getElementById( 'mol-formula' );
    outputFormula.innerHTML = currOutputString;
    
    outputMolWt = document.getElementById( 'mol-weight' );
    currMolWt = calcMolWeight( currMolFormula );
    outputMolWt.innerHTML = currMolWt;

    currNumAtoms = calcNumAtoms( currMolFormula );

    outputTable = document.getElementById( 'table-output' );    
    currOutputString = '';
    for (let [chemSymb, numAtoms] of currMolFormula.entries() ) {
        currOutputString += '<tr>';
        currOutputString += '<td>' + chemSymb + '</td>';
        let atMolPercent= 100 * numAtoms / currNumAtoms;
        currOutputString += '<td>' + atMolPercent.toPrecision(outPrecision) + '</td>';
        let atomsWeight = Number( numAtoms ) * Number( atomicWeight.get( chemSymb ) );
        let atWtPercent = 100 * atomsWeight / currMolWt;
        currOutputString += '<td>' + atWtPercent.toPrecision(outPrecision) + '</td>';
        currOutputString += '</tr>';
    }
    outputTable.innerHTML = currOutputString;

} );


