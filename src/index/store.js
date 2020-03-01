import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers(reducers),
    {
        from: '北京',
        to: '上海',
        isCitySelectorVisible: false, //选择城市浮层，默认false
        currentSelectingLeftCity: false, //选择城市之后需要回填城市，要么是from,要么是to，该值并没有实际意义
        cityData: null, //城市选择浮层上所有的城市数据，需按需异步进行加载
        isLoadingCityData: false, //当前是否正在加载城市数据，进行节流操作
        isDateSelectorVisible: false, //选择日期浮层开关
        highSpeed: false, //是否选择高铁动车
    },
    applyMiddleware(thunk)
);
