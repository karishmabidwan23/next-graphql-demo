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

    return <div>
        <h1>Repository Detail Page</h1>
        <div>Reponame: {name}</div>
        <div>Owner: {owner}</div>
        <div>Description: {data?.repository?.description}</div>
        <div>Projects url: {data?.repository?.projectsUrl}</div>
        <div>Fork count: {data?.repository?.forkCount}</div>
        <div>Pushed At: {data?.repository?.pushedAt}</div>
    </div>
}

export default RepositoryDetailPage;