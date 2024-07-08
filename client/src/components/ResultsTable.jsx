import { AgGridReact } from "ag-grid-react";
import { arrayOf, number, string } from "prop-types";

/**
 * Table displaying Quiz Results
 *
 * @returns {JSX.Element} the table
 * @constructor
 */
const ResultsTable = (props) => {
  const { cityNames, distances } = props;

  /** calculate the average of numbers in an array */
  const average = (arr) => {
    if (arr.length > 0) {
      const sum = arr.reduce((accumulator, value) => (accumulator + value), 0);
      return (sum / arr.length).toFixed(2);
    } else {
      return undefined;
    }
  }

  // create data for columns round, cityName, distance of guess
  const results = cityNames.map((cityName, index) => {
    return { round: index, cityName, distance: distances[index] }
  });

  // create metadata and styling for columns
  const gridColumns = [
    { field: "round", headerName: '#', width: '40px', valueFormatter: round => (isNaN(round.value) ? '' : round.value + 1) },
    { field: "cityName", headerName: "City", flex: 1 },
    {
      field: "distance", type: 'rightAligned', width: '120px', valueFormatter: distance => {
        return distance.value + ' km';
      }
    },
  ];

  const gridOptions = {
    autoSizeStrategy: {
      type: 'fitGridWidth'
    },
    defaultColDef: {
      resizable: false,
    },
    domLayout: 'autoHeight', // renders all rows, only suitable for limited number of rows
    pinnedBottomRowData: [{ // add a row on the bottom that displays the average
      cityName: 'Average distance',
      distance: average(distances),
    }],
  }

  return (
    <div className="table ag-theme-quartz" id="resultsTable" data-testid="resultsTable">
      <AgGridReact rowData={results} columnDefs={gridColumns} gridOptions={gridOptions} />
    </div>
  );
}

ResultsTable.propTypes = {
  /** array of cities */
  cityNames: arrayOf(string).isRequired,
  /** array of distance of each guess */
  distances: arrayOf(number).isRequired,
}

export default ResultsTable;
