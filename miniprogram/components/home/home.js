// components/home/home.js
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
                distance: '900米'
            },
            {
                _id: '1',
                name: '梁林校区金庸图书馆',
                distance: '900米'
            },
            {
                _id: '2',
                name: '越秀校区图书馆',
                distance: '900米'
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
            let location = await wx.wxp.getLocation();
            this.setData({
                'currentLocation.latitude': location.latitude,
                'currentLocation.longitude': location.longitude,
            })
        }
    },
    lifetimes: {
        attached() {
            this.refreshLocation();
        }
    }
})
