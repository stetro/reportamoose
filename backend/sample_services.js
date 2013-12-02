var request = require('request');

var service_url = 'http://localhost:3000/';

var items = [{
    "service_name": "Onnettomuus",
    "description": "Vaaratilanne",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, {
    "service_name": "Hirvi",
    "description": "Vaaratilanne",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, {
    "service_name": "Muu kiireellinen vaaratilanne",
    "description": "Vaaratilanne",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, 


{
    "service_name": "Auraamaton tie",
    "description": "Talvihuolto-ongelma",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Puute urakoitsijan toiminnassa",
    "description": "Talvihuolto-ongelmaa",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Epätasainen tie",
    "description": "Talvihuolto-ongelma",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Liukas tie",
    "description": "Talvihuolto-ongelma",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Peittynyt liikennemerkki",
    "description": "Talvihuolto-ongelma",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Talvihuolto-ongelma",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Tarve ruohonleikkuulle, karsimiselle tai maisemoinnille",
    "description": "Viheralueen huollontarve",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Tukkeutunut katuoja",
    "description": "Viheralueen huollontarve",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Roskaisuus",
    "description": "Viheralueen huollontarve",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Viheralueen huollontarve",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Rikkinäinen tai puuttuva katuvalo",
    "description": "Tien varustelun puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
}, {
    "service_name": "Rikkinäinen tai puuttuva liikennemerkki",
    "description": "Tien varustelun puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
}, {
    "service_name": "Bussipysäkin puute tai vika",
    "description": "Tien varustelun puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
}, {
    "service_name": "Puute urakoitsijan toiminnassa",
    "description": "Tien varustelun puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
}, {
    "service_name": "Levähdysalueen tai parkkipaikan vika tai puute",
    "description": "Tien varustelun puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
}, {
    "service_name": "Tunnelin vika tai puute",
    "description": "Tien varustelun puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Tien varustelun puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
}];

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