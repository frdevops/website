/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import TagsListByLetter from '@theme/TagsListByLetter';
import type {Props} from '@theme/BlogTagsListPage';
import SearchMetadata from '../SearchMetadata';
import styles from './styles.module.css';

export default function BlogTagsListPage({tags, sidebar}: Props): JSX.Element {
  const title = translateTagsPageTitle();
  const tagLabelList = tags.map((tags: any) => 
    <a className={clsx(styles.button, "button button--outline button--primary")} href={tags.permalink}>
      {tags.label}
    </a>
  );
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout>
        <h1>标签</h1>
        {tagLabelList}
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
