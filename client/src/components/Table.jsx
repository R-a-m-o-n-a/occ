import './Table.scss';
import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Grid Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Grid Theme
import { arrayOf } from "prop-types";
import { cityType } from "../custom-prop-types.js";

/**
 * Table with info about all cities
 *
 * @param {object} props cities: array of cityType
 * @returns {JSX.Element} the table
 * @constructor
 */
const Table = (props) => {
  const { cities } = props;

  const [tableMaxWidth, setTableMaxWidth] = useState('100%');

  const gridColumns = [
    { field: "name", headerName: "City Name" },
    { field: "name_native", headerName: "Native Name" },
    { field: "country" },
    { field: "continent" },
    { field: "population", type: 'rightAligned', valueFormatter: p => p.value.toLocaleString() }, // format big number with separators
    { field: "founded", type: 'rightAligned' },
    { field: "landmarks", filter: false, valueFormatter: p => p.value.join(', ') },
    // { field: "latitude", type: 'rightAligned' },
    // { field: "longitude", type: 'rightAligned' },
  ];

  const defaultColumnDefinition = {
    filter: true, // enable filtering on all columns
  };

  const gridOptions = {
    autoSizeStrategy: {
      type: 'fitCellContents' // autosize columns to fit content
    },
    domLayout: 'autoHeight', // renders all rows, only suitable for limited number of rows
    suppressColumnVirtualisation: true, // render also columns that are off-screen in order for autosize to work for all columns
  }

  /**
   * set max-width of table to the actual with of the table (after auto-sizing all columns)
   * without this, the table gets empty whitespace on the right
   * @param tableData passed automatically in onStateUpdated of AgGridReact element
   */
  function setMaxWidthOfTable(tableData) {
    const api = tableData.api;
    let width = 0;
    api.getAllGridColumns().forEach((column) => {
      width += column.getActualWidth();
    });
    setTableMaxWidth(width + 'px');

    // set map container to same max-width for a uniform look
    document.getElementById('mapContainer').style.maxWidth = width + 'px';
  }

  return (
    <div className="table ag-theme-quartz" data-testid="cityTable" style={{ maxWidth: tableMaxWidth }}>
      <AgGridReact rowData={cities}
                   columnDefs={gridColumns}
                   defaultColDef={defaultColumnDefinition}
                   gridOptions={gridOptions}
                   onStateUpdated={setMaxWidthOfTable}
                   onGridSizeChanged={setMaxWidthOfTable} />
    </div>
  );
}

Table.propTypes = {
  /** array of cities */
  cities: arrayOf(cityType).isRequired,
}

export default Table;
