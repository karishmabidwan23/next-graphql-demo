

export const Routes = {
    getRepoRoute: () => `/repo`,
    getRepoListRoute: (owner: string,limit: number) => `/repo/${owner}?limit=${limit}`,
    getRepoDetailRoute: (owner: string, reponame: string) => `/repo/${owner}/${reponame}`
}