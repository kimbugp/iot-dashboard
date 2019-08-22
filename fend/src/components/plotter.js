import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const containerStyle = {
    border: '1px solid red',
    width: '50%',
    margin: '0 auto'
}

export default class Chart extends Component {

    render() {
        return (
            <div id="chart-container" style={containerStyle}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.props.options}
                />
            </div>

        );
    }
}