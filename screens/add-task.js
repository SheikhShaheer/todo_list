import React, { Component} from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

class AddTask extends Component {

	constructor( props ) {

		super(props);

		this.state = {
			title: '',
			description: '',
		}

	}

	setTitle = ( title ) => {
		this.setState({title});
	}

	setDescription = ( description ) => {
		this.setState({description});
	}

	addTask = async () => {

		let title = this.state.title;
		let description = this.state.description;

		if( '' === title || '' === description ) {
			return;
		}

		try {
			let allTasks = [];
			
			let prevTasks = await AsyncStorage.getItem('tasks');    
			if( prevTasks != null ) {
				allTasks = JSON.parse( prevTasks );
			}

			let task = {
				key: allTasks.length,
				title: title,
				description: description,
				completed: false,
				showDescription: false
			}
			allTasks.push( task );
				
			const jsonValue = JSON.stringify(allTasks)
			AsyncStorage.setItem('tasks', jsonValue);
			
			this.setTitle('');
			this.setDescription('');

		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<View style={styles.container} >
				<View style={styles.topView}>
					<Text style={styles.h1} >Add Task</Text>
				</View>
				<View style={styles.midView}>
					<View style={styles.titleFieldContainer}>
                        <TextInput 
							style={styles.titleField} 
							placeholder="Title" 
							onChangeText={(title) => this.setTitle(title) }
							value={this.state.title}
						/>
					</View>
					<View style={styles.titleFieldContainer}>
                        <TextInput 
							style={styles.titleField} 
							placeholder="Description" 
							onChangeText={(description) => this.setDescription(description) }
							value={this.state.description}
						/>
					</View>	
					<View style={styles.addTaskButton}>
						<Button color='teal' title="Add Task" onPress={() => this.addTask() } />
					</View>
				</View>
				<View style={styles.endView}>
					<View style={styles.endViewFirst}></View>
					<View style={styles.endViewSecond}></View>
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
	titleField: {
		width: '100%',
		borderBottomWidth: 1,
		borderColor: '#333',
		fontSize: 20,
	},
	h1: {
		color: '#fff',
		fontSize: 45,
		fontWeight: '700',
	},
	tinyLogo: {
		width: 100,
		height: 100,
	},
	loginButton: {
		width: '80%',
		marginVertical: 20,
	},
	topView: {
		backgroundColor: 'teal',
		height: '30%',
		width: '50%',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 20,
		borderBottomRightRadius: 150,
	},
	midView: {
		height: '45%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	endView: {
		height: '25%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: "row"
	},
	endViewFirst: {
		width: '50%',
		height: '100%',
	},
	endViewSecond: {
		backgroundColor: 'teal',
		height: '100%',
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: 150,
	},
	titleFieldContainer: {
		width: '80%',
		height: '20%',
		marginVertical: 10,
	},
	addTaskButton: {
		width: '80%',
		height: '20%',
		marginVertical: 10,
	},
});

export default AddTask;