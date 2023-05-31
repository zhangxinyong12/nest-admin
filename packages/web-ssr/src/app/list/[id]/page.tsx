type Params={
  id:string
}

export default function ListItem({params}:{params:Params}){
  return <div>
    <h1>list item id={params.id}</h1>
  </div>
}