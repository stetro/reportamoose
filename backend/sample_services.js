var request = require('request');

var service_url ='http://stetro.ursa.uberspace.de/';
var items = [{
    "service_name": "Accident",
    "description": "Warning to other road users.",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, {
    "service_name": "A moose near a road",
    "description": "Warning to other road users.",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, 
{
    "service_name": "Other urgent danger",
    "description": "Tiedota akuutista ongelmasta tiellä, hätätilanteessa soita aina ensin 112.",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, 


{
    "service_name": "Unploughed street/road",
    "description": "Winter care issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Contractor activity issue",
    "description": "Winter care issuea",
    "type": "realtime", 
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Uneven street/road",
    "description": "Winter care issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Slippery street/road",
    "description": "Winter care issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Invisible street sign",
    "description": "Winter care issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Other",
    "description": "Winter care issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, 

{
    "service_name": "A need for mowing, landscaping, clearing etc.",
    "description": "Green space issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "tree",
    "metadata": true
}, {
    "service_name": "Culvert or ditch issue",
    "description": "Green space issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "tree",
    "metadata": true
}, {
    "service_name": "Grubbiness",
    "description": "Green space issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "tree",
    "metadata": true
}, {
    "service_name": "Other",
    "description": "Green space issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "tree",
    "metadata": true
}, 

{
    "service_name": "Broken or missing lighting",
    "description": "Road equipment issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Broken or missing traffic lights, road signs etc.",
    "description": "Road equipment issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Bus stop issue",
    "description": "Road equipment issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Contractor activity issue",
    "description": "Road equipment issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Rest area or parking lot issue",
    "description": "Road equipment issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Tunnel issue",
    "description": "Road equipment issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Other",
    "description": "Road equipment issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
},


, {
    "service_name": "A need for maintenance",
    "description": "Gravel road issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "gravelroad",
    "metadata": true
}, {
    "service_name": "Thaw or need for structural improvement",
    "description": "Gravel road issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "gravelroad",
    "metadata": true
}, {
    "service_name": "Contractor activity issue",
    "description": "Gravel road issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "gravelroad",
    "metadata": true
}, {
    "service_name": "Other",
    "description": "Gravel road issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "gravelroad",
    "metadata": true
}


, {
    "service_name": "Bad paving condition",
    "description": "Paving condition, road construction or road marking issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Damaged road structure",
    "description": "Paving condition, road construction or road marking issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Damaged road marking",
    "description": "Paving condition, road construction or road marking issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Contractor activity issue",
    "description": "Paving condition, road construction or road marking issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Other",
    "description": "Paving condition, road construction or road marking issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}



, {
    "service_name": "Bridge issue",
    "description": "Bridge, ferry or dock issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "waves",
    "metadata": true
}, {
    "service_name": "Ferry issue",
    "description": "Bridge, ferry or dock issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "waves",
    "metadata": true
}, {
    "service_name": "Dock issue",
    "description": "Bridge, ferry or dock issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "waves",
    "metadata": true
}


, {
    "service_name": "Public transport stop malfunctionality",
    "description": "Public transport issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "bus",
    "metadata": true
}, {
    "service_name": "Other",
    "description": "Public transport issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "bus",
    "metadata": true
}

, {
    "service_name": "Other",
    "description": "Services",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "wc",
    "metadata": true
}

, {
    "service_name": "Bad road user behavior",
    "description": "Other traffic related issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "dots",
    "metadata": true
}, {
    "service_name": "Other",
    "description": "Other traffic related issue",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "dots",
    "metadata": true
}
];

console.log('deleting all available services ...')
request.get({
    url: service_url + 'services',
    json: true
}, function(error, res, body) {
    if (!error && res.statusCode == 200) {
        for (i in body) {
            request.del({
                url: service_url + 'services/' + body[i]._id,
                json: true
            }, function(error, res, body) {
                process.stdout.write(".");
            });
        }
    } else {
        console.log(error);
    }
});

console.log('deleting all available requests ...')
request.get({
    url: service_url + 'requests',
    json: true
}, function(error, res, body) {
    if (!error && res.statusCode == 200) {
        for (i in body) {
            request.del({
                url: service_url + 'requests/' + body[i]._id,
                json: true
            }, function(error, res, body) {
                process.stdout.write(".");
            });
        }
    } else {
        console.log(res.body);
    }
});


process.stdout.write("Saving New: ");

for (i in items) {
    request.post({
        form: items[i],
        url: service_url + 'services',
        json: true
    }, function(err, res) {
        if (!err && res.statusCode == 200) {
            process.stdout.write(".");
        } else {
            console.log(res.body);
        }
    });
}
