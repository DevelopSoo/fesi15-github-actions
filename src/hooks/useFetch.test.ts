import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch", () => {
  test("데이터를 성공적으로 가져오는지 테스트", async () => {
    const mockData = { name: "test" };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data"),
    );

    // 시간이 조금 지나면
    // act -> state 업데이트를 바로 적용하기 위해
    // findBy -> 요소를 기다린다.

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  test("에러 처리가 정상적으로 작동하는지 테스트", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data"),
    );

    await waitFor(() => {
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBe("네트워크 응답이 정상적이지 않습니다");
      expect(result.current.loading).toBe(false);
    });
  });

  test("네트워크 에러 시 error 상태가 업데이트 되는지 확인", async () => {
    // fetch가 실패하는 경우를 모킹
    // 예를 들어, 네트워크 에러가 발생한 경우
    global.fetch = jest.fn().mockRejectedValue(new Error("네트워크 에러"));

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data"),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("네트워크 에러");
  });
});
