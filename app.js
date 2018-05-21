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
app.get('/:msisdn/brand',function(req,res){
    var msisdn=req.params.msisdn;
    var url='https://polar-inlet-9281.herokuapp.com/brand/'+ msisdn;
    request.get(url,function(error,response,body){
        console.log(msisdn);
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        var result=JSON.parse(body);
        var data;
        if(result.error){
            data={
                "fault": {
                     "faultstring": "Invalid Parameter",
                     "detail": {
                           "errorcode":"40002",
                           "errormessage": "The request parameter msisdn is invalid." 
                      },
                       "moreinfo": "",
                   }
                };    
        }else{
            data={msisdn:msisdn,brand:result.brand};
        }
        return res.json(data);
        
    });
    
});

app.get('//brand',function(req,res){
    return res.json({"fault":{
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
    return res.json({"fault":{
            "faultstring": "Not Found",
            "detail": {
                "errorcode": "40401",
                "errormessage": "The request resource is not found."

            },
            "moreinfo": ""
            }
        });
});

app.delete('/:msisdn/brand',function(req,res){
   return res.json({"fault":{
        "faultstring": "Unsupported HTTP Method",
        "detail": {
            "errorcode": "40001",
            "errormessage": "The requested operation is not supported.."

        },
        "moreinfo": ""
        }
    });
});
app.post('/:msisdn/brand',function(req,res){
   return res.json({"fault":{
        "faultstring": "Unsupported HTTP Method",
        "detail": {
            "errorcode": "40001",
            "errormessage": "The requested operation is not supported.."

        },
        "moreinfo": ""
        }
    });
});
app.patch('/:msisdn/brand',function(req,res){
    return res.json({"fault":{
        "faultstring": "Unsupported HTTP Method",
        "detail": {
            "errorcode": "40001",
            "errormessage": "The requested operation is not supported.."

        },
        "moreinfo": ""
        }
    });
});
app.put('/:msisdn/brand',function(req,res){
   return res.json({"fault":{
        "faultstring": "Unsupported HTTP Method",
        "detail": {
            "errorcode": "40001",
            "errormessage": "The requested operation is not supported.."

        },
        "moreinfo": ""
        }
    });
});
