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
    'margin-left': '30%'
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

    state = {
        data: []
    }
    componentDidMount() {
        this.props.getGraphdata(1)
    }
    onClick = (event) => {
        event.preventDefault()
        this.props.getGraphdata(1)
    }

    render() {
        const { classes } = this.props;
        const currentPath = this.props.location.pathname
        return (
            <React.Fragment>
                <CssBaseline />
                <NavBar login={true} currentPath={currentPath} />
                {/* <button onClick={this.onClick}>Update Series</button> */}
                <div style={pagination} align="center">
                    <span style={span} onClick={() => this.props.getGraphdata(1)}>PM2.5 ug/m3</span>
                    <span style={span} onClick={() => this.props.getGraphdata(2)}>PM10 ug/m3</span>
                    <span style={span} onClick={() => this.props.getGraphdata(3)}>Temperature</span>
                    <span style={span} onClick={() => this.props.getGraphdata(4)}>Humidity</span>
                    <span style={span} onClick={() => this.props.getGraphdata(5)}>Heat Index</span>
                </div>
                <div className={classes.root}>
                    <Chart options={this.props.options} />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ graphDataReducer }) => ({
    options: graphDataReducer.options

});
export default connect(mapStateToProps, { getGraphdata })(withRouter(withStyles(styles)(Dashboard)));
