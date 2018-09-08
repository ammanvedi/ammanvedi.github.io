import { Template } from './Template';

export interface VitalsModel {
    text: string
}

export const VitalsTemplate: Template = {
    name: 'VitalsTemplate',
    template: `
    <div class="vitals__graph-wrap">
        <div class="vitals__graph js-graph-container">
        </div>
    </div>
    <section class="vitals">
      <div class="vitals__content">
       <ul class="vitals__metrics js-vitals-container">
       </ul>
       <span class="vitals__text">
        <%= text %>
       </span>
      </div>
    </section>
    `
};
