export default function HomePage () {
  return (
    <main className='w-full h-full p-3 flex-col gap-3'>
      <div className='flex justify-between items-center'>
        <p>Welcome!</p>
      </div>
      <div className='w-full h-full flex flex-col justify-center items-center gap-3'>
        <h1 className='text-5xl'>This is a template with NextJs</h1>
        <br />
        <p>Contains:</p>
        <ul className='text-center'>
          <li>Vercel Postgres [✅]</li>
          <li>Drizzle ORM [✅]</li>
          <li>ShadCn UI [✅]</li>
          <li>AuthJS [✅]</li>
        </ul>
      </div>
    </main>
  )
}
