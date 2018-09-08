import { HeartRateSet, HeartRateMeasurement } from '../Model/HealthModel';
import * as Chart from '../../node_modules/chart.js/dist/Chart.min.js';
import * as moment from '../../node_modules/moment/min/moment.min.js';

export class HeartChartView {

    private chartInstance?: Chart;
    public readonly canvasEl: HTMLCanvasElement = document.createElement( 'canvas' );
    public readonly wrapperEl: HTMLDivElement = document.createElement( 'div' );

    static GRAPH_COLOR = 'rgba( 254, 202, 87, .47 )';

    constructor( private readonly heartData: HeartRateSet, private readonly container: HTMLElement ) {

        this.wrapperEl.classList.add( 'health-container__heart-rate' );
        this.wrapperEl.appendChild( this.canvasEl );
        this.makeChart( this.heartData );
        this.canvasEl.style.maxHeight = '300px';
    }

    makeChart( data: HeartRateSet ) : void {

        const dataPoints: Array<number> = this.getDataPoints( data );
        const labels: Array<string> = this.getLabels( dataPoints );

        const chartConfig: object = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Heartrate',
                        data: dataPoints,
                        lineColor: 'rgba( 0, 0, 0, 0 )',
                        borderColor: 'rgba( 0, 0, 0, 0 )',
                        pointBorderColor: 'rgba( 0, 0, 0, 0 )',
                        pointBackgroundColor: 'rgba( 0, 0, 0, 0 )',
                        pointHoverBackgroundColor: 'rgba( 0, 0, 0, 0 )',
                        pointHoverBorderColor: 'rgba( 0, 0, 0, 0 )',
                        backgroundColor: HeartChartView.GRAPH_COLOR,
                        fill: 'origin',
                        cubicInterpolationMode: 'monotone'
                    }
                ]
            },
            options: {
                responsive: true,
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                tooltips: {
                    mode: 'index'
                },
                legend: {
                    display: false
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                scales: {
                    yAxes: [ {
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            display: false
                        }
                    } ],
                    xAxes: [ {
                        ticks: {
                            padding: -100,
                            display: false
                        },
                        gridLines: {
                            drawBorder: false,
                            display: false
                        }
                    } ]
                }
            }
        }

        const context: CanvasRenderingContext2D = this.canvasEl.getContext( '2d' );
        this.chartInstance = new Chart( context , chartConfig );
        this.container.appendChild( this.wrapperEl );
        console.log( this.container );
    }

    getElement(): HTMLDivElement {
        return this.wrapperEl;
    }

    getLabels( dataPoints: Array<number> ): Array<string> {
        return dataPoints.map( ( item: number, index: number ) : string => {
            return index.toString();
        } );
    }

    getDataPoints( dataSet: HeartRateSet ) : Array<number> {
        return dataSet.map( ( measure: HeartRateMeasurement ): number => {
            return measure.bpm;
        } )
    }
}
