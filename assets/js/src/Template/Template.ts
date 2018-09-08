import * as underscore from '../../node_modules/underscore/underscore.js';


interface TemplateCacheStructure {
    [ key: string ]: Function
}

export interface Template {
    name: string,
    template: string
}

class TemplateManager {

    private templateCache: TemplateCacheStructure = {};

    render( template: Template, model: object ): string {

        if( !this.templateCache[ template.name ] ) {
            this.templateCache[ template.name ] = underscore.template( template.template );
        }

        return this.templateCache[ template.name ]( model );
    }
}


export const templateManager = new TemplateManager();
