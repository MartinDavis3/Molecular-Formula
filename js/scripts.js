"use strict";

// Atomic weights from: International Union of Pure and Applied Chemistry,
// Commission on isotopic abundances and atomic weights.
// https://www.ciaaw.org/atomic-weights.htm
const elmtSymb = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Th', 'Pa', 'U'];
const atWt = ['1.00784', '4.002602', '6.938', '9.0121831', '10.806', '12.0096', '14.00643', '15.99903', '18.998403163', '20.1797', '22.98976928', '24.304', '26.9815384', '28.084', '30.973761998', '32.059', '35.446', '39.792', '39.0983', '40.078', '44.955908', '47.867', '50.9415', '51.9961', '54.938043', '55.845', '58.933194', '58.6934', '63.546', '65.38', '69.723', '72.63', '74.921595', '78.971', '79.901', '83.798', '85.4678', '87.62', '88.90584', '91.224', '92.90637', '95.95', '101.07', '102.90549', '106.42', '107.8682', '112.414', '114.818', '118.71', '121.76', '127.6', '126.90447', '131.293', '132.90545196', '137.327', '138.90547', '140.116', '140.90766', '144.242', '150.36', '151.964', '157.25', '158.925354', '162.5', '164.930328', '167.259', '168.934218', '173.045', '174.9668', '178.486', '180.94788', '183.84', '186.207', '190.23', '192.217', '195.084', '196.96657', '200.592', '204.382', '207.2', '208.9804', '232.0377', '231.03588', '238.02891'];
const atWtVar = ['6.07499999999966E-09', '1.33333333370607E-12', '2.90083333333335E-04', '8.33333335046594E-14', '1.87500000000014E-05', '3.33333333332964E-07', '6.02083333333044E-08', '4.56333333333835E-08', '1.2000001985769E-17', '1.19999999999441E-07', '1.33333355397433E-16', '7.50000000000057E-07', '2.99999999906231E-14', '3.33333333332964E-07', '8.33333471233957E-18', '2.40833333333419E-05', '1.00833333333384E-05', '2.43674999999998E-03', '3.33333333355464E-09', '5.33333333332742E-06', '8.33333333862356E-12', '3.3333333333178E-07', '3.33333333355464E-09', '1.19999999999441E-07', '1.33333333607455E-12', '1.33333333333659E-06', '2.99999999906231E-12', '5.33333333330847E-08', '3.00000000000023E-06', '1.3333333333328E-04', '3.33333333336517E-07', '2.13333333333324E-03', '1.19999999962492E-11', '2.13333333333097E-05', '3.00000000000023E-06', '1.33333333332712E-06', '2.99999999991496E-08', '3.33333333333674E-05', '3.33333333544942E-11', '1.33333333332712E-06', '3.33333333544942E-11', '3.33333333333674E-05', '1.3333333333328E-04', '1.33333333417977E-10', '3.33333333333674E-05', '1.33333333342186E-08', '5.33333333334637E-06', '3.33333333336517E-07', '1.63333333333301E-03', '3.33333333333674E-05', '2.99999999999994E-02', '2.99999999906231E-10', '1.20000000000009E-05', '1.19999963014273E-15', '1.63333333333567E-05', '1.63333333304387E-09', '3.33333333336517E-07', '3.33333333544942E-11', '2.99999999997181E-06', '1.3333333333347E-04', '3.33333333336517E-07', '3.00000000000023E-04', '2.13333333771928E-11', '3.33333333333295E-03', '1.63333333834926E-11', '2.99999999997181E-06', '1.20000000530927E-11', '3.33333333336517E-07', '3.33333333355464E-09', '1.20000000000009E-05', '1.33333333417977E-10', '3.33333333332727E-05', '3.33333333336517E-07', '3.00000000000023E-04', '1.33333333334607E-06', '2.69999999999168E-05', '5.33333333671908E-10', '2.99999999997181E-06', '7.49999999992951E-07', '3.33333333333295E-03', '3.33333333355464E-09', '5.33333333368743E-08', '3.33333333544942E-11', '3.00000000190448E-10']
var atomicWeight = new Map();
var atomicWeightVariance = new Map();
for ( let i = 0; i < elmtSymb.length; i++) {
    atomicWeight.set( elmtSymb[i], atWt[i] );
    atomicWeightVariance.set( elmtSymb[i], atWtVar[i] );
}

// My functions

const isDigit = ( testChar ) => {
    let cc = testChar.charCodeAt( 0 );
    return cc > 47 && cc < 58; 
}

//braces not obligatory, but prefer consistent syntax.
const isUppercase = ( testChar ) => { return testChar === testChar.toUpperCase() }

const isOpenBracket = ( testChar ) => { return ( testChar === "(" || testChar === "[" || testChar === "{" ) }

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

const multiplyFormula = ( formula, x ) => {
    //Multiply the number of atoms for each chem element by x.
    for (let [key, value] of formula.entries()) {
        formula.set( key, formula.get(key) * x );
    }
    return formula;
}

const getSubFormula = ( chemForm, i ) => {
    //Routine returns an array containing:
    //subformula,
    //number of repeats of subformula,
    //character position of end of subformula repeats number
    var j, endNum, numStr, bracketOpen, bracketClose;
    var subForm = [];
    bracketOpen = chemForm.slice( i, i+1 );
    if (bracketOpen === "(") {
        bracketClose = ")";
    } else if (bracketOpen === "[") {
        bracketClose = "]";
    } else if (bracketOpen === "{") {
        bracketClose = "}";
    }
    j = chemForm.indexOf( bracketClose, i+1 );
    //Subform is part between the brackets
    subForm[0] = chemForm.slice( i + 1, j );
    //Now iterate over number part until a non-digit is found
    numStr ="";
    endNum = false;
    while ( !endNum ) {
        j++;
        let tc = chemForm.slice( j, j + 1 );
        if ( isDigit( tc ) ) {
            numStr += tc;
        } else {
            endNum = true;
        } 
    }
    //If no number part, then it is 1.
    if ( numStr === "" ) { numStr = "1" }
    subForm[1] = Number( numStr );
    //The position where the sub formula ends is one before the current position
    subForm[2] = Number(j-1);
    console.log(subForm);
    return subForm;
}

//Function to sort a formula held as a map into standard chemical order (Hill System).
const sortHillSystem = ( formulaMap ) => {
    //Contruct compare function to use. This only needs to return 1 or -1. No 0 required as map cannot repeat key.
    let compareFunction
    if ( formulaMap.has('C') ) {
        //Formula contains C, so C first, followed by, H followed by not C or H in alphabetic order.
        compareFunction = ( a, b ) => {
            if ( ( a[0] === 'C' ) || ( a[0] === 'H' && b[0] !== 'C' ) ) {
                //C is first, or H is first followed by something which is not C, then order is correct.
                return -1
            } else if ( ( b[0] === 'C' ) || ( b[0] === 'H' && a[0] !== 'C' ) ) {
                //C is second, or H is second, preceded by something which is not C, then order is incorrect.
                return 1
            } else {
                //Neither a or b are C or H, so compare just by alphabetic order.
                if ( a[0] < b[0] ) {
                    return -1
                } else {
                    return 1
                }
            }
        }
    } else {
        //Formula does not contain C, so sort just by alphabetic order.
        compareFunction = ( a, b ) => a[0] > b[0] ? 1 : -1
    }
    return new Map( [...formulaMap].sort( compareFunction ) );
}

const makeMolFormula = ( chemFormula ) => {
    var i, nextChar, currChemSymb, currNumString;
    var parsingNum;
    var atoms = new Map();
    var molFormula = new Map();
    var subFormula = [];
    //Parsing algorithm uses next character to decide what to do,
    //so need a stop character.
    //Note: assumes totally correct input.
    chemFormula = '@' + chemFormula + '@';
    console.log(chemFormula);

    currChemSymb = chemFormula.slice(0, 1);
    parsingNum = false;
    currNumString = "";
    i = 1;
    while ( i < chemFormula.length ) {
        nextChar = chemFormula.slice( i, i+1 );
        if ( isOpenBracket( nextChar ) ) {
            //If there is no number, then it is 1.
            if ( currNumString === "" ) { currNumString="1"} 
            //Add current atoms to molecular formular
            atoms.set( currChemSymb, Number( currNumString ) );
            molFormula = mergeFormulae( molFormula, atoms );
            //Get the part of the formula related to the brackets
            subFormula = getSubFormula( chemFormula, i);
            //Get the atoms in the sub formula by recursive call
            atoms = makeMolFormula( subFormula[0] );
            //Multiply by the number of repeats of the sub formula
            atoms = multiplyFormula( atoms, subFormula[1] );
            //Merge the sub formula with the main formula
            molFormula = mergeFormulae ( molFormula, atoms );
            //Now need to start processing formula from end of subFormula
            i = subFormula[2];
            parsingNum = false;
            currChemSymb = '@';
        } else if ( parsingNum ) {
            if ( isDigit( nextChar ) ) {
                //Continuing a number
                currNumString += nextChar;
            } else {
                //Number finished, chem symbol starts
                atoms.set( currChemSymb, Number( currNumString ) );
                molFormula = mergeFormulae ( molFormula, atoms );
                parsingNum = false;
                currChemSymb = nextChar;
            }
        } else {
            // Not parsing a number
            if ( isDigit( nextChar ) ) {
                //End of a chem symbol, start of a number
                currNumString = nextChar;
                parsingNum = true;
            } else if ( isUppercase( nextChar ) ) {
                //End of a chem symbol for which the number of atoms must be 1
                atoms.set( currChemSymb, Number( 1 ) );
                molFormula = mergeFormulae ( molFormula, atoms );
                //Start a new symbol
                currChemSymb = nextChar;    
            } else {
                //Otherwise nextChar must be lowercase - continue symbol
                currChemSymb += nextChar;
            }
        }
        atoms.clear();
        i++
    }
    molFormula.delete('@')
    return molFormula;
}

const makeOutputString = ( molFormula ) => {
    var outString = '';
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
    //Calculates molecular weight value and standard deviation from the supplied formula map.
    //Returns an array: [molecular weight, standard deviation].
    let molWeight = Number( 0 );
    let molWeightVariance = Number( 0 );
    for (let [chemSymb, numberOfAtoms] of molFormula.entries() ) {
        let numAtoms = Number(numberOfAtoms)
        if ( atomicWeight.has( chemSymb ) ) {
            molWeight += numAtoms * Number( atomicWeight.get( chemSymb ) );   
            molWeightVariance += numAtoms * numAtoms * Number( atomicWeightVariance.get( chemSymb ) );   
        } else {
            molWeight = undefined;
            molWeightVariance = undefined;
        }
    }
    return [molWeight, Math.sqrt(molWeightVariance)];
}

const molecularWeightToString = ( molecularWeight ) => {
    //Returns molecular weight in standard value(sd) format.
    const molWeightValue = molecularWeight[0];
    const sd = molecularWeight[1];
    const sdRounded = Number( sd.toPrecision(1) );
    const sdDecimalPlaces = -Math.floor(Math.log10(sdRounded));
    const sdDigit = Math.round (sdRounded * Math.pow(10, sdDecimalPlaces) );
    return molWeightValue.toFixed(sdDecimalPlaces) + '(' + sdDigit + ')';
}

const calcNumAtoms = ( molFormula ) => {
    var totNumAtoms = Number( 0 );
    for (let [chemSymb, numAtoms] of molFormula.entries() ) {
            totNumAtoms += Number( numAtoms );   
    }
    return totNumAtoms;
}

const outTableDecimalPlaces = 3;
var currChemFormula, currOutputString, currNumAtoms, currMolWt;
var currMolFormula = new Map();
var currMolecularWeight = [];
var outputFormula, outputMolWt, outputTable;
var inputForm = document.getElementById( 'input-form' );
var inputBox = document.getElementById( 'chem-formula-input' );

// Form submission listener
inputForm.addEventListener( 'submit', function ( event ) {
    event.preventDefault();

    currChemFormula = inputBox.value;

    currMolFormula = sortHillSystem( makeMolFormula( currChemFormula ) );
    currOutputString = makeOutputString ( currMolFormula );
    
    outputFormula = document.getElementById( 'mol-formula' );
    outputFormula.innerHTML = currOutputString;
    
    outputMolWt = document.getElementById( 'mol-weight' );
    currMolecularWeight = calcMolWeight( currMolFormula );
    outputMolWt.innerHTML = molecularWeightToString( currMolecularWeight );
    currMolWt = currMolecularWeight[0];

    currNumAtoms = calcNumAtoms( currMolFormula );

    outputTable = document.getElementById( 'table-output' );    
    currOutputString = '';
    for (let [chemSymb, numAtoms] of currMolFormula.entries() ) {
        currOutputString += '<tr>';
        currOutputString += '<td>' + chemSymb + '</td>';
        let atMolPercent= 100 * numAtoms / currNumAtoms;
        currOutputString += '<td>' + atMolPercent.toFixed(outTableDecimalPlaces) + '</td>';
        let atomsWeight = Number( numAtoms ) * Number( atomicWeight.get( chemSymb ) );
        let atWtPercent = 100 * atomsWeight / currMolWt;
        currOutputString += '<td>' + atWtPercent.toFixed(outTableDecimalPlaces) + '</td>';
        currOutputString += '</tr>';
    }
    outputTable.innerHTML = currOutputString;

} );
