// e2e/purchase.test.ts

import { test, expect } from "@playwright/test";

test("로그인 후 구매까지의 시나리오", async ({ page }) => {
  // 1. 로그인 페이지에 접속한다.
  await page.goto("/auth/login");
  // 2. 이메일 입력창에 abc@test.com을 입력한다.
  await page.getByRole("textbox", { name: "이메일" }).fill("abc@test.com");
  // 3. 비밀번호 입력창에 123123을 입력한다.
  await page.getByRole("textbox", { name: "비밀번호" }).fill("123123");
  // 4. 로그인 버튼을 클릭한다. 자동으로 상품 목록 페이지로 이동한다.
  await page.getByRole("button", { name: "로그인" }).click();
  // 5. 상품 페이지에 접속했는지 확인한다.
  await expect(page).toHaveURL("/products");

  // 6. 상품이 올바르게 렌더링되는지 확인
  const firstProduct = page.locator("[data-testid^='product-']").first();
  await expect(firstProduct).toBeVisible();

  // 7. 상품의 id를 추출한다.
  const productId = await firstProduct.getAttribute("data-product-id");
  await firstProduct.click();

  await expect(page).toHaveURL(`/products/${productId}`);

  // 수량 증가 버튼 2회 클릭
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();

  // 구매 버튼 클릭
  await page.getByRole("button", { name: "구매" }).click();

  // 페이지 이동 확인
  await expect(page).toHaveURL("/purchase/complete");
  await expect(page.getByText("구매가 완료되었습니다.")).toBeVisible();
});
