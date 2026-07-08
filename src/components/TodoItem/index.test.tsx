import { render, screen } from "@testing-library/react";
import TodoItem from ".";

test("할 일 목록 상태 테스트", () => {
  render(<TodoItem task="리액트 공부하기" completed={true} />);

  // 1. 텍스트 내용을 확인하기
  const taskText = screen.getByText("리액트 공부하기");
  // <span>리액트 공부하기</span>
  expect(taskText).toHaveTextContent("리액트 공부하기");

  // 2. 체크박스가 체크되어있는지 확인
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).toBeChecked();

  expect(checkBox).toBeDisabled();

  // 수정 버튼이 비활성화되어 있는지 확인
  const editButton = screen.getByRole("button", { name: "수정" });
  expect(editButton).toBeDisabled();

  // 항목에 'completed' 클래스가 있는지 확인
  const listItem = screen.getByRole("listitem");
  expect(listItem).toHaveClass("completed");
});
