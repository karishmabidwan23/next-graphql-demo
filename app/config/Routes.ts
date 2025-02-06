

export const Routes = {
    getRepoListRoute: (owner: string) => `/repo/${owner}`,
    getRepoDetailRoute: (owner: string, reponame: string) => `/repo/${owner}/${reponame}`
}