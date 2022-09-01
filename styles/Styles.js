import { StyleSheet ,Dimensions} from "react-native";

const win = Dimensions.get("screen")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop : win.height/2.5
  },
  bg:{
    backgroundColor : 'white',
    height : win.height
  },  
  viewPager: {
    flex: 1,
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
   },
   padded:{
    paddingBottom : 30
   },
  input:{
    width: win.width/1.5,
    color: 'lightgray',
    height: 20,
    backgroundColor : 'white'
  },
  inp:{
    width: win.width/1.3,
    color: 'lightgray',
    paddingHorizontal: 10,
    paddingVertical : 12,
    backgroundColor : 'white',
    width: "100%"
  },
  desc:{
    color : 'white',
    fontSize : 20,
    paddingBottom : 30,
    paddingTop : win.height/10
  },
  qrtitle:{
    fontWeight : 'bold',
    color: 'black',
    textAlign : 'center',
    fontSize : 30, 
    paddingBottom : 10
  },
  full:{
    height :win.height,
    width:win.width,
    paddingTop : win.height/15,
    backgroundColor : 'white'
  },
  qrcont:{
    backgroundColor :'white',
    padding : 30
  },
  qrarea:{
    height :win.height,
    width:win.width,
    paddingTop : win.height/15,
    backgroundColor : 'cornflowerblue',
    alignItems : 'center'
  },
  divider:{
    backgroundColor: 'darkgray',
    height : 0.4
  },
  page: {
    height :win.height,
    width:win.width,
    backgroundColor : 'cornflowerblue'    
  },
 list:{
    margin: 15,
    backgroundColor: 'white',
    borderRadius :  10/2
  },
  introtop:{
    padding: 20
  },
  skip:{
    fontSize:20,
    textAlign : "right",
    color:'white'
  },
  introtext: {
    fontWeight : 'bold',
    fontSize : 26
  },
  introsub:{
    paddingBottom:12
  },
  dot:{
    textAlign : 'center',
    paddingBottom:20
  },
  button:{
    backgroundColor : 'cornflowerblue',
    paddingVertical : 12,
    borderRadius:40/2
  },
  imgview:{
    alignSelf: 'center',
    paddingTop: win.height/6
  },
  introimg:{
    width:win.width/1.5,
    height : win.height/3,
  },
  btntxt:{
    textAlign:'center',
    color: 'white'
  },
  introdetail:{
    backgroundColor :'white',
    borderRadius : 40/2,
    position:'absolute',
    bottom : 0,
    padding: 20,
    height : win.height/3.7,
    width : win.width
  },
  overlay: {
    position:"absolute",
    width:"100%",
    height:"100%",
    backgroundColor:"rgba(0,0,0,0.3)",
    alignItems:"center",
    justifyContent:"center",
    top:20
  },
  round: {
    width:200,
    height:200,
    borderRadius:10,
    borderWidth:3,
    borderStyle:"dashed"
  },
  modal: {
    width:300,
    maxWidth:"95%",
    height:200,
    padding:15,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
    borderRadius:10,
    alignSelf :'center',
    marginTop : win.height /5
  },
  message: {
    height:100,
    width:"100%",
    backgroundColor:"white",
    position:"absolute",
    paddingTop:30,
    top:0,
    alignItems:"center",
    justifyContent:"center"
  },
  bottom: {
    position : 'absolute', 
   
  }

});
  export default styles