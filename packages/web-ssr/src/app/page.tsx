import Link from "next/link"

function Home() {
  return (
    <div>
      <button  className="btn btn-primary">列表项3</button>
      <h2>next 666</h2>
      <button className="btn btn-link">
        <Link href="/dashboard">Dashboard</Link>
      </button>
    </div>
  )
}

export default Home
