import { Template } from './Template';

export interface VitalMetricModel {
    icon: string;
    mainValue: string,
    mainValueUnit: string,
    mainValueDesription: string,
    secondaryValue: string,
    secondaryValueUnit: string,
    secondaryValueDescription: string

};

export const VitalMetricTemplate: Template = {
    name: 'VitalMetricTemplate',
    template: `
        <li class="vitals__metric-container" >
            <div class="vital-metric">
                <div class="vital-metric__icon vital-metric__icon--<%= icon %>">
                </div>
                <div class="vital-metric__content">
                
                    <div class="vital-metric__main-value-container">
                        <div class="vital-metric__main-value">
                         <%= mainValue %>
                        </div>
                        <div class="vital-metric__unit">
                            <span class="vital-metric__unit-value">
                                <%= mainValueUnit %>
                            </span>
                            <span class="vital-metric__unit-description">
                                <%= mainValueDesription %>
                            </span>
                        </div>
                    </div>

                    <div class="vital-metric__secondary-value-container">
                        <span class="vital-metric__secondary-value">
                            <%= secondaryValue %>
                        </span>
                        <div class="vital-metric__secondary-unit">
                            <span class="vital-metric__secondary-unit-value">
                                <%= secondaryValueUnit %>
                            </span>
                            <span class="vital-metric__secondary-unit-value-description">
                                <%= secondaryValueDescription %>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `
};
