import BoardDetail from "@/components/BoardDeteail";

export default async function BoardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BoardDetail id={id} />;
}
