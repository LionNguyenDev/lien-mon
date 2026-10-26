import { appConfig } from '.';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  appUrl: appConfig.appUrl,
  name: 'Hành trình khám phá TP.HCM',
  metaTitle: 'Hành trình khám phá TP.HCM',
  description: 'Khám phá những câu chuyện và giá trị di sản của TP.HCM',
  ogImage: `${appConfig.appUrl}/og-image.jpg`,
};
