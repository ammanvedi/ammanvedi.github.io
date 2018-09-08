import * as moment from '../../node_modules/moment/min/moment.min.js';

export interface HeartRateMeasurement {
    timestamp: number
    bpm: number
}

export type HeartRateSet = Array<HeartRateMeasurement>
export type WorkoutSet = Array<Workout>


export interface Workout {
    timestamp: number
    end_timestamp: number
    distance: number
    pace: number
}

export interface BasicMetricSet {
    steps: number
    distance: number
}

export interface Metrics {
    allTime: BasicMetricSet
    today: BasicMetricSet
}

export interface HealthData {
    lastUpdateTimestamp: number
    lastUpdateHuman: string
    heartrate: HeartRateSet
    workouts: WorkoutSet
    averageWorkoutPace: number
    metrics: Metrics
}

export interface HealthDataUIModel {
    lastUpdated: string
    workoutString: string
    metrics: Metrics
    heartRate: HeartRateSet
}

export class HealthModel {

    public data: HealthData
    public model: HealthDataUIModel

    constructor( data: HealthData ) {
        this.data = data;
        this.model = {
            lastUpdated: this.getLastUpdated( this.data.lastUpdateTimestamp ),
            workoutString: this.getWorkoutString( this.getWorkouts() ),
            metrics: this.data.metrics,
            heartRate: this.data.heartrate
        }
    }

    getWorkoutAverage() : number {
        return this.data.averageWorkoutPace;
    }

    getModel() : HealthDataUIModel {
        return this.model;
    }

    getWorkouts() : WorkoutSet {
        return this.data.workouts;
    }

    getWorkoutString( workouts: WorkoutSet ) {
        const lastWorkout = workouts[ 0 ];
        const lastWorkoutAgo = moment( this.getMSTimestamp( lastWorkout.timestamp ) ).calendar().toLowerCase();
        return `My last run was ${ lastWorkoutAgo }, ${ this.getWorkoutDescription( lastWorkout ) }`
    }

    getWorkoutDescription( workout: Workout ) : string {
        const dist = `${ this.getDistanceKM( workout.distance ) } Km`;
        const duration = this.getRunDuration( workout );
        const pace = workout.pace;
        const avg : number = parseFloat( this.getWorkoutAverage().toFixed( 1 ) );
        const betterWorse = pace < avg ? 'better' : pace === avg ? 'the same': 'worse'
        return `I covered ${ dist }, it took ${ duration } at a pace of ${ pace } min/Km, which is ${ betterWorse } than my overall average of ${ avg } min/Km`
    }

    getRunDuration( workout : Workout ) : string {
        const diff : number = workout.end_timestamp - workout.timestamp;
        const lengthMins: number = diff / 60;
        return `${ Math.floor( lengthMins ) } mins`

    }

    getDistanceKM( distance : number ) : string {

        const dist = ( distance / 1000 ).toFixed( 1 );
        return dist;
    }

    getLastUpdated( timestamp : number ) : string {
        return moment( this.getMSTimestamp( timestamp ) ).fromNow();
    }

    getMSTimestamp( t : number ) : number {
        return t * 1000;
    }

    getLatestHeartRate() : HeartRateMeasurement {
        return this.model.heartRate[ 0 ];
    }

    getRestingHeartRate() : number {
        return 42;
    }

    getStepsToday() : string {
        return this.model.metrics.today.steps.toLocaleString( 'en-GB' );
    }

    getStepsAllTime() : string {
        return this.model.metrics.allTime.steps.toLocaleString( 'en-GB' );
    }

    getDistanceTodayKM() : string {
        return this.getDistanceKM( this.model.metrics.today.distance );
    }

    getDistanceAllTimeKM() : string {
        return this.getDistanceKM( this.model.metrics.allTime.distance );
    }
}
