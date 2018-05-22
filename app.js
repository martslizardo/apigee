var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var request=require('request');

// routes will go here

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

app.get('/',function(req,res){
        res.sendFile(__dirname +'/views/index.html');
});

app.all('/:msisdn/brand',function(req,res){
    var data;
    if(req.method=='GET'){
        var msisdn=req.params.msisdn;
        var url='https://polar-inlet-9281.herokuapp.com/brand/'+ msisdn;
        request.get(url,function(error,response,body){
            try {
                var result=JSON.parse(body);
                    if(result.error){
                        data={
                                "fault": 
                                {
                                    "faultstring": "Invalid Parameter",
                                    "detail": {
                                    "errorcode":"40002",
                                    "errormessage": "The request parameter msisdn is invalid." 
                                    },
                                    "moreinfo": "",
                                }
                            };
                        res.status(400);    
                    }else{
                        data={msisdn:msisdn,brand:result.brand};
                    }
                    }catch(e){
                        res.status(400);
                        data={error:"Invalid JSON String"};
                    }
            res.json(data); 
        });
    }else{
        data={"fault":{
                "faultstring": "Unsupported HTTP Method",
                "detail": {
                "errorcode": "40001",
                "errormessage": "The requested operation is not supported.."
                        },
                        "moreinfo": ""
                        }
            };
        res.status(400);
        res.json(data);
    }

})

app.get('//brand',function(req,res){
    res.status(400);
    res.json({"fault":{
            "faultstring": "Insufficient Parameters",
            "detail": {
                "errorcode": "40003",
                "errormessage": "The request is missing a mandatory parameter."

            },
            "moreinfo": ""
            }
        });
});

app.get('*',function(req,res){
    res.status(400);
    res.json({"fault":{
            "faultstring": "Not Found",
            "detail": {
                "errorcode": "40401",
                "errormessage": "The request resource is not found."

            },
            "moreinfo": ""
            }
        });
});

