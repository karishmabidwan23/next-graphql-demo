"use client";

import { DynamicFormComponent } from "../components/DynamicForm/DynamicForm";
import {
  GetRepositoryListDocument,
  GetRepositoryListQueryVariables,
} from "../graphql/types";
import Router from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Routes } from "../config/Routes";

const RepoPage = () => {
    const router = useRouter()
  const onSubmit = (values: GetRepositoryListQueryVariables) => {
    router.push(Routes.getRepoListRoute(values.login))
  }

  return (
    <div>
      <DynamicFormComponent<GetRepositoryListQueryVariables>
        query={GetRepositoryListDocument}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default RepoPage;
