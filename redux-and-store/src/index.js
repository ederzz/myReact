import React,{Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Content from './js/Content';
import PropTypes from 'prop-types';
import Header from './js/Header';
import {Provider} from './js/react-redux';

/*
 *总结：
 *  当有某个状态被多个组件依赖或者影响时，就该把这些状态放到这些组件的最近公共父组件中去管理，用props来传递数据或者函数，
 * 	这叫做状态提升；但是这样写起来非常麻烦，当层次变深时维护也很困难，所以就找到一个一个变量来存放这些状态，能够全局共享这些
 * 	状态，当需要时就自己去获取，而不用一层层去传递，这就是context，设置在某个组件的context的状态，该组件及其所有子组件都能访问，
 * 	极大的增强了组件之间的耦合性，redux等状态管理库就是利用了它来提供方便的状态管理服务，但是这样会增加程序的不可预料性，因为
 * 	他就像全局变量一样，里面的数据能够被随意修改；所以我们结合了自己定义的store,dispatch，reducer等方式来动态管理我们的共享状态
 * 	把他放到我们自己封装的一个叫store对象里（因为store里面的内容不可能随意修改，刚好弥补context的缺点），每次修改这些共享状态
 * 	都得经过dispatch,reducer，同时store也存放了获取这些共享状态的函数，为了让大家都能获取这些共享状态，我们把这个叫做store的
 * 	东西放到context里，使设置了context的组件及其子组件都能获取到这个store，来对所有的共享状态进行管理、获取(store的subscribe
 * 	函数控制状态改变后页面的重新渲染);然后呢，我们将这些对context的操作，store的操作代码从主要的功能组件中分离了出去，以达到
 * 	代码复用，去除这些重复代码的编写的作用，首先书写了一个高阶组件，第一个参数接受两个参数，分别是mapStateToProps和
 * 	mapDispatchToProps来对store存放的共享状态和dispatch函数作获取和返回处理（mapStateToProps告诉connect组件需要什么数据，
 * 	mapDispatchToProps告诉connect组件需要什么触发什么action），将获取到的状态和函数以props的方式传给被包裹的组件
 * 	，非常方便，还定义了个根组件Provider来抽离Index组件中存放store到context的代码(把store用props传递给Provider)，最后用
 * 	这个Provider组件来包裹Index作为根组件，大致就是这样，总结不到位的地方尽请谅解~~~使用过redux的朋友，都知道这些store,dispatch
 * 	,action,reducer,connect,mapStateToProps,Provider都是redux的东西，这里我们自己写一遍，随意距离完成的redux还有很大差距，
 * 	但是对于我们理解redux的使用和原理有很大帮助~~~
 * 
 * */

function createStore( reducer ) {
	let state = null;
	const getState = () => state;
	const listeners = [];
	const subscribe = ( listener ) => { listeners.push( listener ) };
	const dispatch = ( action ) => {
		state = reducer( state, action );
		listeners.forEach( ( listener ) => {
			listener();
		})
	}
	dispatch( {} );
	return { getState, subscribe, dispatch };
}

const themeReducer = ( state, action ) => {
	if( !state ){
		return {
			themeColor : 'red'
		};
	}
	switch( action.type ){
		case 'CHANGE_COLOR':
			return {...state,themeColor : action.themeColor };
		default :
			return state;
	}
}

const store = createStore( themeReducer );

class Index extends Component{
	
	render() {
		return (
			<div>
				<Header />
				<Content />
			</div>
		);
	}
}



ReactDOM.render(
	<Provider store={store}>
		<Index />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
