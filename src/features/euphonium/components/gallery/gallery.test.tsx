/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { useUsers } from "../../../user/hook/use.user.hook";
import { useEuphonium } from "../../hook/use.euphonium.hook";
import { EuphoniumRepo } from "../../services/repository/euphonium.repo";
import { Gallery } from "./gallery";
import { LoadingSpin } from "../../../../common/components/loading/loading";

jest.mock("../../services/repository/euphonium.repo");
jest.mock("../../../user/services/repository/user.repo");
jest.mock("../../hook/use.euphonium.hook");
jest.mock("../../../user/hook/use.user.hook");

jest.mock("../../../../common/components/loading/loading");

describe("Given Gallery", () => {
  const mockEuphoniumRepo = {} as EuphoniumRepo;
  describe("When it is render with euphoniums", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [{ id: "1", creator: { id: "1" } }, { id: "2" }],
        deleteEuphonium: jest.fn(),
        loadEuphoniumsPaginated: jest.fn(),
        loadEuphoniumsFiltered: jest.fn(),
        clearEuphoniumsList: jest.fn(),
      });

      (useUsers as jest.Mock).mockReturnValue({
        user: {
          user: { id: "1" },
        },
      });

      render(
        <Router>
          <Gallery></Gallery>
        </Router>
      );
    });

    test("Then it should be called", async () => {
      const element = screen.getByRole("heading");
      expect(element).toBeInTheDocument();
    });

    describe("When click the first Link", () => {
      test("Then it should call the removeFilterHandler", async () => {
        const buttons = screen.getAllByRole("button");
        await act(async () => {
          userEvent.click(buttons[0]);
        });
        expect(buttons[0]).toBeInTheDocument();
      });
    });

    describe("When click the first Button", () => {
      test("Then it should call the removeFilterHandler", async () => {
        const buttons = screen.getAllByRole("button");
        await act(async () => {
          await userEvent.click(buttons[0]);
        });
        expect(buttons[0]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
        ).toHaveBeenCalled();
        expect(
          useEuphonium(mockEuphoniumRepo).loadEuphoniumsPaginated
        ).toHaveBeenCalled();
      });
    });

    describe("When click the second Button", () => {
      test("Then it should call the filterHandler", async () => {
        const buttons = screen.getAllByRole("button");
        await act(async () => {
          await userEvent.click(buttons[1]);
        });
        expect(buttons[1]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
        ).toHaveBeenCalled();
        expect(
          useEuphonium(mockEuphoniumRepo).loadEuphoniumsFiltered
        ).toHaveBeenCalledWith("1", "Plateado");
      });
    });

    describe("When click the third Button", () => {
      test("Then it should call the filterHandler", async () => {
        const buttons = screen.getAllByRole("button");
        await act(async () => {
          await userEvent.click(buttons[2]);
        });
        expect(buttons[2]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
        ).toHaveBeenCalled();
        expect(
          useEuphonium(mockEuphoniumRepo).loadEuphoniumsFiltered
        ).toHaveBeenCalled();
      });
    });

    describe("When click the fourth Button", () => {
      test("Then it should call the filterHandler", async () => {
        const buttons = screen.getAllByRole("button");
        await act(async () => {
          await userEvent.click(buttons[3]);
        });
        expect(buttons[3]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).clearEuphoniumsList
        ).toHaveBeenCalled();
        expect(
          useEuphonium(mockEuphoniumRepo).loadEuphoniumsFiltered
        ).toHaveBeenCalled();
      });
    });

    describe("When click the sixth Button", () => {
      test("Then it should delete the item", async () => {
        const buttons = screen.getAllByRole("button");
        await act(async () => {
          await userEvent.click(buttons[5]);
        });
        expect(buttons[5]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).deleteEuphonium
        ).toHaveBeenCalled();
      });
    });

    describe("When click the seventh Button", () => {
      test("Then it should call the loadEuphoniumsPaginated if no filter active", async () => {
        const buttons = screen.getAllByRole("button");
        await act(async () => {
          await userEvent.click(buttons[6]);
        });

        expect(buttons[6]).toBeInTheDocument();
        expect(
          useEuphonium(mockEuphoniumRepo).loadEuphoniumsPaginated
        ).toHaveBeenCalled();
        expect(
          useEuphonium(mockEuphoniumRepo).loadEuphoniumsFiltered
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe("When it is render with empty euphoniums state", () => {
    beforeEach(async () => {
      (useEuphonium as jest.Mock).mockReturnValue({
        euphoniums: [],
        deleteEuphonium: jest.fn(),
        loadEuphoniumsPaginated: jest.fn(),
        loadEuphoniumsFiltered: jest.fn(),
        clearEuphoniumsList: jest.fn(),
      });

      (useUsers as jest.Mock).mockReturnValue({
        user: {
          user: { id: "1" },
        },
      });

      render(
        <Router>
          <Gallery></Gallery>
        </Router>
      );
    });

    test("Then it should be called", async () => {
      const element = screen.getAllByRole("generic");
      expect(element[0]).toBeInTheDocument();
    });

    test("Then de component LoadingSpin should have been called", () => {
      expect(LoadingSpin).toHaveBeenCalled();
    });
  });
});
