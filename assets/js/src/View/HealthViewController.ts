import { HeartChartView } from './HeartChartView';
import { HealthModel, HealthDataUIModel } from '../Model/HealthModel';

import { VitalsTemplate, VitalsModel } from '../Template/VitalsTemplate';
import { templateManager } from '../Template/Template';

import { VitalMetricTemplate, VitalMetricModel } from '../Template/VitalMetricTemplate';

export class HealthViewController {

    private heartChartView: HeartChartView;
    private heartChartContainer: HTMLElement;
    private vitalsContainer: HTMLElement;

    constructor( private container: HTMLElement, private model: HealthModel ) {

        const containerModel: VitalsModel = {
            text: this.model.getModel().workoutString
        }

        this.renderContainer( containerModel, this.container );

        this.heartChartContainer = this.container.querySelector( '.js-graph-container' );
        this.vitalsContainer = this.container.querySelector( '.js-vitals-container' );

        this.heartChartView = new HeartChartView( this.model.getModel().heartRate, this.heartChartContainer);
        this.renderVitals();
    }

    renderVitals() : void {

        const heart : VitalMetricModel = this.getHeartrateModel( this.model );
        const steps : VitalMetricModel = this.getStepsModel( this.model );
        const distance : VitalMetricModel = this.getDistanceModel( this.model );

        const heartMarkup : string = this.renderVitalMetric( heart );
        const stepsMarkup : string = this.renderVitalMetric( steps );
        const distanceMarkup : string = this.renderVitalMetric( distance );

        this.vitalsContainer.innerHTML = `${ heartMarkup } ${ stepsMarkup } ${ distanceMarkup }`;
    }

    renderContainer( model: VitalsModel, container: HTMLElement ): void {
        const markup = templateManager.render( VitalsTemplate, model );
        container.innerHTML = markup;
    }

    getHeartrateModel( model: HealthModel ) : VitalMetricModel {
        return {
            icon: 'heart',
            mainValue: model.getLatestHeartRate().bpm.toString(),
            mainValueUnit: 'bpm',
            mainValueDesription: 'latest',
            secondaryValue: '42',
            secondaryValueUnit: 'bpm',
            secondaryValueDescription: 'resting'
        }
    }

    getStepsModel( model: HealthModel ) : VitalMetricModel {
        return {
            icon: 'steps',
            mainValue: model.getStepsToday(),
            mainValueUnit: 'steps',
            mainValueDesription: 'today',
            secondaryValue: model.getStepsAllTime(),
            secondaryValueUnit: 'steps',
            secondaryValueDescription: 'all time'
        }
    }

    getDistanceModel( model: HealthModel ) : VitalMetricModel {
        return {
            icon: 'distance',
            mainValue: model.getDistanceTodayKM(),
            mainValueUnit: 'Km',
            mainValueDesription: 'today',
            secondaryValue: model.getDistanceAllTimeKM(),
            secondaryValueUnit: 'Km',
            secondaryValueDescription: 'all time'
        }
    }

    renderVitalMetric( model: VitalMetricModel ) : string {
        return templateManager.render( VitalMetricTemplate, model );
    }
}
