"use client";
import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useCallback } from "react";
import { DynamicFormComponent } from "./DynamicForm";

export type DynamicFormType<TVariable> = {
  query: DocumentNode;
  onSuccess: (data: TVariable) => void;
  onError: (err: string) => void;
};

/**
 * This component extends DynamicForm and can call given mutation on submition and return success or error
 */
export const DynamicFormWithMutation = <TVariable,>({
  query,
  onSuccess,
  onError,
}: DynamicFormType<TVariable>) => {
  const [onMutate, { data, error }] = useMutation(query);

  useEffect(() => {
    if (data) onSuccess(data);
  }, [data]);

  useEffect(() => {
    if (error) onError(error.message);
  }, [error]);

  const onSubmit = useCallback(
    (data: TVariable) => {
      onMutate({
        variables: data,
      });
    },
    [onMutate]
  );

  return <DynamicFormComponent<TVariable> query={query} onSubmit={onSubmit} />;
};
