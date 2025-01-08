class apiResponce{
    constructor(statusCode, data, message= "Success" ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message
        this.success = statusCode < 400; // because status codes more than 400 are server or client error, it will return bool value.
    }
}