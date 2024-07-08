import { cleanup, render } from "@testing-library/react";
import Button from "../components/Buttons/Button.jsx";
import '@testing-library/jest-dom';

describe('Button component', () => {

  afterEach(cleanup);

  test("Secondary button renders", () => {
    const { getByRole } = render(<Button label="Test" secondary />);
    expect(getByRole('button')).toBeInTheDocument();
  })

  test("Primary button displays correct label", () => {
    const { getByRole } = render(<Button label="Test" primary />);
    expect(getByRole('button')).toHaveTextContent("Test");
  })
});
