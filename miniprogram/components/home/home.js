// components/home/home.js
const {getDistanceByLocation} = require('../../utils/location_utils');
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        libraries: [
            {
                _id: '0',
                name: '梁林校区医学院图书馆',
                latitude: 120.72321,
                longitude: 30.740481,
                distance: '-米'
            },
            {
                _id: '1',
                name: '梁林校区金庸图书馆',
                latitude: 120.720088,
                longitude: 30.73778,
                distance: '-米'
            },
            {
                _id: '2',
                name: '越秀校区图书馆',
                latitude: 120.730185,
                longitude: 30.745352,
                distance: '-米'
            }
        ],
        currentLocation: {
            latitude: 0,
            longitude: 0
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async refreshLocation() {
            let currentLocation = await wx.wxp.getLocation();
            this.setData({
                'currentLocation.latitude': currentLocation.latitude,
                'currentLocation.longitude': currentLocation.longitude,
            });
            this.data.libraries.forEach(library => {
                library.distance = getDistanceByLocation(currentLocation, {
                    latitude: library.latitude,
                    longitude: library.longitude
                });
            });
            this.setData({
                libraries: this.data.libraries
            });
        }
    },
    lifetimes: {
        attached() {
            this.refreshLocation();
        }
    }
})
