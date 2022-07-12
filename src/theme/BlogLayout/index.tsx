/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';

import type {Props} from '@theme/BlogLayout';
import { useLocation } from '@docusaurus/router';

import styles from './index.module.css';

export default function BlogLayout(props: Props): JSX.Element {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  const local_url = useLocation().pathname;
  const tags_local_url = local_url.includes("/tags")
  
  if ( local_url == "/"){
    return (
      <div className={clsx(styles.containerHero, "container margin-vert--lg")}>
        <div className="row">
          <main
            className={clsx('col', {
              'col--7': hasSidebar,
              'col--8 col--offset-1': !hasSidebar,
            })}
            itemScope
            itemType="http://schema.org/Blog">
            {children}
          </main>
          <div className="col col--2">
            <div className="card">
              <div className="card__image">
                <img
                  src="https://images.unsplash.com/photo-1506624183912-c602f4a21ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                  alt="Image alt text"
                  title="Logo Title Text 1" />
              </div>
              <div className="card__body">
                <h4>关于 DevOps 故居</h4>
                <small>
                  The Quaco Head Lighthouse is a well maintained lighthouse close to St.
                  Martins. It is a short, beautiful walk to the lighthouse along the
                  seashore.
                </small>
              </div>
              <div className="card__footer">
                <button className="button button--primary button--block">Visit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Layout {...layoutProps}>
      <div 
        className={clsx("container margin-vert--lg",{
          [styles.tagsHero]: tags_local_url,
          [styles.blogContext]: !tags_local_url,
        })} >
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx('col', {
              'col--7': hasSidebar,
              'col--9 col--offset-1': !hasSidebar,
              'col--8': !tags_local_url,
            })}
            itemScope
            itemType="http://schema.org/Blog">
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
