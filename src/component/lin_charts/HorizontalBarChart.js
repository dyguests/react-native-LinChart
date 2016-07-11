/**
 *
 * see {@link http://echarts.baidu.com/demo.html#bar-y-category}
 *
 * Created by fanhl on 16/7/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class HorizontalBarChart extends Component {
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        // maxLoops: React.PropTypes.number.isRequired,
        // posterFrameSrc: React.PropTypes.string.isRequired,
    };

    render() {
        return (
            <View style={styles.container}>
                  {this.renderTitle()}
                  {this.renderGrid()}
            </View>
        );
    }

    /**
     * 标题,显示标题,各色柱的内容
     * @returns {XML}
     */
    renderTitle = ()=> {
        let {
            title:{
                text,
                subtext,
            },
            series,
        }=this.props.data;

        let serieTitle = [];
        for (let i = 0; i < series.length; i++) {
            let serie = series[i];
            serieTitle.push(
                <SerieTitle
                    key={i}
                    title={serie.name}
                    seriesIndex={i}/>
            );
        }

        return (
            <View style={styles.titleContainer}>
                  {serieTitle}
            </View>
        );
    };

    /**
     * 渲染网格部分(水平柱部分)
     * @returns {XML}
     */
    renderGrid = ()=> {
        let {
            mAxis,
            series,
        }= this.props.data;

        let columns = mAxis.data.length;

        //get max Value
        let maxValue = 0;
        for (let serie of series) {
            for (let item of serie.data) {
                maxValue = Math.max(maxValue, item);
            }
        }

        let seriesData = [];
        let length = series[0].data.length;
        let seriesCount = series.length;
        for (let i = 0; i < length; i++) {
            let seriesItem = [];
            for (let j = 0; j < seriesCount; j++) {
                seriesItem.push(series[j].data[i]);
            }
            seriesData.push(seriesItem);
        }

        let horiBarArr = [];
        for (let i = 0; i < columns; i++) {
            horiBarArr.push(
                <HorizontalBars
                    key={i}
                    title={mAxis.data[i]}
                    data={seriesData[i]}
                    max={maxValue}/>
            );
        }

        return (
            <View style={styles.gridContainer}>
                  {horiBarArr}
            </View>
        );
    };
}

/**
 * 顶部用于显示每种颜色的柱状图对应哪一项的东西
 */
class SerieTitle extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        seriesIndex: React.PropTypes.number,
    };

    render() {
        let {
            title,
            seriesIndex,
        }=this.props;

        let barStyle = styles.bar1;
        if (seriesIndex % 3 == 1) {
            barStyle = styles.bar2;
        } else if (seriesIndex % 3 == 2) {
            barStyle = styles.bar3;
        }

        return (
            <View style={styles.serieTitleContainer}>
                <View style={[styles.serieTitleBar, barStyle]}/>
                <Text style={styles.serieTitleText}>{title}</Text>
            </View>
        );
    }
}

/**
 * 一列水平柱(包含一个x点,的几个series的数据)
 */
class HorizontalBars extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        data: React.PropTypes.array.isRequired,
        max: React.PropTypes.number.isRequired,
    };

    render() {
        let {
            title,
            data,
            max,
        } = this.props;

        let horiBars = [];
        let length = data.length;
        for (let i = 0; i < length; i++) {
            horiBars.push(<HorizontalBar key={i} value={data[i]} max={max} seriesIndex={i}/>);
        }

        return (
            <View style={styles.horizontalBars}>
                <Text>{title}</Text>
                  {horiBars}
            </View>
        );
    }
}

/**
 * 单条水平柱
 */
class HorizontalBar extends Component {
    static propTypes = {
        value: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        seriesIndex: React.PropTypes.number,
    };

    render() {
        let {
            value,
            max,
            seriesIndex,
        }=this.props;

        let barStyle = styles.bar1;
        if (seriesIndex % 3 == 1) {
            barStyle = styles.bar2;
        } else if (seriesIndex % 3 == 2) {
            barStyle = styles.bar3;
        }

        return (
            <View style={[styles.horizontalBar, barStyle, {width: 300 * value / max}]}>
                <Text style={styles.barText}
                      numberOfLines={1}>{value}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        // width: 300,
        height: 300,
        // backgroundColor: 'gray',
    },
    titleContainer: {
        // height: 48,
        alignItems: 'flex-end',//enum('flex-start', 'flex-end', 'center', 'stretch')
        justifyContent: 'center',// enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')

    },
    serieTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    serieTitleBar: {
        width: 50,
        height: 10,
        marginRight: 5,
    },
    serieTitleText: {
        marginRight: 5,
    },
    gridContainer: {},
    horizontalBars: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
    },
    horizontalBar: {
        height: 20,
        // borderRadius: 5,
        alignItems: 'flex-end',//enum('flex-start', 'flex-end', 'center', 'stretch')
        justifyContent: 'center',// enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')
        paddingLeft: 5,
        paddingRight: 5,
    },
    bar1: {
        backgroundColor: 'blue',
    },
    bar2: {
        backgroundColor: 'red',
    },
    bar3: {
        backgroundColor: 'yellow',
    },
    barText: {
        color: 'white',
    },
});