import {StyleSheet} from 'react-native'
const Styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
