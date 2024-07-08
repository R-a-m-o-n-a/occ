import { cleanup, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Quiz from "../components/Quiz.jsx";
import { userEvent } from "@testing-library/user-event";
import { correctCityData } from "../__mocks__/cityDataMock.js";

// jest.mock('mapbox-gl'); does not work properly, so I mocked the whole component

describe('Quiz component', () => {

  afterEach(cleanup);

  test("Quiz renders", async () => {

    const { getByText } = render(<Quiz cities={correctCityData} />);

    await waitFor(() => {
      // assert some right content is shown
      expect(getByText('City Quiz')).toBeInTheDocument();
      expect(getByText('Click on the map to answer.')).toBeInTheDocument();

      // assert one of the city names is shown
      const randomCity = document.querySelector('strong');

      const cityNames = correctCityData.map(c => c.name);
      expect(cityNames).toContain(randomCity.innerHTML);
    });
  });

  test("goBack function gets called on Button click", async () => {
    // set up user events
    const user = userEvent.setup();

    const goBack = jest.fn();

    const { getByRole } = render(<Quiz cities={correctCityData} goBack={goBack} />);

    let goBackButton;
    await waitFor(() => {
      goBackButton = getByRole('button', { name: 'go back' });
    });


    await user.click(goBackButton);

    expect(goBack).toHaveBeenCalled();

  });
});
