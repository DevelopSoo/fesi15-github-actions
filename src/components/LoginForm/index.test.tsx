import { fireEvent, render, screen } from "@testing-library/react";
import { LoginForm } from ".";

describe("LoginForm 컴포넌트 테스트", () => {
  let loginButton: HTMLElement;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  beforeEach(() => {
    render(<LoginForm />);
    loginButton = screen.getByRole("button", { name: "로그인" });
    emailInput = screen.getByPlaceholderText("이메일을 입력하세요");
    passwordInput = screen.getByPlaceholderText("비밀번호를 입력하세요");
  });

  describe("로그인 버튼 활성화 테스트", () => {
    test("로그인 폼의 이메일과 비밀번호 미입력 시 로그인 버튼 비활성화되는지 확인", () => {
      // 로그인 버튼과 입력 필드 가져오기

      // 로그인 버튼이 비활성화되어 있는지 확인
      expect(loginButton).toBeDisabled();
    });

    test("이메일, 비밀번호 입력 시 로그인 버튼 활성화되는지 확인", () => {
      // 이벤트 객체 모양
      fireEvent.change(emailInput, { target: { value: "test" } });
      fireEvent.change(passwordInput, { target: { value: "test" } });

      expect(loginButton).toBeEnabled();
    });
  });

  describe("유효성 검사 테스트", () => {
    test("이메일을 잘못 입력하면 '올바른 이메일 형식이 아닙니다.'라는 에러 메세지가 표시되는지 확인", () => {
      fireEvent.change(emailInput, { target: { value: "test" } });

      const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();
    });

    test("비밀번호 6자 미만 입력 시 '비밀번호는 6자 이상이어야 합니다.'라는 에러 메시지가 표시되는지 확인", () => {
      // 잘못된 비밀번호 입력
      fireEvent.change(passwordInput, { target: { value: "12345" } });

      // 에러 메시지 확인
      const errorMessage = screen.getByText(
        "비밀번호는 6자 이상이어야 합니다.",
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test("제대로 된 이메일 입력 시 에러 메시지가 사라지는지 확인", () => {
      // 1. 에러 메세지 나타나게
      fireEvent.change(emailInput, { target: { value: "test" } });

      const errorMessage = screen.getByText("올바른 이메일 형식이 아닙니다.");
      expect(errorMessage).toBeInTheDocument();

      // 2. 이메일을 제대로 수정
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe("로그인 요청 테스트", () => {
    test("로그인 요청 성공 시 모달창이 나타나는지 확인", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ message: "로그인 성공" }),
      });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "123123123" } });

      // 로그인 버튼 클릭
      fireEvent.click(loginButton);

      // 모달창이 나타나는지 확인
      // state 변경 중 -> 잠시 기다렸다가 확인하자.
      // getBy vs queryBy vs findBy
      // getBy: 요소 찾기 -> 없으면 에러남
      // queryBy: 요소 찾기 -> 없어도 에러 안남
      // findBy: 요소 찾기 -> 찾을 때까지 기다림 (1초 기다렸다가 없으면 에러)
      // 왜??
      // API 호출 + setState 변경을 기다리기 위해
      const modal = await screen.findByText("로그인 성공");
      expect(modal).toBeInTheDocument();
    });
  });
});
