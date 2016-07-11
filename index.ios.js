/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import HorizontalBarChart from './src/component/lin_charts/HorizontalBarChart';

class LinChart extends Component {
    // 构造
    constructor(props) {
        super(props);

        let data = {
            title: {
                text: '世界人口总量',
                subtext: '数据来自网络'
            },
            //主轴(在水平柱状图中相当于y轴,在柱状图中相当于x轴)
            mAxis: {
                type: 'category',
                data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [182, 23489, 29034, 104970, 131744, 63230]
                },
                {
                    name: '2012年',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 68107]
                }
            ]
        };
        // 初始状态
        this.state = {
            data: data,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <HorizontalBarChart data={this.state.data}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('LinChart', () => LinChart);
