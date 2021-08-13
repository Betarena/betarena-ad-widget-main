<!-- 
~~~~~~~~~~~~
	COMPONENT JS (w/ TS)
~~~~~~~~~~~~
-->

<script lang="ts">
    import {
        getUserLanguageLocationDB,
        getUserTranslation,
        getUserLocation
    } from '../functions/index'
    
    import type {
        LanguageParam,
        LanguageTranslation,
        FinalLanguageResponse
    } from "../models/firebase-real-db-interface"; 

    /**
     * Function / Method
     * Description:
     * Intializer of the Widget Function
     * 
     * Returns INTERFACE - `LanguageParam`
    */
    async function widgetInit(): Promise<FinalLanguageResponse> {
        // determine the users location:
        let userGeoInfo = await getUserLocation()
        // retrieve the appropiate information from the DB:
        let db_real_data = await getUserLanguageLocationDB(userGeoInfo)
        // retrive the appropiate countyr code translation based on DB data:
        let db_real_data_translation = await getUserTranslation(db_real_data)
        // append the translation to the data;
        let finalLanguageResponse: FinalLanguageResponse = {
            ...db_real_data,
            lang: db_real_data_translation
        }
        // console.info('final-response', finalLanguageResponse)
        
        return finalLanguageResponse
    }


    let promise = widgetInit()
</script>

<!-- 
~~~~~~~~~~~~~~~~~~~~
MOBILE FIRST -->
<style>
    /*
    ~~~~~~~~~~~~~~~~~~~~
    widget-container-style
    */
    #ad_widget_betarena {
        /* width: calc(100vw / 1.09329446064); */
        /* height: calc(100vw / 0.95663265306); */
        width: 100%;
        height: 100%;
        max-width: 343px;
        max-height: 392px;
        /* 
        constant-properties */
        display: grid;
        background: #FFFFFF;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        overflow: hidden;
        margin: auto;
    }
    #ad_widget_betarena img#booker-logo {
        /* width: inherit; */
        /* height: calc(100vw / 3.98936170213); */
        object-fit: cover;
        width: 343px;
        height: 94px;
    }
    /*
    ~~~~~~~~~~~~~~~~~~~~
    further-quick-info
    */
    #further-quick-info {
        /* padding: calc(100vw / 18.75); */
        padding: 24px 20px;
    }
    .info-box {
        display: grid;
        align-items: end;
        justify-content: space-evenly;
        justify-items: start;
        align-content: stretch;
        /* height: calc(100vw / 8.33333333333); */
        height: 45px;
    }
    img.device-support {
        /* width: calc(100vw / 24.7851949769); */
        /* margin-right: calc(100vw / 44.6960667461); */
        height: auto;
        margin-right: 8.39px;
        width: 15.13px;
        /* height: 17.89px; */
    }
    img.checkmark {
        height: auto;
        /* width: calc(100vw / 22.0458553792); */
        /* margin: 0 calc(100vw / 39.3907563025) 0 0; */
        width: 17.01px;
        margin: 0 9.52px 0 0;
    }
    /*
    ~~~~~~~~~~~~~~~~~~~~
    promotion-CTA-box
    */
    #promotion-info-box {
        /* padding: calc(100vw / 18.75); */
        padding: 20px;
        /* 
        constant-properties */
        background: #FFFFFF;
        box-shadow: inset 0px 1px 0px #EBEBEB;
        display: grid;
        text-align: center;
    }
</style>

<!-- 
~~~~~~~~~~~~
	COMPONENT HTML
~~~~~~~~~~~~
-->

{#await promise}
    <p>... Loading Widget ...</p>
    
{:then data}
    <div id='ad_widget_betarena'>
        <!--
        matchbetting-logo -->
        <img 
            src={data.logo}
            alt=""
            id='booker-logo'
        />
        <div id='further-quick-info'>
            <!-- 
            further-analytics-info -->
            <div class='row' style='margin-bottom: 21px; height: 45px;'>
                <div class='info-box'>
                    <p class='large' style='color: var(--primary);'>{ data.avg_payout } %</p>
                    <p class='medium'>{data.lang.avg_payout}</p>
                </div>
                <div class='info-box'>
                    <p class='large' style='color: #68D77A'>{ data.payout_speed }</p>
                    <p class='medium'>{data.lang.payout_speed}</p>
                </div>
                {#if data.apps_support}
                    <div class='info-box'>
                        <div class='row'>
                            <img 
                            src='./static/BetArena - Working/icon/android.svg'
                            alt=''
                                class='device-support'
                            />
                            <img 
                                src='./static/BetArena - Working/icon/apple.svg'
                                alt=''
                                class='device-support'
                            />
                            <img 
                                src='./static/BetArena - Working/icon/chrome-colored.svg'
                                alt=''
                                class='device-support'
                            />
                        </div>
                        <p class='medium'>{data.lang.apps_support}</p>
                    </div>
                {/if}
            </div>
            <!-- 
            validation-row-further-info -->
            <div class='row'>
                {#if data.cashout}
                    <div class='row'>
                        <img
                            src='./static/BetArena - Working/icon/􀁣.svg'
                            alt=''
                            class='checkmark'
                        />
                        <p class='small'>{ data.lang.cashout }</p>
                    </div>
                {/if}
                {#if data.live_stream}
                    <div class='row'>
                        <img
                            src='./static/BetArena - Working/icon/􀁣.svg'
                            alt=''
                            class='checkmark'
                        />
                        <p class='small'>{ data.lang.live_stream }</p>
                    </div>
                {/if}
                {#if data.bet_builder}
                    <div class='row'>
                        <img
                            src='./static/BetArena - Working/icon/􀁣.svg'
                            alt=''
                            class='checkmark'
                        />
                        <p class='small'>{ data.lang.bet_builder }</p>
                    </div>
                {/if}
            </div>
        </div>
        <!-- 
        promotion-info-container -->
        <div id='promotion-info-box'>
            <p class='small' style='margin-bottom: 12px;'>
                { data.lang.disclaimer }
            </p>
            <button class='btn-primary' style='margin-bottom: 20px;'>
                <p class='medium'>
                    Get 500$ bonus
                </p>
            </button>
            <a href="/">
                <p class='medium' style='color: var(--primary); font-weight: 500;'>
                    { data.lang.read_full_review } >
                </p>
            </a>
        </div>
    </div>
    
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}