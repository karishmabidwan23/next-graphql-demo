import { GetRepositoryDetailDocument, GetRepositoryDetailQuery, GetRepositoryDetailQueryVariables } from "@/app/graphql/types";
import { fetchQuery } from "@/app/server-utils/fetchQuery";



interface ReposiotryDetailPageProps {
    params: Promise<{ owner: string, name: string }>;
  }
  

const RepositoryDetailPage = async ({params}: ReposiotryDetailPageProps) => {
    const {owner, name} = await params;

    const {data, error} = await fetchQuery<GetRepositoryDetailQuery, GetRepositoryDetailQueryVariables>({
        query: GetRepositoryDetailDocument,
        variables: {
            name,
            owner
        }
    });


    if(error) return <div>{error.message}</div>

    return  <div className={"page"}>
    <div className={"main align-left"}>
        <h1 className="mb-4">Repository Detail Page : {name}</h1>
        <div>Reponame: {name}</div>
        <div>Owner: {owner}</div>
        <div>Description: {data?.repository?.description}</div>
        <div>Projects url: <a href={data?.repository?.projectsUrl}>{data?.repository?.projectsUrl}</a></div>
        <div>Fork count: {data?.repository?.forkCount}</div>
        <div>Pushed At: {data?.repository?.pushedAt}</div>
    </div>
    </div>
}

export default RepositoryDetailPage;