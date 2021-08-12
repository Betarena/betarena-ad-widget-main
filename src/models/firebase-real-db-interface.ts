/**
 * This INTERFACE represents the data
 * structure recieved from the Real-Time DB
 * for a specific language location
*/
export interface LanguageParam {
    logo: string                // link (href) to a image location on the web
    cashout: boolean            // wether the widget allows for cash-in-out
    live_stream: boolean        // wether the widget allows for live streamming
    bet_builder: boolean        // wether the widget allows for bet building
    avg_payout: number          // average bookmaker payout
    payout_speed: number        // how fast does the payout happen on this bookemaker
    disclamer: string           // ???
    apps_support: boolean       // wether the application supports other apps or not
    link_for_review: string     // link for the review of the app
    cta_link: string            // call-to-action link for the bookmaker
    cta_link_text: string       // call-to-action text for the bookmaker
    lang: string                // re-emphasizes the language option
}

/**
 * This is the Interface for the data stored
 * on the REAL TIME DB and that is retrieved
 * for the language translation
*/
export interface LanguageTranslation {
    lang: string                // language transation of target country
    payout_speed: string        // language transation for `Payout Speed`
    apps_support: string        // language transation for `App Support`
    avg_payout: string          // language transation for `Avg. Payout`
    cashout: string             // language transation for `Cashout`
    live_stream: string         // language transation for `Live Stream`
    bet_builder: string         // language transation for `Bet Builder`
    disclaimer: string          // language transation for `Disclaimer`
    read_full_review: string    // language transation for `ReadFullReview`
}

/**
 * This is the Interface for the final layout
 * and outline of the passed response to the widget. 
*/
export interface FinalLanguageResponse {
    logo: string            // link (href) to a image location on the web
    cashout: boolean        // wether the widget allows for cash-in-out
    live_stream: boolean    // wether the widget allows for live streamming
    bet_builder: boolean    // wether the widget allows for bet building
    avg_payout: number      // average bookmaker payout
    payout_speed: number    // how fast does the payout happen on this bookemaker
    disclamer: string  
    apps_support: boolean
    link_for_review: string
    cta_link: string
    cta_link_text: string
    lang: LanguageTranslation // re-emphasizes the language option
}

interface Language {
    language: 'es' | 'pt' | 'co' | 'mx' | 'pe' | 'us' | 'mz' | 'ao' | 'de' | 'za' | 'uk' | 'in' | 'sg'
}

export interface BetarenaRealDBStructure {
    collection: string
    collection_2: string
    collection_3: Array<Language> // the selected language for the user based on their location
}

export class BetarenaRealDB {
    collection: string
    collection_2: string
    target_language: string // the selected language for the user based on their location

    constructor(target_language: string) {
        this.collection = 'revolution-20b13'
        this.collection_2 = 'ad_widget_home'
        this.target_language = target_language
    }
}