import React, { Component} from "react";
import { View, StyleSheet, Image, Button, Text } from "react-native";

class LandingPage extends Component {
    constructor ( props ) {

		super(props);

		this.state = {
			username: '',
			password: '',
		}

	}

	render() {
		return (
			<View style={styles.container} >
				<View style={styles.topView}>
                    <Text style={styles.h1} >TODO LIST</Text>
                </View>
				<View style={styles.midView}>
                <Image style={styles.logo} source={require('../assets/home-vector.jpg')} />
				</View>
				<View style={styles.endView}>
					<View style={styles.getStartedButton}>
						<Button title="Get Started" color='teal' onPress={ () => this.props.navigation.navigate('Home') } />
					</View>
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
	logo: {
		width: '100%',
		height: '90%',
	},
	topView: {
		height: '20%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',	
    },
	midView: {
        height: '50%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	endView: {
		height: '30%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
    h1: {
		color: 'teal',
		fontSize: 40,
		fontWeight: '700',
	},
	getStartedButton: {
        width: '80%',
		marginVertical: 10,
	},
});

export default LandingPage;