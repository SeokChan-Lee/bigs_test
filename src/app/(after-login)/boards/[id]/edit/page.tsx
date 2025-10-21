import EditBoardForm from "@/components/EditBoardForm";

export default async function EditBoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditBoardForm id={id} />;
}
