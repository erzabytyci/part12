import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Todo from "./Todo"

test("renders todo text and not done info", () => {
    const todo = { _id: "1", text: "Learn Docker", done: false }
    render(<Todo todo={todo} onDelete={() => { }} onComplete={() => { }} />)

    expect(screen.getByText("Learn Docker")).toBeInTheDocument()
    expect(screen.getByText("This todo is not done")).toBeInTheDocument()
})

test("clicking delete calls handler with todo", async () => {
    const user = userEvent.setup()
    const todo = { _id: "1", text: "Learn Docker", done: false }
    const onDelete = vi.fn()

    render(<Todo todo={todo} onDelete={onDelete} onComplete={() => { }} />)

    await user.click(screen.getByRole("button", { name: /delete/i }))
    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(todo)
})

test("clicking set as done calls handler with todo", async () => {
    const user = userEvent.setup()
    const todo = { _id: "1", text: "Learn Docker", done: false }
    const onComplete = vi.fn()

    render(<Todo todo={todo} onDelete={() => { }} onComplete={onComplete} />)

    await user.click(screen.getByRole("button", { name: /set as done/i }))
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(onComplete).toHaveBeenCalledWith(todo)
})
