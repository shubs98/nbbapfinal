"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('mongodb'), MongoClient = _a.MongoClient, ObjectId = _a.ObjectId;
var uri = "mongodb+srv://jeroen:DB_password@cluster0.l80su.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var client = new MongoClient(uri, { useUnifiedTopology: true });
//  INIT & SETUP
var fetch = require('node-fetch');
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
//app.set('port', 3000);
// Heroku
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/public/', express.static('./public'));
var OndernemingenInDB = [];
var bedrijven = [
    {
        name: "IT bedrijf 200",
        address: "Computerstraat 12",
        datumNeerlegging: "10-20-2020",
        eigenVermogen: 0,
        schulden: 0,
        bedrijfsWinst: 0,
        rubrics: {
            code: "",
            value: 0,
            period: "",
            datatype: "",
            typeamout: ""
        },
        eigenVermogenKleur: "green",
        schuldenKleur: "black",
        bedrijfsWinstKleur: "yellow"
    },
    {
        name: "IT bedrijf 2",
        address: "Pcstraat 42b",
        datumNeerlegging: "02-01-2021",
        eigenVermogen: 0,
        schulden: 0,
        bedrijfsWinst: 0,
        rubrics: {
            code: "",
            value: 0,
            period: "",
            datatype: "",
            typeamout: ""
        },
        eigenVermogenKleur: "blue",
        schuldenKleur: "brown",
        bedrijfsWinstKleur: "black"
    }
];
//  ROUTES
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render('index');
        return [2 /*return*/];
    });
}); });
app.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var woord, onderneming1, onderneming2, onderneming1Cijfers, onderneming2Cijfers, headerOptions, url, url2, promise1, promise2, nummerOnderneming1, nummerOnderneming2, headers, url3, url4, promise3, promise4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                woord = "origineel";
                onderneming1 = {};
                onderneming2 = {};
                onderneming1Cijfers = {};
                onderneming2Cijfers = {};
                headerOptions = {
                    'Accept': 'application/json',
                    'NBB-CBSO-Subscription-Key': '091539ea0adb414d9eb51977a6afd3a8',
                    'X-Request-Id': ''
                };
                url = "https://ws.uat2.cbso.nbb.be/authentic/legalEntity/".concat(req.body.ondernemingsnummer1, "/references");
                url2 = "https://ws.uat2.cbso.nbb.be/authentic/legalEntity/".concat(req.body.ondernemingsnummer2, "/references");
                return [4 /*yield*/, fetch(url, { headers: headerOptions }).then(function (response) { return response.json(); })];
            case 1:
                promise1 = _a.sent();
                ;
                return [4 /*yield*/, fetch(url2, { headers: headerOptions }).then(function (response) { return response.json(); })];
            case 2:
                promise2 = _a.sent();
                ;
                //----------------------------
                onderneming1 = promise1[0];
                bedrijven[0].name = "".concat(onderneming1.EnterpriseName);
                bedrijven[0].address = "".concat(onderneming1.Address.Street, " ").concat(onderneming1.Address.Number, " ").concat(onderneming1.Address.City);
                bedrijven[0].datumNeerlegging = "".concat(onderneming1.DepositDate);
                onderneming2 = promise2[0];
                bedrijven[1].name = "".concat(onderneming2.EnterpriseName);
                bedrijven[1].address = "".concat(onderneming2.Address.Street, " ").concat(onderneming2.Address.Number, " ").concat(onderneming2.Address.City);
                bedrijven[1].datumNeerlegging = "".concat(onderneming2.DepositDate);
                nummerOnderneming1 = onderneming1.ReferenceNumber;
                nummerOnderneming2 = onderneming2.ReferenceNumber;
                headers = {
                    'Accept': 'application/x.jsonxbrl',
                    'NBB-CBSO-Subscription-Key': '091539ea0adb414d9eb51977a6afd3a8',
                    'X-Request-Id': ''
                };
                url3 = "https://ws.uat2.cbso.nbb.be/authentic/deposit/".concat(nummerOnderneming1, "/accountingData");
                url4 = "https://ws.uat2.cbso.nbb.be/authentic/deposit/".concat(nummerOnderneming2, "/accountingData");
                promise3 = fetch(url3, { headers: headers }).then(function (response) { return response.json(); });
                ;
                promise4 = fetch(url4, { headers: headers }).then(function (response) { return response.json(); });
                ;
                Promise.all([promise3, promise4])
                    .then(function (json) {
                    //  onderneming 1 cijfers toekennen aan het object
                    var onderneming1Cijfers = json[0];
                    for (var i = 0; i < onderneming1Cijfers.Rubrics.length; i++) {
                        if (onderneming1Cijfers.Rubrics[i].Code == '10/15' && onderneming1Cijfers.Rubrics[i].Period === 'N') {
                            bedrijven[0].eigenVermogen = onderneming1Cijfers.Rubrics[i].Value;
                        }
                        if (onderneming1Cijfers.Rubrics[i].Code == '42/48' && onderneming1Cijfers.Rubrics[i].Period === 'N') {
                            bedrijven[0].schulden = onderneming1Cijfers.Rubrics[i].Value;
                        }
                        if (onderneming1Cijfers.Rubrics[i].Code == '14' && onderneming1Cijfers.Rubrics[i].Period === 'N') {
                            bedrijven[0].bedrijfsWinst = onderneming1Cijfers.Rubrics[i].Value;
                        }
                    }
                    //  onderneming 2 cijfers toekenne aan het object
                    //  periode 'N' pakken en NIET 'nm1'
                    var onderneming2Cijfers = json[1];
                    for (var i = 0; i < onderneming2Cijfers.Rubrics.length; i++) {
                        if (onderneming2Cijfers.Rubrics[i].Code == '10/15' && onderneming2Cijfers.Rubrics[i].Period === 'N') {
                            bedrijven[1].eigenVermogen = onderneming2Cijfers.Rubrics[i].Value;
                        }
                        if (onderneming2Cijfers.Rubrics[i].Code == '42/48' && onderneming2Cijfers.Rubrics[i].Period === 'N') {
                            bedrijven[1].schulden = onderneming2Cijfers.Rubrics[i].Value;
                        }
                        if (onderneming2Cijfers.Rubrics[i].Code == '14' && onderneming2Cijfers.Rubrics[i].Period === 'N') {
                            bedrijven[1].bedrijfsWinst = onderneming2Cijfers.Rubrics[i].Value;
                        }
                    }
                    (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var ondernemingenCollection, gegevens, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, 4, 6]);
                                    return [4 /*yield*/, client.connect()];
                                case 1:
                                    _a.sent();
                                    ondernemingenCollection = client.db("ITproject").collection("Ondernemingen");
                                    gegevens = [
                                        {
                                            name: bedrijven[0].name,
                                            address: bedrijven[0].address,
                                            datumNeerlegging: bedrijven[0].datumNeerlegging,
                                            eigenVermogen: bedrijven[0].eigenVermogen,
                                            schulden: bedrijven[0].schulden,
                                            bedrijfsWinst: bedrijven[0].bedrijfsWinst
                                        },
                                        {
                                            name: bedrijven[1].name,
                                            address: bedrijven[1].address,
                                            datumNeerlegging: bedrijven[1].datumNeerlegging,
                                            eigenVermogen: bedrijven[1].eigenVermogen,
                                            schulden: bedrijven[1].schulden,
                                            bedrijfsWinst: bedrijven[1].bedrijfsWinst
                                        }
                                    ];
                                    return [4 /*yield*/, ondernemingenCollection.insertMany(gegevens)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 3:
                                    e_1 = _a.sent();
                                    console.error(e_1);
                                    res.render('error');
                                    return [3 /*break*/, 6];
                                case 4: return [4 /*yield*/, client.close()];
                                case 5:
                                    _a.sent();
                                    return [7 /*endfinally*/];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })();
                    res.render('vergelijking', { bedrijven: bedrijven });
                })
                    .catch(function (err) {
                    console.log('Er is een foutmelding opgetreden: ' + err.message);
                    res.render('error');
                });
                return [2 /*return*/];
        }
    });
}); });
app.get('/about', function (req, res) {
    res.render('about');
});
app.get('/contact', function (req, res) {
    res.render('contact');
});
app.get('/history', function (req, res) {
    //let bedrijvenInDB: OndernemingVoorDB[] = [];
    var leesDB = function () { return __awaiter(void 0, void 0, void 0, function () {
        var ondernemingenCollection, allOndernemingen, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    ondernemingenCollection = client.db("ITproject").collection("Ondernemingen");
                    return [4 /*yield*/, ondernemingenCollection.find({}).toArray()];
                case 2:
                    allOndernemingen = _a.sent();
                    OndernemingenInDB = allOndernemingen;
                    return [3 /*break*/, 6];
                case 3:
                    e_2 = _a.sent();
                    console.error(e_2);
                    res.render('error');
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6:
                    res.render('history', { bedrijvenInDB: OndernemingenInDB });
                    return [2 /*return*/];
            }
        });
    }); };
    leesDB();
});
app.get('/removehistory', function (req, res) {
    var removeHistory = function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, client.db("ITproject").collection("Ondernemingen").deleteMany({})];
                case 2:
                    _a.sent();
                    console.log("History Removed");
                    return [3 /*break*/, 6];
                case 3:
                    e_3 = _a.sent();
                    console.error(e_3);
                    res.render('error');
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    removeHistory();
    res.render('history', { bedrijvenInDB: [] });
});
//  AP STARTUP
app.listen(app.get('port'), function () { return console.log("[server] http://localhost:" + app.get('port')); });
//  last
app.use(function (req, res) {
    res.status(404).render('index');
});
