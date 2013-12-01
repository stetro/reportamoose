var request = require('request');

var service_url = 'http://localhost:3000/';

var items = [{
    "service_name": "Onnettomuus",
    "description": "Onnettomuus",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, {
    "service_name": "Hirvi",
    "description": "Hirvi",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, {
    "service_name": "Muu kiireellinen vaaratilanne",
    "description": "Muu kiireellinen vaaratilanne",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, {
    "service_name": "Auraamaton tie",
    "description": "Auraamaton tie",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Puute urakoitsijan toiminnassa",
    "description": "Puute urakoitsijan toiminnassa",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Epätasainen tie",
    "description": "Epätasainen tie",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Liukas tie",
    "description": "Liukas tie",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Peittynyt liikennemerkki",
    "description": "Peittynyt liikennemerkki",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Muu",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "snow",
    "metadata": true
}, {
    "service_name": "Tarve ruohonleikkuulle, karsimiselle tai maisemoinnille",
    "description": "Tarve ruohonleikkuulle, karsimiselle tai maisemoinnille",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Tukkeutunut katuoja",
    "description": "Tukkeutunut katuoja",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Roskaisuus",
    "description": "Roskaisuus",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Muu",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
},




 {
    "service_name": "Rikkinäinen tai puuttuva katuvalo",
    "description": "Rikkinäinen tai puuttuva katuvalo",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
},
 {
    "service_name": "Rikkinäinen tai puuttuva liikennemerkki",
    "description": "Rikkinäinen tai puuttuva liikennemerkki",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
},
 {
    "service_name": "Bussipysäkin puute tai vika",
    "description": "Bussipysäkin puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
},
 {
    "service_name": "Puute urakoitsijan toiminnassa",
    "description": "Puute urakoitsijan toiminnassa",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
},
 {
    "service_name": "Levähdysalueen tai parkkipaikan vika tai puute",
    "description": "Levähdysalueen tai parkkipaikan vika tai puute",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
},
 {
    "service_name": "Tunnelin vika tai puute",
    "description": "Tunnelin vika tai puute",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
},
 {
    "service_name": "Muu",
    "description": "Muu",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "light",
    "metadata": true
}




];

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

process.stdout.write("Saving: ");