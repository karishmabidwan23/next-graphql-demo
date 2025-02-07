import { Routes } from "@/app/config/Routes";
import {
  GetRepositoryListDocument,
  GetRepositoryListQuery,
  GetRepositoryListQueryVariables,
} from "@/app/graphql/types";
import { fetchQuery } from "@/app/server-utils/fetchQuery";

interface ReposiotryListPageProps {
  params: Promise<{ owner: string }>;
  searchParams: Promise<{limit: number}>
}

const RepositoryListPage = async ({ params, searchParams }: ReposiotryListPageProps) => {
  const { owner } = await params;
  const {limit=10} = await searchParams;

  const { data, error } = await fetchQuery<
    GetRepositoryListQuery,
    GetRepositoryListQueryVariables
  >({
    query: GetRepositoryListDocument,
    variables: {
      login: owner,
      limit: Number(limit),
    },
  });

  if (error) return <div>{error.message}</div>;

  return (
    <div className="page">
      <div className="main align-left">
        <h3 className="mb-4">Bellow our the list of repositories which is rendered using SSR.<br />Click on any link bellow to redirect to detail page.</h3>
        {data?.repositoryOwner?.repositories?.nodes?.map(
          (repo, index) =>
            repo && (
              <div key={repo.id} className={"mb-2"}>
                <a href={Routes.getRepoDetailRoute(owner, repo.name)}>
                  {index+1}: {repo.name}
                </a>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default RepositoryListPage;
