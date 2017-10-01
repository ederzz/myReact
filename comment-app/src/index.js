import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './css/index.css';
import App from './containers/CommentApp';
import commentsReducer from './reducers/comments';
import registerServiceWorker from './registerServiceWorker';

/*
	总结：
	这个小项目是利用了react搭建的评论功能，使用了react-redux来管理所有的评论内容，并且把最后一个评论人的名字和所有的评论内容放到
	localStorage里面保存，src/下的三个文件夹：components放的是Dumb组件，只根据props渲染数据，containers存放的是smart组件，包含
	了主要的业务逻辑；reducers下存放的是生成这个评论功能的store的reducer，reducer中会根据三种action.type分别作初始化store内评论
	数组的功能、添加评论的功能和删除评论的功能；在src/container/CommentList中每次渲染组件都会先从localStorge里获取所有的评论，
	然后触发initComments的action（初始化store里面的评论数组）；在src/components/Comment中每次点击删除评论按钮都会一层层触发事件
	直到src/containers/CommentList中触发deleteComment的action(删除store里面的某个评论)，同时也更新localStorage里的评论内容；
	在src/components/CommentInput中每次发布新的评论会触发点击事件，然后在src/containers/CommentInput中触发addComment的action
	(添加评论)，同时也更新localStorage里的评论内容；最后用src/containers/CommentApp渲染src/containers/CommentInput和CommentList
	在index.js中使用Provider组件给他们提供store；

*/

const store = createStore(commentsReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
