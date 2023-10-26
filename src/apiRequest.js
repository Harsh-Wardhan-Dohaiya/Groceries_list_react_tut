const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try{
        const response = await fetch(url, optionsObj); // optionsObj make the difference between create, update and delete options
        if(!response.ok) throw Error('Please reload the app')
        // State of the application may not be in sync with the database, if we had an error in creating , updating or deleting then we will be out of sync, so reload and we will get the data back and we will be in sync
    } catch (err){
        errMsg = err.message;
    } finally {
        return errMsg;
        // we are just returning if the error message is null or we have some error
        // we don't need to return the response as we are updating the list using setItems rather than fetching from API, we will directly show the change using setItems function and sync the json data using API calls and display error if we get some error
    }
}

export default apiRequest;