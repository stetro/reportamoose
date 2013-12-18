var request = require('request');

var service_url ='http://stetro.ursa.uberspace.de/';
var items = [{
    "service_name": "Onnettomuus",
    "description": "Tiedota akuutista ongelmasta tiellä, hätätilanteessa soita aina ensin 112.",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, {
    "service_name": "Hirvi lähistöllä",
    "description": "Tiedota akuutista ongelmasta tiellä, hätätilanteessa soita aina ensin 112.",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, 
{
    "service_name": "Ruuhka",
    "description": "Tiedota akuutista ongelmasta tiellä, hätätilanteessa soita aina ensin 112.",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "danger",
    "metadata": true
}, 
{
    "service_name": "Muu kiireellinen vaaratilanne",
    "description": "Tiedota akuutista ongelmasta tiellä, hätätilanteessa soita aina ensin 112.",
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
}, 

{
    "service_name": "Tarve ruohonleikkuulle, karsimiselle tai maisemoinnille",
    "description": "Viheralueen huollontarve",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "tree",
    "metadata": true
}, {
    "service_name": "Tukkeutunut katuoja",
    "description": "Viheralueen huollontarve",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "tree",
    "metadata": true
}, {
    "service_name": "Roskaisuus",
    "description": "Viheralueen huollontarve",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "tree",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Viheralueen huollontarve",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "tree",
    "metadata": true
}, 

{
    "service_name": "Rikkinäinen tai puuttuva katuvalo",
    "description": "Katuvalon, liikennemerkin tai muun tien varustelun puute",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Rikkinäinen tai puuttuva liikennemerkki",
    "description": "Katuvalon, liikennemerkin tai muun tien varustelun puute",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Bussipysäkin puute tai vika",
    "description": "Katuvalon, liikennemerkin tai muun tien varustelun puute",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Puute urakoitsijan toiminnassa",
    "description": "Katuvalon, liikennemerkin tai muun tien varustelun puute",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Levähdysalueen tai parkkipaikan vika tai puute",
    "description": "Katuvalon, liikennemerkin tai muun tien varustelun puute",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Tunnelin vika tai puute",
    "description": "Katuvalon, liikennemerkin tai muun tien varustelun puute",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Katuvalon, liikennemerkin tai muun tien varustelun puute",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "traffic",
    "metadata": true
},


, {
    "service_name": "Huollontarve",
    "description": "Soratien vaurio",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "gravelroad",
    "metadata": true
}, {
    "service_name": "Kelirikko tai rakenteen korjaustarve",
    "description": "Soratien vaurio",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "gravelroad",
    "metadata": true
}, {
    "service_name": "Puute urakoitsijan toiminnassa",
    "description": "Soratien vaurio",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "gravelroad",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Soratien vaurio",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "gravelroad",
    "metadata": true
}


, {
    "service_name": "Huonokuntoinen asfaltti",
    "description": "Asfalttitien vaurio",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Vahingoittunut tien rakenne",
    "description": "Asfalttitien vaurio",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Vahingoittunut tien merkintä",
    "description": "Asfalttitien vaurio",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Puute urakoitsijan toiminnassa",
    "description": "Asfalttitien vaurio",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Asfalttitien vaurio",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "road",
    "metadata": true
}



, {
    "service_name": "Sillan puute tai vika",
    "description": "Sillan, lautan tai laiturin puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "waves",
    "metadata": true
}, {
    "service_name": "Lautan puute",
    "description": "Sillan, lautan tai laiturin puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "waves",
    "metadata": true
}, {
    "service_name": "Laiturin puute tai vika",
    "description": "Sillan, lautan tai laiturin puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "waves",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Sillan, lautan tai laiturin puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "waves",
    "metadata": true
}


, {
    "service_name": "Pysäkin toimimattomuus",
    "description": "Julkisen liikenteen toiminnan puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "bus",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Julkisen liikenteen toiminnan puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "bus",
    "metadata": true
}

, {
    "service_name": "Puute tai vika tienkäyttäjän palveluissa",
    "description": "Puute tai vika tienkäyttäjän palveluissa",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "wc",
    "metadata": true
}
, {
    "service_name": "Muu",
    "description": "Puute tai vika tienkäyttäjän palveluissa",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "wc",
    "metadata": true
}

, {
    "service_name": "Tienkäyttäjän huono käytös",
    "description": "Muu liikenteen puute tai vika",
    "type": "realtime",
    "keywords": "some keywords",
    "group": "dots",
    "metadata": true
}, {
    "service_name": "Muu",
    "description": "Muu liikenteen puute tai vika",
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
