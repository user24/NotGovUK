import { Request, Next } from 'restify';
import { Router } from '@not-govuk/restify';
import { PageModule, PageInfoSSR, PageLoader } from '@not-govuk/app-composer';
import { Response } from '@not-govuk/server-renderer';
import path from 'path';

const pageExtensionPattern = /\.[jt]sx?$/i

const removePrecedingDotSlash = (s: string): string => (
  s.startsWith('./')
    ? s.slice(2)
    : s
);

const removeTrailingSlash = (s: string): string => (
  s.endsWith('/')
    ? s.slice(0, -1)
    : s
);

const addPreceedingSlash = (s: string): string => (
  s.startsWith('/')
    ? s
    : '/' + s
);

const src2Href = (page: string): string => (
  addPreceedingSlash(
    removePrecedingDotSlash(page)
      .replace(pageExtensionPattern, '')
      .replace(/index$/, '')
      .split(path.sep)
      .map(encodeURI)
      .join('/')
  )
);

const href2Path = (s: string): string => (
  addPreceedingSlash(removeTrailingSlash(s))
);

export const gatherPages = (pageLoader: PageLoader): Promise<PageInfoSSR[]> => Promise.all(
  pageLoader
    .keys()
    .map(async e => {
      const mod: PageModule = await pageLoader(e);

      return {
        Component: mod.default,
        href: src2Href(e),
        src: e,
        title: mod.title
      };
    } )
);

const pageMiddleware = (title: string) => (req: Request, res: Response, next: Next) => {
  res.renderApp(200, title).finally(next);
};

export const pageRoutes = (pages: PageInfoSSR[]) => {
  const router = new Router();

  pages.forEach(e => router.get(href2Path(e.href), pageMiddleware(e.title)));

  return router;
};
