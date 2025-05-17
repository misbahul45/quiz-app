import Colors from "@/constant/Colors";
import { Platform, StyleSheet } from "react-native";

export const homeStyles=StyleSheet.create({
    container:{
        padding:25,
        paddingTop: Platform.OS === "ios" ? 60 : 40,
        flex:1,
        backgroundColor:'#fff'
    },
    textTitle:{
        fontFamily:'outfit-bold',
        fontSize:24,
    },
    textSubTitle:{
        fontFamily:'outfit-medium',
        fontSize:17
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20
    },
    settings:{
        backgroundColor:Colors.background,
        borderRadius:100,
        padding:10
    },
    noCourseContainer:{
        flex:1,
        marginTop:40,
        justifyContent:'center',
        alignItems:'center'
    },
    noCourseBannerImage:{
        width:200,
        height:200
    },
    noCourseText:{
        fontFamily:'outfit',
        fontSize:20,
        marginTop:20,
        marginBottom:30
    }
})