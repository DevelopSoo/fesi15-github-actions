import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";

test("Input 컴포넌트 미입력 시 x 버튼이 보이지 않는지 확인", () => {
  render(<Input onChange={jest.fn()} onDelete={jest.fn()} />);

  // 1. Input 을 가져온다. -> Input에 아무것도 입력되지 않았는지 확인하기 위해
  // 2. X 버튼을 가져온다 -> 화면에 안보이는지 확인

  const input = screen.getByRole("textbox");
  const deleteButton = screen.queryByRole("button", { name: "입력값 지우기" });
  // query~: 없어도 에러가 안나는 놈

  expect(input).toHaveValue("");
  expect(deleteButton).not.toBeInTheDocument();
});

test("Input 컴포넌트 입력값이 있을 때 X 버튼이 나오는지 확인", () => {
  render(<Input value="입력값" onChange={jest.fn()} onDelete={jest.fn()} />);

  const input = screen.getByRole("textbox");
  const deleteButton = screen.queryByRole("button", { name: "입력값 지우기" });

  expect(input).toHaveValue("입력값");
  expect(deleteButton).toBeInTheDocument();
});

test("X 버튼 클릭 시 onDelete props에 전달된 함수가 호출되는지 확인", () => {
  const onDelete = jest.fn();
  render(<Input value="입력값" onChange={jest.fn()} onDelete={onDelete} />);

  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  fireEvent.click(deleteButton);

  // onDelete props에 전달된 함수가 호출됐니?

  expect(onDelete).toHaveBeenCalled();
});

test("Input 컴포넌트 에러 발생 시 에러 메세지가 보이는지 확인", () => {
  render(
    <Input
      isError={true}
      errorMessage="입력값에 문제가 있습니다"
      onChange={jest.fn()}
      onDelete={jest.fn()}
    />,
  );
  const errorMessage = screen.getByText("입력값에 문제가 있습니다");

  expect(errorMessage).toBeInTheDocument();
});
