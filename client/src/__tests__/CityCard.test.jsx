import { cleanup, getByTestId, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { oneCityInArray, twoCities } from "../__mocks__/cityDataMock.js";
import CityCard from "../components/CityCard.jsx";
import { userEvent } from "@testing-library/user-event";
import CardCarousel from "../components/CardCarousel.jsx";

describe('CityCard component', () => {

  beforeEach(() => {
    // mock scroll functions to do nothing
    window.HTMLElement.prototype.scrollTo = jest.fn();
    window.HTMLElement.prototype.scrollBy = jest.fn();
  });

  afterEach(cleanup);

  test("Card renders", async () => {
    // render only Card
    const { getByText, getAllByText } = render(<CityCard city={oneCityInArray[0]} />);

    // assert some right content is shown
    await waitFor(() => {
      expect(getAllByText('Sydney')).toHaveLength(2); // city name is written on front and back of card
      expect(getByText('5.312.000')).toBeInTheDocument();
      expect(getByText('Sydney Opera House')).toBeInTheDocument();
    });
  });

  test("Card flips", async () => {
    // set up user events
    const user = userEvent.setup();
    // render Carousel with one city
    const { getByTestId } = render(<CardCarousel cities={oneCityInArray} />);

    // get cityCard
    let cityCard;
    await waitFor(() => {
      cityCard = getByTestId('cityCard');
    });

    // assert card is card but not flipped
    expect(cityCard).toHaveClass('card');
    expect(cityCard).not.toHaveClass('card-flipped');

    // click button to flip first card
    await user.click(cityCard);

    // assert card is flipped
    expect(cityCard).toHaveClass('card-flipped');
  });

  test("New card flip flips back other cards", async () => {
    jest.useFakeTimers(); // there is a timer on the last card for a scrolling animation
    // set up user events
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // render Carousel with two cities to test click on one closes the other
    const { getAllByTestId } = render(<CardCarousel cities={twoCities} />);

    // get cityCards
    let cityCards;
    await waitFor(() => {
      cityCards = getAllByTestId('cityCard');
    });

    // assert card is card but not flipped
    expect(cityCards[0]).toHaveClass('card');
    expect(cityCards[0]).not.toHaveClass('card-flipped');

    // click button to flip first card
    await user.click(cityCards[0]);

    // assert card is flipped
    expect(cityCards[0]).toHaveClass('card-flipped');

    // click button to flip other card
    await user.click(cityCards[1]);
    // finish timer started by flipping last card in the carousel
    jest.runOnlyPendingTimers();

    // assert first card is not flipped anymore
    expect(cityCards[0]).not.toHaveClass('card-flipped');
    // assert second card is flipped
    expect(cityCards[1]).toHaveClass('card-flipped');

    // reset timer mock
    jest.useRealTimers();
  });
});
