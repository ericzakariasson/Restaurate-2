import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import { Loading, Page } from 'components';
import { GeneralError } from 'scenes';

interface QueryPageProps<TData> {
  query: ApolloReactCommon.QueryResult<any, any>;
  children: (data: TData) => React.ReactNode;
  title: (data: TData) => string;
  subTitle?: string;
}

export function QueryPage<TData>({
  children,
  query: { loading, error, data },
  title,
  subTitle
}: QueryPageProps<TData>) {
  if (loading) {
    return <Loading fullscreen />;
  }

  if (error) {
    return <GeneralError error={error} />;
  }
  const [queryData] = Object.values(data);
  if (data && queryData) {
    return (
      <Page title={title(queryData as TData)} subTitle={subTitle}>
        {children(queryData as TData)}
      </Page>
    );
  }

  return null;
}
