import { Template } from './Template';

export interface ErrorMessageModel {
    message: string
};

export const ErrorTemplate: Template = {
    name: 'VitalMetricTemplate',
    template: `<span class="health-container__error"><%= message %></span>`
};
