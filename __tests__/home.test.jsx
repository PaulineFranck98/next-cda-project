import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Home from "../app/page";


  describe("Home Page", () => {
  it("check for relevant text", () => {
    const { getByText } = render(<Home />);

    expect(
      getByText((content) => content.includes("Get started by editing"))
    ).toBeInTheDocument();
    
    expect(
      getByText((content) => content.includes("Save and see your changes instantly."))
    ).toBeInTheDocument();
  });
});

