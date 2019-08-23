import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './NavBar';
import styles from '../styles/dashBoard';
import Chart from './plotter';
import getGraphdata from '../actions/graphs'
import { connect } from "react-redux";
import DatePicker from './datepicker';

const pagination = {
    display: 'flex',
    marginLeft: '30%'
}
const span = {
    cursor: 'pointer',
    color: 'black',
    float: 'left',
    padding: '8px 16px',
    transition: 'background-color .3s',
    border: '1px solid #ddd',
}

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            end: '2019-08-15',
            start: '2018-08-15',
            page: 1,
            field: 1,
            number: 100
        }
        this.chart;
    }

    componentDidMount() {
        let queryString = Object.keys(this.state).map(key => key + '=' + this.state[key]).join('&');
        this.props.getGraphdata(this.state.field, queryString)
        this.chart = this.refs.page.refs.chart.chart;
    }

    exportChart = (event) => {
        event.preventDefault()
        this.chart.exportChart();
    };

    onSubmit = (event) => {
        event.preventDefault()
        let queryString = Object.keys(this.state).map(key => key + '=' + this.state[key]).join('&');
        this.props.getGraphdata(this.state.field, queryString)
    }

    onChange = () => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onClick = (event) => {
        event.preventDefault()
        let state = this.state
        state.field = parseInt(event.target.id)
        let queryString = Object.keys(state).map(key => key + '=' + state[key]).join('&');
        this.props.getGraphdata(state.field, queryString)
    }


    render() {
        const { classes } = this.props;
        const currentPath = this.props.location.pathname

        const tables = ['PM2.5 ug/m3', 'PM10 ug/m3', 'Temperature', 'Humidity', 'Heat Index']
        return (
            <React.Fragment>
                <CssBaseline />
                <NavBar login={true} currentPath={currentPath} />
                <DatePicker onChange={this.onChange} onSubmit={this.onSubmit} />
                <div style={pagination} align="center">
                    {tables.map((item, index) => <span style={span} id={index + 1} key={index + 1} onClick={this.onClick}>{item}</span>)}
                </div>
                <div className={classes.root}>
                    <Chart options={this.props.options} chartobj={this.props.chart} constructorType={"page"} ref={"page"} />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ graphDataReducer }) => ({
    options: graphDataReducer.options

});
export default connect(mapStateToProps, { getGraphdata })(withRouter(withStyles(styles)(Dashboard)));
