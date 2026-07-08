export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

  return <div>포스트 상세 페이지 {id} </div>;
}
