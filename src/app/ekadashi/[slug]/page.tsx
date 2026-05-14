import EkadashiDetails from "../../../features/EkadashiDetails"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <EkadashiDetails slug={slug} />
}