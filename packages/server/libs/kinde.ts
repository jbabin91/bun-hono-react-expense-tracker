/* eslint-disable @typescript-eslint/require-await */
import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from '@kinde-oss/kinde-typescript-sdk';
import type { Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
  },
);

export const sessionManager = (c: Context): SessionManager => ({
  async destroySession() {
    for (const key of ['id_token', 'access_token', 'user', 'refresh_token']) {
      deleteCookie(c, key);
    }
  },
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'Lax',
      secure: true,
    } as const;
    if (typeof value === 'string') {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
});

type Env = {
  Variables: {
    user: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);

    if (!isAuthenticated) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const user = await kindeClient.getUserProfile(manager);
    c.set('user', user);
    await next();
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Unauthorized' }, 401);
  }
});
