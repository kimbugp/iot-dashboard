import { LOGIN, GRAPH } from "../../actions/actionTypes";

const initialState = {
    tenants: [],
    user: {}
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

const initialGraph = {
    options: {
        chart: {
            renderTo: 'chart-container',
            defaultSeriesType: "line",
            backgroundColor: '#ffffff'
        },
        title: {
            text: 'Title of the graph'
        },
        plotOptions: {
            line: {
                color: '#d62020'
            },
            bar: {
                color: '#d62020'
            },
            column: {
                color: '#d62020'
            },
            spline: {
                color: '#d62020'
            },
            series: {
                marker: {
                    radius: 3
                },
                animation: true,
                step: false,
                borderWidth: 0,
                turboThreshold: 0
            }
        },
        exporting: {
            enabled: true
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            },
            categories: []
        },
        yAxis: {
            title: {
                text: 'Y axis'
            },
            min: null,
            max: null,
            startOnTick: false,
            endOnTick: false
        },
        legend: {
            enabled: false
        },
        series: [{
            name: ''
        }],
        credits: {
            text: 'Mirest IOT',
            href: 'https://mirest.herokuapp.com/',
            style: {
                color: '#D62020'
            }
        }
    }
}

export function graphDataReducer(state = initialGraph, action) {
    switch (action.type) {

        case GRAPH:
            let chartData = []
            let dates = []
            action.payload.data.feeds.forEach(feed => {
                let value = feed[action.field]
                let date = feed.created_at
                dates.push(Date(date))
                chartData.push(Number(value));
            });
            return {
                ...state,
                options: {
                    ...state.options,
                    title: {
                        text: action.payload.data.channel.name
                    },
                    series: [{
                        name: '',
                        data: chartData
                    }],
                    xAxis: {
                        ...state.options.xAxis,
                        categories: dates

                    },
                    yAxis: {
                        ...state.options.yAxis,
                        title: {
                            text: action.payload.data.channel[action.field]
                        }

                    }
                }
            };
        default:
            return state;
    }
}