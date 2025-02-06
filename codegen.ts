import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: '**/**/schema.graphql',
  documents: ['app/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './app/graphql/types.ts': {
       plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
       ],
       config: {
          withHooks: true,
          withHOC: false,  
          withComponent: false, 
       }
    },
  }
}
 
export default config