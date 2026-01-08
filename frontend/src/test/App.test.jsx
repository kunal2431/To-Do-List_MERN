import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, beforeEach, afterEach, test, expect } from "vitest";
import App from "../App";

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

test("Add a task and check if it appears", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => []
  });

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ _id: "1", title: "My Task", completed: false })
  });

  render(<App />);

  const input = await screen.findByPlaceholderText(/add/i);
  await userEvent.type(input, "My Task");

  const addButton = screen.getByRole("button", { name: /add/i });
  await userEvent.click(addButton);

  await waitFor(() => {
    expect(screen.getByText("My Task")).toBeInTheDocument();
  });
});

test("Mark a task as complete and check status update", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [{ _id: "1", title: "Task A", completed: false }]
  });

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ _id: "1", title: "Task A", completed: true })
  });

  render(<App />);

  expect(await screen.findByText("Task A")).toBeInTheDocument();

  const checkbox = screen.getByRole("checkbox");
  await userEvent.click(checkbox);

  await waitFor(() => {
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });
});
