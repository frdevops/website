/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import Link from '@docusaurus/Link';

import styles from './index.module.css';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import Typist from 'react-typist';

function BlogListPageMetadata(props: Props): JSX.Element {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): JSX.Element {
  const {metadata, items, sidebar} = props;
  const local_url = useLocation().pathname;
  if ( local_url == "/"){
    return (
      <BlogLayout>
        {items.map(({content: BlogPostContent}) => (
          <BlogPostItem
            key={BlogPostContent.metadata.permalink}
            frontMatter={BlogPostContent.frontMatter}
            assets={BlogPostContent.assets}
            metadata={BlogPostContent.metadata}
            truncated={BlogPostContent.metadata.truncated}>
            <BlogPostContent />
          </BlogPostItem>
        ))}
        <BlogListPaginator metadata={metadata} />
      </BlogLayout>
    );
  }
  // return (
  //   <BlogLayout sidebar={sidebar}>
  //     {items.map(({content: BlogPostContent}) => (
  //       <BlogPostItem
  //         key={BlogPostContent.metadata.permalink}
  //         frontMatter={BlogPostContent.frontMatter}
  //         assets={BlogPostContent.assets}
  //         metadata={BlogPostContent.metadata}
  //         truncated={BlogPostContent.metadata.truncated}>
  //         <BlogPostContent />
  //       </BlogPostItem>
  //     ))}
  //     <BlogListPaginator metadata={metadata} />
  //   </BlogLayout>
  // );
}

export default function BlogListPage(props: Props): JSX.Element {
  const local_url = useLocation().pathname;
  if ( local_url == "/"){
  return (
    <Layout>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Typist avgTypingDelay={200}>
            <h1 className="hero__title">
              <span>DevOps 故居</span>
            </h1>
            <span className="hero__subtitle">
              专注于云原生领域,分享技术干货
            </span>
          </Typist>
        </div>
      </header>
      <BlogListPageContent {...props} />
    </Layout>
  );
  }
  // return (
  //   <HtmlClassNameProvider
  //     className={clsx(
  //       ThemeClassNames.wrapper.blogPages,
  //       ThemeClassNames.page.blogListPage,
  //     )}>
  //     <BlogListPageMetadata {...props} />
  //     <BlogListPageContent {...props} />
  //   </HtmlClassNameProvider>
  // );
}
