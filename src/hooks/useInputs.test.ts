import { act, renderHook } from "@testing-library/react";
import { useInputs } from "./useInputs";

describe("useInputs 테스트", () => {
  test("초기값을 인자로 넣으면 올바르게 설정되는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        email: "",
        password: "",
      }),
    );

    expect(result.current.values).toEqual({
      email: "",
      password: "",
    });
  });

  test("handleChange 함수가 값을 올바르게 변경하는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        email: "",
        password: "",
      }),
    );

    const event = {
      target: { name: "email", value: "test@example.com" },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values).toEqual({
      email: "test@example.com",
      password: "",
    });
  });

  test("여러 필드를 한 번에 변경했을 때 잘 적용되는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({
        email: "",
        password: "",
      }),
    );

    const emailEvent = {
      target: { name: "email", value: "test@example.com" },
    } as React.ChangeEvent<HTMLInputElement>;

    const passwordEvent = {
      target: { name: "password", value: "password123" },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(emailEvent);
      result.current.handleChange(passwordEvent);
    });

    expect(result.current.values).toEqual({
      email: "test@example.com",
      password: "password123",
    });
  });

  test("handleDelete 함수가 특정 필드를 올바르게 삭제하는지 확인", () => {
    const { result } = renderHook(() =>
      useInputs({ email: "test@example.com", password: "password123" }),
    );

    act(() => {
      result.current.handleDelete("email");
    });

    expect(result.current.values.email).toBe("");
    expect(result.current.values.password).toBe("password123");
  });
});
