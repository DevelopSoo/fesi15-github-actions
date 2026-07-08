import { fireEvent, render, screen } from "@testing-library/react";
import { LikeButton } from ".";

test("좋아요 버튼을 누르기 전에는 '좋아요'가 표시되어야 하며, bg-gray-400 색상을 가져야 한다.", () => {
  render(<LikeButton />);

  const likeButton = screen.getByRole("button", { name: "좋아요" });
  expect(likeButton).toBeInTheDocument();
  expect(likeButton).toHaveClass("bg-gray-400");
});

test("'좋아요' 버튼을 클릭하면 '좋아요 취소'로 텍스트가 변경되어야 하며, bg-red-400 클래스가 적용되어야 한다.", () => {
  render(<LikeButton />);

  const likeButton = screen.getByRole("button", { name: "좋아요" });

  fireEvent.click(likeButton);

  const cancelButton = screen.getByRole("button", { name: "좋아요 취소" });

  expect(cancelButton).toBeInTheDocument();
  expect(cancelButton).toHaveClass("bg-red-400");
});

test("'좋아요' 버튼을 한 번 클릭 후 다시 클릭하면 '좋아요' 버튼으로 되돌아와야 한다.", () => {
  render(<LikeButton />);

  const likeButton = screen.getByRole("button", { name: "좋아요" });
  fireEvent.click(likeButton);

  expect(likeButton).toHaveTextContent("좋아요 취소");

  fireEvent.click(likeButton);
  expect(likeButton).toHaveTextContent("좋아요");
});
