import React, { Component} from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
// import CheckBox from '@react-native-community/checkbox';
// import CheckBox from 'react-native-check-box';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {

	constructor ( props ) {

		super(props);

		this.state = {
			username: '',
			password: '',
			tasks: [],
			showDescription: false,
		}

	}
	componentWillUnmount() {
		this._unsubscribe();
	}

	componentDidMount () {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.getTasks();
		});
	}

	completeTask = (item) => {
		
		let tasks = this.state.tasks;
		
		tasks.forEach((task)=>{
			if( JSON.stringify(task) === JSON.stringify(item) ) {
				task.completed = ! task.completed;
			}
		})
		this.setState({tasks})

		const jsonValue = JSON.stringify(tasks)
		AsyncStorage.setItem('tasks', jsonValue);
	} 

	deleteTask = (item) => {

		let tasks = this.state.tasks;
		
		tasks.forEach((task, index)=>{
			if( JSON.stringify(task) === JSON.stringify(item) ) {
				tasks.splice( index, 1);
			}
		})
		this.setState({tasks})

		const jsonValue = JSON.stringify(tasks)
		AsyncStorage.setItem('tasks', jsonValue);
	}
	
	showDescription = (item) => {

		let tasks = this.state.tasks;
		
		tasks.forEach((task, index)=>{
			if( JSON.stringify(task) === JSON.stringify(item) ) {
				task.showDescription = ! task.showDescription;
			}
		})
		this.setState({tasks})

		const jsonValue = JSON.stringify(tasks)
		AsyncStorage.setItem('tasks', jsonValue);
	}

	renderItem = ({item}) => {

		let taskStyle  = [styles.taskContainer];
		let titleStyle = [styles.taskTitle];
		
		if( item.completed ) {
			titleStyle.push( styles.strike );
			taskStyle.push( {opacity: 0.4} )
		}

		return (
			<TouchableOpacity onPress={ () => this.showDescription(item) }>
				<View style={taskStyle} >
					<View style={styles.task} >
						<View style={styles.taskLeftInnerContainer} >
							<TouchableOpacity onPress={ () => this.completeTask(item) }>
								<Image style={{width:20,height:20,marginRight:10 }} source={require('../assets/checkbox-checked.png')}/>
							</TouchableOpacity>
							{/* <CheckBox
								style={styles.checkbox}
								isChecked={item.completed}
								onClick={(checked) => this.completeTask(checked, item)}
							/> */}
							<Text style={titleStyle} >{item.title}</Text>
						</View>
						<View style={styles.taskRightInnerContainer} >
						<TouchableOpacity onPress={() => this.deleteTask(item)}>
							<Image style={styles.delete} source={require('../assets/delete.png')} />
						</TouchableOpacity>
						</View>
					</View>
					<View style={[styles.taskDescription, item.showDescription ? {display:"flex"} : {display: "none"} ]}>
						<Text>{item.description}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	getTasks = async() => {
		let tasks = [];
		tasks = await AsyncStorage.getItem('tasks').then(data => {
			return JSON.parse(data);
		});
		this.setState({tasks});
	}

	searchTasks = async(text) => {

		let allTasks = [];
		let tasks = [];

		allTasks = await AsyncStorage.getItem('tasks').then(data => {
			return JSON.parse(data);
		});

		allTasks.forEach((task)=>{
			let title = task.title;
			if( title.match(text) ) {
				tasks.push(task);
			}
		})
		this.setState({tasks});
	}

	showAllTasks = () => {

		if( null != this.state.tasks ) {
			return(
				<FlatList
					data={this.state.tasks}
					renderItem={this.renderItem}
					keyExtractor={(item) => item.key}
					showsVerticalScrollIndicator ={false}
				/>
			)
		}
		else {
			return(
				<Image style={{width:'100%', height: '100%' }} source={require('../assets/nothing-found.jpg')} />
			)
		}

	}

	render() {
		return (
			<View style={styles.container} >
				<View style={styles.topView}>
					<Text style={styles.h1} >Tasks</Text>
				</View>
				<View style={styles.midView}>
					<View style={styles.searchContainer}>
						<TextInput style={styles.searchField} placeholder="Search" onChangeText={ (text) => {this.searchTasks(text)} }/>
					</View>
					<View style={styles.taskList} >
						{this.showAllTasks()}
					</View>
				</View>
				<View style={styles.endView}>
					<TouchableOpacity style={styles.addTaskButtonWrapper} onPress={() => this.props.navigation.navigate('AddTask')}>
						<Text style={styles.addTaskButton}>+</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: '#fff',
	},
	textField: {
		width: '80%',
		borderBottomWidth: 1,
		borderColor: '#333',
	},
	h1: {
		color: '#fff',
		fontSize: 45,
		fontWeight: '700',
	},
	topView: {
		height: '30%',
		width: '50%',
		paddingLeft: 20,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: 'teal',
		borderBottomRightRadius: 150,
	},
	midView: {
		height: '70%',
		width: '100%',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	endView: {
		backgroundColor: '#fff',
		height: '0%',
		width: '100%',
		justifyContent: "space-evenly",
		alignItems: 'center',
	},
	addTaskButton: {
		color: '#fff',
		fontSize: 30,
	},
	addTaskButtonWrapper: {
		position: 'absolute',
		bottom: 15,
		right: 15,
		backgroundColor: 'teal',
		width: 60,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		elevation: 5
	},
	viewTaskButton: {
		width: '80%',
		height: '100%',
		marginVertical: 50,
	},
	searchContainer: {
		height: '20%',
		width: '90%',
		paddingVertical: 10,
		justifyContent: 'center',
	},
	searchField: {
		backgroundColor: '#fff',
		width: '100%',
		borderBottomWidth: 1,
		fontSize: 20,
	},
	taskList: {
		width: '90%',
		height: '75%',
		borderRadius: 20,
	},
	taskContainer: {
		backgroundColor: '#fff',
		width: '100%',		
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginVertical: 10,
		borderRadius: 20,
		elevation: 2,
		borderColor: '#ccc',
		borderWidth: 1
	},
	task: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: 10,
	},
	taskDescription: {
		width: '100%',		
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 10,
		borderColor: '#ccc',
		borderTopWidth: 1
	},
	taskLeftInnerContainer: {
		flexDirection: 'row',
		justifyContent: "flex-start",
		alignItems: 'center',
		width: '90%',
	},
	taskRightInnerContainer: {
		width: '10%'
	},
	taskTitle: {
		fontSize: 20,
		fontWeight: '600',
	},
	checkbox: {
		fontSize: 20,
		alignSelf: "center",
	},
	strike: {
		textDecorationLine: 'line-through',
	},
	delete: {
		height: 25,
		width: 25,
	}
});

export default HomeScreen;