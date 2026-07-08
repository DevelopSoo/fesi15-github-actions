import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const renderWithQueryClient = (component: React.ReactElement) => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트에서 재시도 비활성화
        gcTime: Infinity, // Jest 환경에서 카비지 컬렉션을 위한 타이머 생성 방지
      },
    },
  });

  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>,
  );
};

describe("메인 페이지 테스트", () => {
  describe("데이터 렌더링 테스트", () => {
    test("로딩 상태가 올바르게 표시되는지 확인", () => {
      renderWithQueryClient(<Home />);

      const loadingElement = screen.getByText("Loading...");
      expect(loadingElement).toBeInTheDocument();
    });

    test("데이터가 올바르게 표시되는지 확인", async () => {
      const mockedPosts = [
        { id: 1, title: "테스트 제목", body: "테스트 본문" },
        { id: 2, title: "두번째 제목", body: "두번째 본문" },
      ];

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockedPosts),
      });

      renderWithQueryClient(<Home />);

      await waitFor(() => {
        // 1. li 요소가 2개 있는지 확인
        const postItems = screen.getAllByRole("listitem");
        expect(postItems).toHaveLength(mockedPosts.length);

        // 2. 1: 테스트 제목, 2: 두번째 제목 이 잘 나오는지 확인
        const firstPostTitle = screen.getByText("1: 테스트 제목");
        const secondPostTitle = screen.getByText("2: 두번째 제목");
        expect(firstPostTitle).toBeInTheDocument();
        expect(secondPostTitle).toBeInTheDocument();
      });
    });

    test("API 호출 실패 시 에러 상태가 올바르게 표시되는지 확인", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      });

      renderWithQueryClient(<Home />);

      // await waitFor(() => {
      const errorElement = await screen.findByText(
        "서버에서 데이터를 가져오는 데 실패했습니다.",
      );
      expect(errorElement).toBeInTheDocument();
      // });
    });
  });

  describe("mutation 테스트", () => {
    test("새로운 게시물이 성공적으로 생성되어 UI에 표시되는지 확인", async () => {
      const mockedPosts = [
        { id: 1, title: "테스트 제목", body: "테스트 본문" },
        { id: 2, title: "두번째 제목", body: "두번째 본문" },
      ];

      const newPost = {
        id: 3,
        title: "새로운 제목",
        body: "새로운 본문",
      };

      // 1. 조회 API 모킹
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockedPosts),
      });

      renderWithQueryClient(<Home />);

      await waitFor(() => {
        const postItems = screen.getAllByRole("listitem");
        expect(postItems).toHaveLength(mockedPosts.length);

        const firstPostTitle = screen.getByText("1: 테스트 제목");
        const secondPostTitle = screen.getByText("2: 두번째 제목");
        expect(firstPostTitle).toBeInTheDocument();
        expect(secondPostTitle).toBeInTheDocument();
      });

      global.fetch = jest
        .fn() // 2. 생성 API 모킹
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(newPost),
        })
        // 3. 조회 API 다시 모킹
        .mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue([...mockedPosts, newPost]),
        });

      // 폼 입력 + 제출
      const titleInput = screen.getByLabelText("제목");
      const bodyInput = screen.getByLabelText("본문");
      const submitButton = screen.getByRole("button", { name: "제출" });

      fireEvent.change(titleInput, { target: { value: "새로운 제목" } });
      fireEvent.change(bodyInput, { target: { value: "새로운 본문" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const postItems = screen.getAllByRole("listitem");
        expect(postItems).toHaveLength(mockedPosts.length + 1);

        const newPostTitle = screen.getByText("3: 새로운 제목");
        const newPostBody = screen.getByText("새로운 본문");
        expect(newPostTitle).toBeInTheDocument();
        expect(newPostBody).toBeInTheDocument();
      });
    });
  });
});
