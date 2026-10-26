export const ROUTES = {
  HOME: '/',
  MAP: '/ban-do',
  CERTIFICATE: '/chung-nhan',
} as const;

export const locationPath = (slug: string) => `/dia-diem/${slug}`;
