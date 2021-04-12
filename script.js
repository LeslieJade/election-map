/*** Politician object ***/
const createPolitician = function(fullName, partyColor) {

    const politician = {
        name: fullName,
        electionResults: null,
        totalVotes: 0,
        resultsTotal: function() {
            this.resultsTotal = 0;

            for (var i = 0; i < this.electionResults.length; i++) {
                this.resultsTotal = this.resultsTotal + this.electionResults[i];
            }
        },
        color: partyColor
    }

    return politician;
};

const troy = createPolitician("Troy Calypso", [0,96,0]);
const tyreen = createPolitician("Tyreen Calypso", [61,0,96]);

/*** Election results from each state ***/
troy.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];
tyreen.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];

/*** Winner of each state ***/
setStateResults = function(state) {

    theStates[state].winner = null;

    if (troy.electionResults[state] > tyreen.electionResults[state]) {
        theStates[state].winner = troy;
    } else if (tyreen.electionResults[state] > troy.electionResults[state]) {
            theStates[state].winner = tyreen;
        } else if (troy.electionResults[state] === tyreen.electionResults[state]) {
                theStates[state].winner = null;
            } else {
                theStates[state].winner = null;
            }; 
            
    /*** Set state color ***/
    const stateWinner = theStates[state].winner;

    if (stateWinner !== null) {
        theStates[state].rgbColor = stateWinner.color;
    } else {
        theStates[state].rgbColor = [0,43,96];
    };

    /*** Populate countryResults table ***/
    const countryTable = document.getElementById('countryResults');
    const countryTableRow = countryTable.children[0].children[0];

    countryTableRow.children[0].innerText = troy.name;
    countryTableRow.children[1].innerText = troy.totalVotes;
    countryTableRow.children[2].innerText = tyreen.name;
    countryTableRow.children[3].innerText = tyreen.totalVotes;
    countryTableRow.children[5].innerText = winner;

    /*** Populate stateResults table ***/
    const stateTable = document.getElementById('stateResults');
    const stateTableHeader = stateTable.children[0];
    const stateTableBody = stateTable.children[1];
    const stateName = stateTableHeader.children[0].children[0];
    const stateAbbrev = stateTableHeader.children[0].children[1];
    const nameTroy = stateTableBody.children[0].children[0];
    const stateVotesTroy = stateTableBody.children[0].children[1];
    const nameTyreen = stateTableBody.children[1].children[0];
    const stateVotesTyreen = stateTableBody.children[1].children[1];
    const nameWinner = stateTableBody.children[2].children[1];

    stateName.innerText = theStates[state].nameFull;
    stateAbbrev.innerText = theStates[state].nameAbbrev;
    nameTroy.innerText = troy.name;
    stateVotesTroy.innerText = troy.electionResults[state];
    nameTyreen.innerText = tyreen.name;
    stateVotesTyreen.innerText = tyreen.electionResults[state];
    
    if (stateWinner === null){
        nameWinner.innerText = "TIE";
    } else {
        nameWinner.innerText = stateWinner.name;
    }
};

/*** Overall election results ***/
troy.resultsTotal();
tyreen.resultsTotal();

troy.totalVotes = troy.resultsTotal;
tyreen.totalVotes = tyreen.resultsTotal;

/*** Election winner ***/
let winner;
if (troy.resultsTotal > tyreen.resultsTotal) {
    winner = troy.name;
} else if (troy.resultsTotal < tyreen.resultsTotal) {
        winner = tyreen.name;
    } else (troy.resultsTotal === tyreen.resultsTotal)
    { winner = "It's a tie!";
    }
    console.log(winner + "!");

