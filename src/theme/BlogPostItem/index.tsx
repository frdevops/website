/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {usePluralForm} from '@docusaurus/theme-common';
import {blogPostContainerID} from '@docusaurus/utils-common';
import MDXContent from '@theme/MDXContent';
import EditThisPage from '@theme/EditThisPage';
import TagsListInline from '@theme/TagsListInline';
import BlogPostAuthors from '@theme/BlogPostAuthors';
import type {Props} from '@theme/BlogPostItem';

import styles from './styles.module.css';
import { useLocation } from '@docusaurus/router';

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {readingTime},
      ),
    );
  };
}

export default function BlogPostItem(props: Props): JSX.Element {
  const readingTimePlural = useReadingTimePlural();
  const {withBaseUrl} = useBaseUrlUtils();
  const {
    children,
    frontMatter,
    assets,
    metadata,
    truncated,
    isBlogPostPage = false,
  } = props;
  const {
    date,
    formattedDate,
    permalink,
    tags,
    readingTime,
    title,
    editUrl,
    authors,
  } = metadata;

  const image = assets.image ?? frontMatter.image;
  const truncatedPost = !isBlogPostPage && truncated;
  const tagsExists = tags.length > 0;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';

  const local_url = useLocation().pathname;
  if ( local_url == "/"){
    return (
      <article
        className={!isBlogPostPage ? 'margin-bottom--xl' : undefined}
        itemProp="blogPost"
        itemScope
        itemType="http://schema.org/BlogPosting">
        <div className={clsx(styles.card, "card")}>
          <div className="row">
            <div className="col">
              <TitleHeading className={styles.blogPostTitle} itemProp="headline">
              {isBlogPostPage ? (
                title
              ) : (
                <Link itemProp="url" to={permalink}>
                  {title}
                </Link>
              )}
              </TitleHeading>
              <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
                <time dateTime={date} itemProp="datePublished">
                  {formattedDate}
                </time>
                
                {typeof readingTime !== 'undefined' && (
                  <>
                    {' · '}
                    {readingTimePlural(readingTime)}
                  </>
                )}
              </div>
              <BlogPostAuthors authors={authors} assets={assets} />
            </div>
          </div>
          <div className="row">
            <div className={clsx(styles.colContent, "col col--10")}>
              <div
                // This ID is used for the feed generation to locate the main content
                id={isBlogPostPage ? blogPostContainerID : undefined}
                className="markdown"
                itemProp="articleBody">
                <MDXContent>{children}</MDXContent>
              </div>
            </div>
            <div className={clsx(styles.colButton, "col col--1")}>
              <a className={clsx(styles.bFont, "button button--outline button--primary")} href={metadata.permalink}>
                <Link
                  // to={metadata.permalink}
                  aria-label={translate(
                    {
                      message: 'Read more about {title}',
                      id: 'theme.blog.post.readMoreLabel',
                      description:
                        'The ARIA label for the link to full blog posts from excerpts',
                    },
                    {title},
                  )}>
                  <b>
                    <Translate
                      id="theme.blog.post.readMore"
                      description="The label used in blog post item excerpts to link to full blog posts">
                      阅读全文
                    </Translate>
                  </b>
                </Link>
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }
  return (
    <article
      className={!isBlogPostPage ? 'margin-bottom--xl' : undefined}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting">
      <header>
        <TitleHeading className={styles.blogPostTitle} itemProp="headline">
          {isBlogPostPage ? (
            title
          ) : (
            <Link itemProp="url" to={permalink}>
              {title}
            </Link>
          )}
        </TitleHeading>
        <div className={clsx(styles.blogPostData, 'margin-vert--md')}>
          <time dateTime={date} itemProp="datePublished">
            {formattedDate}
          </time>

          {typeof readingTime !== 'undefined' && (
            <>
              {' · '}
              {readingTimePlural(readingTime)}
            </>
          )}
        </div>
        <BlogPostAuthors authors={authors} assets={assets} />
      </header>

      {image && (
        <meta itemProp="image" content={withBaseUrl(image, {absolute: true})} />
      )}

      <div
        // This ID is used for the feed generation to locate the main content
        id={isBlogPostPage ? blogPostContainerID : undefined}
        className="markdown"
        itemProp="articleBody">
        <MDXContent>{children}</MDXContent>
      </div>

      {(tagsExists || truncated) && (
        <footer
          className={clsx(
            'row docusaurus-mt-lg',
            isBlogPostPage && styles.blogPostDetailsFull,
          )}>
          {tagsExists && (
            <div className={clsx('col', {'col--9': truncatedPost})}>
              <TagsListInline tags={tags} />
            </div>
          )}

          {isBlogPostPage && editUrl && (
            <div className="col margin-top--sm">
              <EditThisPage editUrl={editUrl} />
            </div>
          )}

          {truncatedPost && (
            <div
              className={clsx('col text--right', {
                'col--3': tagsExists,
              })}>
              <Link
                to={metadata.permalink}
                aria-label={translate(
                  {
                    message: 'Read more about {title}',
                    id: 'theme.blog.post.readMoreLabel',
                    description:
                      'The ARIA label for the link to full blog posts from excerpts',
                  },
                  {title},
                )}>
                <b>
                  <Translate
                    id="theme.blog.post.readMore"
                    description="The label used in blog post item excerpts to link to full blog posts">
                    Read More
                  </Translate>
                </b>
              </Link>
            </div>
          )}
        </footer>
      )}
    </article>
  );
}