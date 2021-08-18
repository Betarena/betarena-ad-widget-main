import { get } from '../api/utils'

import { 
    db,
    db_real 
} from '../firebase/index'

// import { collectionData } from 'rxfire/firestore';
// import { startWith } from 'rxjs/operators';

import type { 
    GeoJsResponse
} from "../models/geo-js-interface";

import type {
    LanguageParam,
    LanguageTranslation,
    FinalLanguageResponse
} from "../models/firebase-real-db-interface"; 


/**
 * A simple quick & easy function
 * to populate the DB with data,
 * [ONE TIME - DISPOISABLE - DEV ONLY]
 */
export function writeData() {
    // example data writing;

    let languageArr = [
        ['default', 'en'],
        ['es', 'es'],
        ['pt', 'pt'],
        ['co', 'es'],
        ['mx', 'es'],
        ['pe', 'es'],
        ['ke', 'en'],
        ['us', 'en'],
        ['mz', 'pt'],
        ['ao', 'pt'],
        ['de', 'en'],
        ['za', 'en'],
        ['uk', 'en'],
        ['in', 'en'],
        ['sg', 'en']
    ]
    languageArr.forEach(lang => {
        let data: LanguageParam = {
            logo: 'https://seeklogo.com/images/B/betano-logo-9D8AC1F4E0-seeklogo.com.png',
            cashout: true,
            live_stream: false,
            bet_builder: true,
            avg_payout: 94.25,
            payout_speed: 14,
            disclamer: "T&Cs",
            apps_support: true,
            link_for_review: '',
            cta_link: '',
            cta_link_text: 'join now',
            lang: lang[1]
        }
        // write the data to the `real-db`;
        db_real.ref('ad_widget_home/' + lang[0]).set(data)
        // console.info('Data for' + `${lang}` + 'Written!')
    });

    let translationArr: Array < LanguageTranslation > = [{
            lang: 'br',
            payout_speed: 'Velocidade de pagamento',
            apps_support: 'Suporte de aplicativos',
            avg_payout: 'Pagamento médio',
            cashout: 'Saque',
            live_stream: 'Transmissão ao vivo',
            bet_builder: 'Construtor de apostas',
            disclaimer: 'Abra uma conta na bet365 hoje e aposte em uma grande variedade de mercados',
            read_full_review: 'Leia a crítica completa'
        },
        {
            lang: 'en',
            payout_speed: 'Payout speed',
            apps_support: 'Apps support',
            avg_payout: 'AVG. Payout',
            cashout: 'Cashout',
            live_stream: 'Live stream',
            bet_builder: 'Bet builder',
            disclaimer: 'Open an account with bet365 today and bet on a huge range of markets',
            read_full_review: 'Read full review'
        },
        {
            lang: 'es',
            payout_speed: 'Velocidad de pago',
            apps_support: 'Soporte de aplicaciones',
            avg_payout: 'Pago promedio',
            cashout: 'Retiro',
            live_stream: 'Transmisión en vivo',
            bet_builder: 'Constructor de apuestas',
            disclaimer: 'Abra una cuenta con bet365 hoy y apueste en una amplia gama de mercados',
            read_full_review: 'Leer reseña completa'
        },
        {
            lang: 'pt',
            payout_speed: 'Velocidade de pagamento',
            apps_support: 'Suporte de aplicativos',
            avg_payout: 'Pagamento médio',
            cashout: 'Saque',
            live_stream: 'Transmissão ao vivo',
            bet_builder: 'Construtor de apostas',
            disclaimer: 'Abra uma conta na bet365 hoje e aposte em uma grande variedade de mercados',
            read_full_review: 'Leia a crítica completa'
        }
    ];
    translationArr.forEach(element => {
        db_real.ref('ad_widget_home/translations/' + element.lang).set(element)
        // console.info('Translation for' + `${element.lang}` + 'Written!')
    });
}


/**
 * Function / Method
 * Description:
 * Obtain the data from the `real_db` firebase DB
 * according to the users current geo-location
 * 
 * @param userGeoLocation
 */
export async function getUserLanguageLocationDB(userGeoLocation: GeoJsResponse): Promise < LanguageParam > {
    // extract the user location data country code;
    let userCountryCode = userGeoLocation.country_code
    // console.info('userCountryCode', userCountryCode)

    return db_real.ref().child('ad_widget_home').child(userCountryCode.toLowerCase()).get().then((snapshot) => {

        // if language code was not found, use the default;
        if (!snapshot.exists()) {
            return db_real.ref().child('ad_widget_home').child('default').get().then((snapshot) => {
                
                // console.info('getting-default-data from the REAL-DB', snapshot.val())
                return snapshot.val()
            })
        } else if (snapshot.exists()) {
            // else, return the country code data;
            // console.info('data from Real DB', snapshot.val())
            return snapshot.val()
        } else {
            throw new Error('Network response was not ok');
        }
    })
}


/**
 * Function / Method
 * Description:
 * Obtains the users language location
 * and appends the correct translation to the
 * response;
 * 
 * @param userLanguageLoc
 * 
 * Retunrns:
 * @promise
 */
export async function getUserTranslation(userLanguageLoc: LanguageParam): Promise < LanguageTranslation > {
    // extract the user location language code;
    
    let userCountryLanguage = userLanguageLoc.lang
    // console.info('userCountryLanguage', userCountryLanguage)

    // decalre target DB location;
    let db_ref = db_real.ref().child('ad_widget_home').child('translations')

    return db_ref.child(userCountryLanguage).get().then((snapshot) => {

        // if language code was not found, use the default;
        if (!snapshot.exists()) {
            throw new Error('Network response was not ok');
        }
        // else, return the country code data;
        // console.info('data from Real DB', snapshot.val())
        return snapshot.val()
    })
}


/**
 * Function / Method
 * Description:
 * Checks for the users location
 * and stores it for future use
 */
export async function getUserLocation(): Promise < GeoJsResponse > {
    const response = await get(`https://get.geojs.io/v1/ip/geo.json`)
    // console.info('GoeJS Response', response)
    return response
}