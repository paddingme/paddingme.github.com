'use strict';

angular.module('cascade').constant('CityData', [
    {
        label: '中国',
        flag: 'cn.png',
        provinces:[
            {
                label: "北京",
                cities: [
                    {
                        label:"朝阳区"
                    },

                    {
                        label:"海淀区"
                    },
                    {
                        label:"宣武区"
                    }
                ]
            },


            {
                label: "安徽",
                cities: [
                    {
                        label:"合肥"
                    },

                    {
                        label:"六安"
                    },
                    {
                        label:"宣城"
                    }
                ]
            },


            {
                label: "黑龙江",
                cities: [
                    {
                        label:"哈尔滨"
                    },

                    {
                        label:"七台河"
                    },
                    {
                        label:"鹤岗"
                    }
                ]
            }
        ]
    },

    {
        label: '美国',
        flag: 'us.png',
        provinces: [
          {
            label: '纽约',
            cities: [
              {
                label: '曼哈顿区'
              },
              {
                label: '皇后区'
              }
            ]
          },
          {
            label: '德克萨斯州',
            cities: [
              {
                label: '休斯顿'
              },
              {
                label: '达拉斯'
              }
            ]
          },
          {
            label: '加利福尼亚州'
          }
        ]
    }

]);

