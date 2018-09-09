import { setMultipleListeners } from './EventHelper';

export interface FetchConfig {
    url: string,
    method: string
}

export interface FetchConfigCallback extends FetchConfig {
    callback( data: object, error?: object ) : any
}

export const JSONFetch = function ( config: FetchConfigCallback ) : void {

    const request = new XMLHttpRequest();

    request.addEventListener( 'load', () => {
        const response = JSON.parse( request.responseText );
        config.callback( response, null );
    } );

    setMultipleListeners( [ 'error', 'abort' ], request, () => {
        config.callback( {}, {
            error: 'There was a problem fetching the data'
        } );
    } );

    request.open( config.method, config.url );
    request.send();

}


export const JSONFetchPromise = function( config: FetchConfig ) : Promise<object> {
    
    return new Promise( ( resolve, reject ) => {

        JSONFetch( {
            ...config,
            callback: ( data, error ) => {
                if( error ) {
                    return reject( error );
                }

                resolve( data );
            }
        } )


    } )

    
}