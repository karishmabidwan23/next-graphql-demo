import { Routes } from "@/app/config/Routes";
import {
  GetRepositoryListDocument,
  GetRepositoryListQuery,
  GetRepositoryListQueryResult,
  GetRepositoryListQueryVariables,
} from "@/app/graphql/types";
import { fetchQuery } from "@/app/server-utils/fetchQuery";

interface ReposiotryListPageProps {
  params: Promise<{ owner: string }>;
}

const RepositoryListPage = async ({ params }: ReposiotryListPageProps) => {
  const { owner } = await params;

  const { data, error } = await fetchQuery<
    GetRepositoryListQuery,
    GetRepositoryListQueryVariables
  >({
    query: GetRepositoryListDocument,
    variables: {
      login: owner,
      limit: 10,
    },
  });

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <div>
        {data?.repositoryOwner?.repositories?.nodes?.map(
          (repo) =>
            repo && (
              <div key={repo.id}>
                <a href={Routes.getRepoDetailRoute(owner, repo.name)}>
                  {repo.name}
                </a>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default RepositoryListPage;
