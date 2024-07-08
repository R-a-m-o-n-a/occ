import { cleanup, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { correctCityData } from "../__mocks__/cityDataMock.js";
import Table from "../components/Table.jsx";
import Map from "../components/Map.jsx";

describe('Table component', () => {

  afterEach(cleanup);

  test("Table renders content", async () => {
    // render Table alongside Map because Table sets maxWidth of Map
    const { getByText } = render(<><Table cities={correctCityData} /><Map cities={correctCityData} /></>);

    // assert some right content is shown (only testing data that should be in the table but not on the map to be able to use getByText and not getAllByText)
    await waitFor(() => {
      expect(getByText('5.312.000')).toBeInTheDocument();
      expect(getByText('Chrysler Building, Brooklyn Bridge, Madison Square Garden')).toBeInTheDocument();
      expect(getByText('München')).toBeInTheDocument();
    });
  });
});
