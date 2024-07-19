import { useQuery } from "@apollo/client";
import { LIST_REPO } from "./apollo/github";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { addInAddressBar, selectName } from "./features/storageSlice";
import MyModal from "./Component/Modal";
// import { DateTime } from "luxon"


const App = () => {
  const dispatch = useAppDispatch()
  const nickname = useAppSelector(selectName)
  const [user, setUser] = useState(nickname);
  const [showModal, setShowModal] = useState(false);




  const {
    data,
    loading,
    error,
    fetchMore
  } = useQuery(LIST_REPO, {
    variables: {
      login: nickname||"neson55",
      first:10,
      after:null,
    },
    nextFetchPolicy: "cache-and-network",
  },
  );

  // console.log(data.github.repositories.edges[0].node.defaultBranchRef.target.history.edges[0].node.committedDate)
  const handleSearch = () => {
    dispatch(addInAddressBar(user))
    setUser('');
  };

  const handleKey = (event: any) => {
    if (event.key === "Enter") {
    handleSearch()};
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (data.github === null) {
    return (<div className="bg-slate-600 flex justify-center h-screen items-center">
    <div className="bg-slate-300 m-4">
      <div className="flex justify-center my-4">
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          onKeyPress={handleKey}
        />
        <button onClick={handleSearch} className="bg-slate-400">Search</button>
      </div>
      This user does not exist.
    </div>
  </div>)
  }
  return (
    <div className="bg-slate-600 flex justify-center min-h-screen items-center">
      <div className="bg-slate-300 m-4">
        <div className="flex justify-center my-4 gap-3">
          <div className="">
            Введите имя пользовотеля:
          </div>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyPress={handleKey}
            className="mr-3 px-3"
          />
          <button onClick={handleSearch} className="bg-slate-400 ">Search</button>
        </div>
        <table className="relative overflow-x-auto">
          <thead>
            <tr className="text-left border">
              {/* Add table headers here */}
              <th className="px-6 py-3 border">Название репозитория</th>
              <th className="px-6 py-3 border">Кол-во звёзд на github</th>
              <th className="px-6 py-3 border">Дата последнего коммита</th>
              <th className="px-6 py-3 border">Ссылка на Github</th>
            </tr>
          </thead>
          <tbody>
            {data.github.repositories.edges.map((repo: any) => (
              <tr key={repo.node.id}>
                {/* Add table cells here */}
                <td className="px-6 py-3 border">{repo.node.name}</td>
                <td className="px-6 py-3 border">{repo.node.stargazers.totalCount}</td>
                <td className="px-6 py-3 border">{repo.node.defaultBranchRef.target.history.edges[0].node.committedDate}</td>
                <td className="px-6 py-3 border"><a href={repo.node.url} className="text-blue-500" target="_blank" >{repo.node.url} </a></td>
                {/* <td className="px-6 py-3 border"><MyModal onClose={() => setShowModal(false)} visible={showModal} >
        <div className="flex-auto">
        <div className="flex justify-center">{data.github.repositories.edges.map((repo: any) => repo.node.name)}  {data.github.repositories.edges.map((repo: any) => repo.node.stargazers.totalCount)}<img className="w-6 h-6 " src='https://www.clipartmax.com/png/full/73-730227_gold-star-star-clipart.png'/> 
        {data.github.repositories.edges.map((repo: any) => repo.node.defaultBranchRef.target.history.edges[0].node.committedDate)}
        </div>
        <div>
          <img  className="mt-5 w-20 h-20 rounded-full"src={data.github.avatarUrl}/>{data.github.login}<a href={data.github.url} className="text-blue-500 flex" target="_blank">{data.github.url}</a>
        </div>
        <div> Используемые языки:
          {data.github.repositories.edges.map((repo:any)=>repo.node.languages.nodes.map((l: any) => <div>-{l.name}</div>))}
        </div>
        </div>
        </MyModal>
      
      <button className="bg-blue-500 p-2 rounded text-white" onClick={() => setShowModal(true)}>Open</button></td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <button  className='bg-slate-400 m-2 px-5'onClick={() =>{
          const {endCursor} = data.github.repositories.pageInfo
          fetchMore({
            variables: {
              login: nickname||"neson55",
              first:10,
              after:endCursor,
            },
            updateQuery:(previousResult, {fetchMoreResult}) => {
              fetchMoreResult.github.repositories.edges = [
                ...previousResult.github.repositories.edges,
                ...fetchMoreResult.github.repositories.edges
              ];
              return fetchMoreResult;
            }
          })
        }}>
          More
        </button>
        
      </div>
      <MyModal onClose={() => setShowModal(false)} visible={showModal} >
        <div className="flex-auto">
        <div className="flex justify-center">{data.github.repositories.edges[0].node.name}  {data.github.repositories.edges[0].node.stargazers.totalCount}<img className="w-4 h-4 " src='https://www.clipartmax.com/png/full/73-730227_gold-star-star-clipart.png'/> 
        {data.github.repositories.edges[0].node.defaultBranchRef.target.history.edges[0].node.committedDate}
        </div>
        <div>
          <img  className="mt-5 w-20 h-20 rounded-full"src={data.github.avatarUrl}/>{data.github.login}<a href={data.github.url} className="text-blue-500 flex" target="_blank">{data.github.url}</a>
        </div>
        <div> Используемые языки:
          {data.github.repositories.edges[0].node.languages.nodes.map((l: any) => <div>-{l.name}</div>)}
        </div>
        </div>
        </MyModal>
      
      <button className="bg-blue-500 p-2 rounded text-white" onClick={() => setShowModal(true)}>Open</button>
    </div>
  );
};

export default App;