export default async function page({params}: {params: {slug: string}}) {

  const { slug } = params


  return (
    <div>{slug}</div>
  )
}