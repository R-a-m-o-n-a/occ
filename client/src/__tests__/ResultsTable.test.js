import { cleanup, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { correctCityData } from "../__mocks__/cityDataMock.js";
import ResultsTable from "../components/ResultsTable.jsx";

describe('ResultsTable component', () => {
  const cityNames = correctCityData.map(c => c.name);
  const exampleDistances = Array.from(Array(10).keys()).map(x => x * 12.34);

  afterEach(cleanup);

  test("ResultsTable renders", async () => {

    const { getByText } = render(<ResultsTable cityNames={cityNames} distances={exampleDistances} />);

    await waitFor(() => {
      // assert some right content is shown
      expect(getByText('Madrid')).toBeInTheDocument();

    });
  });
});
