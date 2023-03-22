import { render } from "@testing-library/react";
import { AddUpdateForm } from "../../common/components/form/addupd.form";
import AddPage from "./add.page";

jest.mock("../../common/components/form/addupd.form");
describe("Given Add Page component", () => {
  describe("When it is render", () => {
    test("Then it should be called", () => {
      render(<AddPage></AddPage>);
      expect(AddUpdateForm).toHaveBeenCalled();
    });
  });
});
