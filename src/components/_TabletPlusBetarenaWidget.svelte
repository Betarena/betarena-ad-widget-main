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

    import ColorThief from 'colorthief'

    /**
     * Function / METHOD
     * ~~~~~~~~~~~~~~~~~~
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
        // let intercept the image URL;
        let imgURL = finalLanguageResponse.logo
        getImageBgColor(imgURL)
        // return the Promise Value
        return finalLanguageResponse
    }
    let promise = widgetInit()

    // declaring a new instance of `ColorThief`;
    const colorThief = new ColorThief();

    /**
     * Function / METHOD
     * ~~~~~~~~~~~~~~~~~~
     * Description:
     * A function-method to obtain the main
     * `primary` color of the image
     * and place it on the background
     * container to keep the image the same size
     * 
     * @param imgURL
    */
    function getImageBgColor(imgURL: string) {
        // instantiate the image Type;
        const img = new Image();
        // listen, event to wait for the image to load
        img.addEventListener('load', function() {
            // get the array of RGB values,
            let colorValues = colorThief.getColor(img)
            // convert the RGB values to HEX value,
            let hexColor = rgbToHex(colorValues[0], colorValues[1], colorValues[2])
            // pass this values as a `CSS :root` variable, accessible to all the website,
            const doc = document.documentElement
			doc.style.setProperty('--logo-bookmaker-bg', `${hexColor}`)
        });
        // declaring the image paramaters & CORS by-pass
        let imageURL = imgURL;
        let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
        img.crossOrigin = 'Anonymous';
        img.src = googleProxyURL + encodeURIComponent(imageURL);
    }

    /**
     * Function / METHOD;
     * ~~~~~~~~~~~~~~~~~~
     * Description:
     * A function-method to convert the
     * [x,a,c] of RBG values to `#HEX` values
     * 
     * @param r
     * @param g
     * @param b
     * @returns (# a singel #HEX-Color Value)
    */
    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')

</script>

<!-- 
~~~~~~~~~~~~~~~~~~~~
TABLED & DESKTOP FIRST -->
<style>
    /*
    ~~~~~~~~~~~~~~~~~~~~
    widget-container-style
    */
    #ad_widget_betarena {
        width: calc(100vw / 1.09714285714);
        height: calc(100vw / 3.91836734694);
        /* 
        constant-properties */
        display: flex;
        background: #FFFFFF;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        overflow: hidden;
        margin: auto;
    }
    #ad_widget_betarena img#booker-logo {
        width: calc(100vw / 5.48571428571);
        height: calc(100vw / 3.91836734694);
        object-fit: contain;
        background-color: var(--logo-bookmaker-bg);
    }
    /* 
    ~~~~~~~~~~~~~~~~~~~~
    tabler-desktop-specific 
    */
    #desktop-container {
        display: grid;
        width: calc(100vw / 1.37142857143);
    }
    /*
    ~~~~~~~~~~~~~~~~~~~~
    further-quick-info
    */
    #further-quick-info {
        height: calc(100vw / 9.14285714286);
        padding: calc(100vw / 38.4);
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        flex-wrap: nowrap;
    }
    .info-box {
        display: grid;
        align-items: end;
        justify-content: space-evenly;
        justify-items: start;
        align-content: stretch;
        height: calc(100vw / 17.4545454545);
        margin-right: calc(100vw / 24);
    } .info-box:not(:first-child) {
        padding-left: calc(100vw / 48);
        border-left: 1px solid #E6E6E6;
    }
    img.device-support {
        width: calc(100vw / 50.7600793126);
        height: auto;
        margin-right: calc(100vw / 91.5375446961);
    }
    .check-box {
        margin-bottom: calc(100vw / 88.9918887601);
    } .check-box:last-child {
        margin-bottom: 0;
    }
    img.checkmark {
        width: calc(100vw / 45.1499118166);
        height: auto;
        margin: 0 calc(100vw / 80.6722689076) 0 0;
    }
    /*
    ~~~~~~~~~~~~~~~~~~~~
    promotion-CTA-box
    */
    #promotion-info-box {
        padding: calc(100vw / 38.4);
        background: #FFFFFF;
        box-shadow: inset 0px 1px 0px #ebebeb;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: space-between;
        align-content: center;
        flex-wrap: nowrap;
    }
    /*
    ~~~~~~~~~~~~~~~~~~~~
    RESPONSIVENESS
    ~~~~~~~~~~~~~~~~~~~~
    */
    /*
    =============================
    DESKTOP (& UP) - 1024px 
    100vw - measured from 1024px */
    @media only screen and (min-width: 1024px) {
        /*
        ~~~~~~~~~~~~~~~~~~~~
        widget-container-style
        */
        #ad_widget_betarena {
            width: calc(100vw / 1.81818181818);
            height: calc(100vw / 7.34693877551);
        }
        #ad_widget_betarena img#booker-logo {
            width: calc(100vw / 10.2857142857);
            height: inherit;
            object-fit: cover;
        }
        /* 
        ~~~~~~~~~~~~~~~~~~~~
        tabler-desktop-specific 
        */
        #desktop-container {
            width: calc(100vw / 2.20858895706);
        }
        /*
        ~~~~~~~~~~~~~~~~~~~~
        further-quick-info
        */
        #further-quick-info {
            height: calc(100vw / 17.1428571429);
            padding: calc(100vw / 72);
        }
        .info-box {
            height: calc(100vw / 32.7272727273);
            margin-right: calc(100vw / 45);
        } .info-box:not(:first-child) {
            padding-left: calc(100vw / 90);
            border-left: 1px solid #E6E6E6;
        }
        img.device-support {
            width: calc(100vw / 95.1751487112);
            height: auto;
            margin-right: calc(100vw / 171.632896305);
        }
        .check-box {
            margin-bottom: calc(100vw / 166.666666667);
        } .check-box:last-child {
            margin-bottom: 0;
        }
        img.checkmark {
            width: calc(100vw / 84.6560846561);
            height: auto;
            margin: 0 calc(100vw / 151.260504202) 0 0;
        }
        /*
        ~~~~~~~~~~~~~~~~~~~~
        promotion-CTA-box
        */
        #promotion-info-box {
            padding: calc(100vw / 72);
        }
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
        <div id='desktop-container'>
            <!-- 
            further-info -->
            <div id='further-quick-info'>
                <!-- 
                further-analytics-info -->
                <div class='row'>
                    <div class='info-box'>
                        <p class='large' style='color: var(--primary);'>{data.avg_payout} %</p>
                        <p class='medium'>{data.lang.avg_payout}</p>
                    </div>
                    <div class='info-box'>
                        <p class='large' style='color: #68D77A'>{data.payout_speed}</p>
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
                CTA-read-more -->
                <a href="/">
                    <p class='small' style='color: var(--primary); font-weight: 500;'>
                        { data.lang.read_full_review } >
                    </p>
                </a>
            </div>
            <!-- 
            promotion-info-container -->
            <div id='promotion-info-box'>
                <!-- 
                validation-row-further-info -->
                <div class='column' style='margin-right: calc(100vw / 12.5901639344);'>
                    {#if data.cashout}
                        <div class='row check-box'>
                            <img
                                src='./static/BetArena - Working/icon/􀁣.svg'
                                alt=''
                                class='checkmark'
                            />
                            <p class='small' style='white-space: nowrap;'>{ data.lang.cashout }</p>
                        </div>
                    {:else}
                        <div/>
                    {/if}
                    {#if data.live_stream}
                        <div class='row check-box'>
                            <img
                                src='./static/BetArena - Working/icon/􀁣.svg'
                                alt=''
                                class='checkmark'
                            />
                            <p class='small' style='white-space: nowrap;'>{ data.lang.live_stream }</p>
                        </div>
                    {:else}
                        <div/>
                    {/if}
                    {#if data.bet_builder}
                        <div class='row check-box'>
                            <img
                                src='./static/BetArena - Working/icon/􀁣.svg'
                                alt=''
                                class='checkmark'
                            />
                            <p class='small' style='white-space: nowrap;'>{ data.lang.bet_builder }</p>
                        </div>
                    {:else}
                        <div/>
                    {/if}
                </div>
                <!-- 
                disclaimer-info-&-button -->
                <div class='row'>
                    <p class='small' style='margin-right: calc(100vw / 48); text-align: end;'>
                        { data.lang.disclaimer }
                    </p>
                    <button class='btn-primary'>
                        <p class='medium' style='white-space: nowrap;'>
                            Get 500$ bonus
                        </p>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}