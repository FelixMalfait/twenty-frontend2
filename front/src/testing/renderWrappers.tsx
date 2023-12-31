import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { RecoilRoot } from 'recoil';

import { DefaultLayout } from '@/ui/layout/DefaultLayout';
import { UserProvider } from '~/providers/user/UserProvider';

import { ComponentStorybookLayout } from './ComponentStorybookLayout';
import { FullHeightStorybookLayout } from './FullHeightStorybookLayout';
import { mockedClient } from './mockedClient';

export function getRenderWrapperForPage(
  children: React.ReactElement,
  currentPath: string,
) {
  return function render() {
    return (
      <RecoilRoot>
        <ApolloProvider client={mockedClient}>
          <UserProvider>
            <MemoryRouter initialEntries={[currentPath]}>
              <FullHeightStorybookLayout>
                <DefaultLayout>{children}</DefaultLayout>
              </FullHeightStorybookLayout>
            </MemoryRouter>
          </UserProvider>
        </ApolloProvider>
      </RecoilRoot>
    );
  };
}

export function getRenderWrapperForComponent(children: React.ReactElement) {
  return function render() {
    return (
      <RecoilRoot>
        <ApolloProvider client={mockedClient}>
          <ComponentStorybookLayout>{children}</ComponentStorybookLayout>
        </ApolloProvider>
      </RecoilRoot>
    );
  };
}
