import {StyleSheet} from 'react-native'
const Styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
	    color: "#1E6BB9",
	    fontSize: 18,
	    fontWeight: "bold",
	    textAlign: "center",
	    textDecorationLine: 'underline',
	    marginTop:20,
	},
	loginText: {
	    color: "#1E6BB9",
	    fontSize: 24,
	    fontWeight: "bold",
	    textAlign: "center",
	    marginTop:20,
	    width:280
	},
	inputStyle:{
	    padding:3,
	    marginTop:10,
	    paddingLeft:10,
	    paddingRight:10,
	    backgroundColor:'white',
	    borderRadius:5,
	    borderWidth: 1,
    	borderColor: '#1E6BB9',
    	width:280,
        color:'#3A3A3A',
        height: 40,
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center'
	  },
   
    buttonBg:{
    	borderRadius: 20,
	    alignContent: 'center',
	    width:280,
	    alignSelf: 'center',
	    backgroundColor:'#1E6BB9',
	    marginTop: 10,
	    flexDirection:'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    padding:10,
	    textAlign: 'center'

	},
	signupBg:{
	    alignContent: 'center',
	    alignSelf: 'center',
	    marginTop: 10,
	    flexDirection:'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexWrap:'wrap'

	},
	buttonText:{
		color:"white",
		fontSize:14,
		textAlign: 'center',
	    fontWeight: "bold",
	    marginTop:3,
	    alignItems: 'center',
	    width:280

	}
})
export {Styles}
