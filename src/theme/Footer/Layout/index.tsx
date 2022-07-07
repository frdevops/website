/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Footer/Layout';
import footSytles from './styles.module.css';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): JSX.Element {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid" style={{marginTop: '50px', marginBottom: '50px'}}>
        <div className='row'>
          <div className='col'>
            <div className={clsx("footer__bottom", footSytles.footerBottom)}>
              <img className={footSytles.footer__logo} src="/img/logo.png"/>
              <b className={footSytles.rainbondtext}>DevOps 故居</b>
            </div>
            <div className={clsx("footer__bottom", footSytles.slogan)}>
              <p>专注于云原生领域 Kubernetes、istio、CI/CD，分享技术干货</p>
            </div>
          </div>
          <div className='col'>
            {links}
            {(logo || copyright) && (
            <div className="footer__bottom text--center">
              {logo && <div className="margin-bottom--sm">{logo}</div>}
            </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer__bottom text--center">
          {copyright} 
      </div>
    </footer>
  );
}