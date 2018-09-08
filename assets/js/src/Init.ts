import { HealthModel } from './Model/HealthModel';
import { HealthViewController } from './View/HealthViewController';


interface Console {
    log( message: string | object ) : void
}
declare function fetch( url: string ) : Promise<any>;
declare const console : Console;

fetch( 'https://1xr1img432.execute-api.eu-west-2.amazonaws.com/prod' )
    .then( res => {
        return res.json();
    } )
    .then( data => {
        const element: HTMLElement = document.getElementById( 'health' );
        if ( element ) {
            const model: HealthModel = new HealthModel( data );
            const view: HealthViewController = new HealthViewController( element, model )
            console.log( model.getModel() );
        }

    } )
