export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>posts 경로에서만 사용하는 레이아웃</header>
      {children}
    </div>
  );
}
