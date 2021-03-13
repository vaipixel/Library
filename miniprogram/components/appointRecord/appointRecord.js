// components/appointRecord/appointRecord.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        tabs: [
            {
                title: '进行中',
            },
            {title: '已结束',}
        ], currentSelected: '进行中'

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTabChanged(e) {
            console.log(e);
            this.setData({
                currentSelected: e.currentTarget.dataset.tab
            })
        }
    },
    lifetimes: {
        attached() {
            console.log(this.data.currentSelected)
        }
    }
})
