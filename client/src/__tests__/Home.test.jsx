import { cleanup, fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Home from '../components/Home.jsx';
import '@testing-library/jest-dom';
import axios from 'axios';
import { correctCityData, emptyArray, oneCityInArray } from "../__mocks__/cityDataMock.js";

jest.mock('axios');

describe('Data handling', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  test("fetching data error shows error page", async () => {
    axios.get.mockRejectedValueOnce(new Error());
    const { getByText } = render(<Home />);

    // Use waitFor to wait for the useEffect that fetches data
    await waitFor(() => {
      expect(getByText('Oops!')).toBeInTheDocument();
    });
  });

  test("server connection failed shows correct error page", async () => {
    // mock error if server connection failed
    axios.get.mockRejectedValueOnce({ code: "ERR_NETWORK" });
    const { getByText } = render(<Home />);

    // Use waitFor to wait for the useEffect that fetches data
    await waitFor(() => {
      expect(getByText('Could not connect to the server.')).toBeInTheDocument();
    });
  });

  test("empty array", async () => {
    axios.get.mockResolvedValueOnce({ data: emptyArray });
    const { queryAllByTestId, getByTestId } = render(<Home />);

    // Use waitFor to wait for the useEffect that fetches data
    await waitFor(() => {
      // expecting no cards in the carousel
      expect(queryAllByTestId('cityCard').length).toBe(0);
      expect(getByTestId('cardCarousel')).toBeInTheDocument();
    });
  });

  test("one element in array", async () => {
    axios.get.mockResolvedValueOnce({ data: oneCityInArray });
    const { getAllByTestId } = render(<Home />);

    // Use waitFor to wait for the useEffect that fetches data
    await waitFor(() => {
      // expecting only 1 cards in the carousel
      expect(getAllByTestId('cityCard').length).toBe(1);
    });

  });

});

describe('Home component', () => {

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: correctCityData });
  })

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Renders the main page", async () => {
    const { getByText } = render(<Home />);

    // Use waitFor to wait for the useEffect that fetches data
    await waitFor(() => {
      expect(getByText('Alternatively, display the data of all cities in the way you prefer:')).toBeInTheDocument();
    });
  });

  test("Renders city cards", async () => {
    const { getAllByText, getAllByTestId } = render(<Home />);

    // Use waitFor to wait for the useEffect that fetches data
    await waitFor(() => {
      //test for some city names to appear
      expect(getAllByText('Sydney').length).toBeGreaterThan(0);
      expect(getAllByText('New York City').length).toBeGreaterThan(0);
      expect(getAllByText('Lagos').length).toBeGreaterThan(0);
      expect(getAllByText('Munich').length).toBeGreaterThan(0);

      // expecting 8 cards in the carousel since 8 cities are in the data
      expect(getAllByTestId('cityCard').length).toBe(8);
    });
  });

  test("Scroll table and map into view on button click", async () => {
    // set up user events
    const user = userEvent.setup();
    // mock scrollIntoView with just scrolling down a bit
    window.HTMLElement.prototype.scrollIntoView = jest.fn(() => {fireEvent.scroll(window, { target: { scrollY: window.scrollY + 300 } })});
    // render Home page
    const { getByRole } = render(<Home />);

    // get ScrollToTopButton
    let tableButton, mapButton;
    await waitFor(() => {
      mapButton = getByRole('button', { name: 'Show on Map' });
      tableButton = getByRole('button', { name: 'Show as Table' });
    });

    // click button to scroll down
    await user.click(mapButton);
    // assert that window is scrolled down
    expect(window.scrollY).toBeGreaterThan(200);

    // click other button to scroll further down
    await user.click(tableButton);
    // assert that window is scrolled further down
    expect(window.scrollY).toBeGreaterThan(400);

  });

  test("Quiz can be opened from Home", async () => {
    // set up user events
    const user = userEvent.setup();
    // render Home page
    const { getByRole, getByText } = render(<Home />);

    let goToQuizButton;
    await waitFor(() => {
      goToQuizButton = getByRole('button', { name: 'Take the Quiz' });
    });

    await user.click(goToQuizButton);
    await waitFor(() => {
      expect(getByText('City Quiz')).toBeInTheDocument();
    });
  });

  test("Quiz can be opened from Home and closed again", async () => {
    // set up user events
    const user = userEvent.setup();
    // render Home page
    const { getByRole, getByText } = render(<Home />);

    // get button to go to quiz page
    let goToQuizButton;
    await waitFor(() => {
      goToQuizButton = getByRole('button', { name: 'Take the Quiz' });
    });

    // click button to go to quiz page
    await user.click(goToQuizButton);

    // assert city quiz page is open and get button to go back
    let goBackButton, quizTitle;
    await waitFor(async () => {
      quizTitle = screen.getByText('City Quiz');
      expect(quizTitle).toBeInTheDocument();
      goBackButton = getByRole('button', { name: 'go back' });
    });

    // click button to go back to Home
    await user.click(goBackButton);

    // assert Quiz is closed and Home is visible
    await waitFor(() => {
      expect(quizTitle).not.toBeInTheDocument();
      expect(getByText('Hi!')).toBeInTheDocument();
    });
  });

  test("test ScrollToTop button: scroll down (button gets visible) and scroll back up on click (button hidden again)", async () => {
    // set up user events
    const user = userEvent.setup();
    // mock window.scrollTo function that runs on button click
    window.scrollTo = jest.fn(() => {fireEvent.scroll(window, { target: { scrollY: 0 } })});

    // render Home page
    const { getByRole } = render(<Home />);

    // get ScrollToTopButton
    let button;
    await waitFor(() => {
      button = getByRole('button', { name: 'Scroll to top' });
    });

    // assert that it is hidden
    expect(button).toHaveClass('hidden');

    // scroll down below SCROLL_LIMIT (500)
    fireEvent.scroll(window, { target: { scrollY: 600 } })

    // assert that button is visible
    expect(button).not.toHaveClass('hidden');

    // click button to scroll back up
    await user.click(button);

    // assert that window is scrolled back to 0 and button is hidden again
    expect(button).toHaveClass('hidden');
    expect(window.scrollY).toBe(0);
  })
});

