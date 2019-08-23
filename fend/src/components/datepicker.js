import React, { Component } from 'react';

export default class DatePicker extends Component {
    render() {
        return (
            <div id="chart-container">
                <form onSubmit={this.props.onSubmit}>
                    Choose Date range
                    <input type="date" name="start" onChange={this.props.onChange} />
                    <input type="date" name="end" onChange={this.props.onChange} />
                    <input type="submit" value='Update Graph' />
                </form>
            </div>

        );
    }
}
