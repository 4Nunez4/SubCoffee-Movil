import ApiManager from "./Apimanager";

export const user_login = async data => {
    try{    
    const result = await ApiManager("/auth/login",{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        data: data,
    });
    return result;

    }catch(error){
        return error.response.data
    }
}





