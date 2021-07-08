
/* IMPORT */

import * as isPrimitive from 'is-primitive';
import * as querystring from 'querystring';
import {Options} from './types';

/* MAIN */

const urlencoded = ( options?: Options ) => {

  const limit = options?.limit ?? Infinity;

  const setBody = ( req, body ): void => {

    req.body = isPrimitive ( body ) ? {} : body;

  };

  return async ( req, res, next: ( error?: Error ) => void ): Promise<void> => {

    const {method} = req;

    if ( method !== 'POST' && method !== 'PUT' && method !== 'PATCH' ) return next ();

    const type = req.headers['content-type'];

    if ( typeof type !== 'string' || !type.includes ( 'application/x-www-form-urlencoded' ) ) return next ();

    try {

      let body = '';

      for await ( const chunk of req ) {

        body += chunk;

        if ( body.length > limit ) return res.sendStatus ( 413 );

      }

      setBody ( req, querystring.parse ( body ) );

      next ();

    } catch ( error ) {

      setBody ( req, {} );

      next ( error );

    }

  }

};

/* EXPORT */

export default urlencoded;
