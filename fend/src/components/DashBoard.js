import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './NavBar';
import styles from '../styles/dashBoard';
import Chart from './plotter';
import getGraphdata from '../actions/graphs'
import { connect } from "react-redux";

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
        this.state = { data: [] };
        this.chart;
    }

    componentDidMount() {
        this.props.getGraphdata(1)
        this.chart = this.refs.page.refs.chart.chart;
    }

    exportChart = (event) => {
        event.preventDefault()
        this.chart.exportChart();
    };

    render() {
        const { classes } = this.props;
        const currentPath = this.props.location.pathname
        return (
            <React.Fragment>
                <CssBaseline />
                <NavBar login={true} currentPath={currentPath} />
                {/* <button onClick={this.exportChart}>Download Graph</button> */}
                <div style={pagination} align="center">
                    <span style={span} onClick={() => this.props.getGraphdata(1)}>PM2.5 ug/m3</span>
                    <span style={span} onClick={() => this.props.getGraphdata(2)}>PM10 ug/m3</span>
                    <span style={span} onClick={() => this.props.getGraphdata(3)}>Temperature</span>
                    <span style={span} onClick={() => this.props.getGraphdata(4)}>Humidity</span>
                    <span style={span} onClick={() => this.props.getGraphdata(5)}>Heat Index</span>
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
