import * as utils from ".";
import type { Moment } from "moment";
import njwt from 'njwt';

/** Creates a jwt token. */
export function create(claims: Record<string, string>, expires: Moment) {
  claims.expires = expires.toDate().toUTCString();
  return njwt.create(claims, utils.secret.key).compact();
}