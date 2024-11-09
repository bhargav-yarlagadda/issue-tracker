
const page = ({params}:any) => {
    const {issueId} = params 
  return (
    <div>{issueId}</div>
  )
}

export default page