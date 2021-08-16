<!-- 
~~~~~~~~~~~~
	COMPONENT JS (w/ TS)
~~~~~~~~~~~~
-->
<script lang="ts">
  import {
    getUserLanguageLocationDB,
    getUserTranslation,
    getUserLocation,
  } from "../functions/index";

  import type {
    LanguageParam,
    LanguageTranslation,
    FinalLanguageResponse,
  } from "../models/firebase-real-db-interface";

  import ColorThief from "colorthief";

  import type { ContentLoaderProps } from "../models/content-loader-interface";

  import { onMount } from "svelte";

  import ContentLoader from "svelte-content-loader";

  /**
   * Function / Method
   * Description:
   * Intializer of the Widget Function
   *
   * Returns INTERFACE - `LanguageParam`
   */
  async function widgetInit(): Promise<FinalLanguageResponse> {
    // determine the users location:
    let userGeoInfo = await getUserLocation();
    // retrieve the appropiate information from the DB:
    let db_real_data = await getUserLanguageLocationDB(userGeoInfo);
    // retrive the appropiate countyr code translation based on DB data:
    let db_real_data_translation = await getUserTranslation(db_real_data);
    // append the translation to the data;
    let finalLanguageResponse: FinalLanguageResponse = {
      ...db_real_data,
      lang: db_real_data_translation,
    };
    // let intercept the image URL;
    let imgURL = finalLanguageResponse.logo;
    getImageBgColor(imgURL);
    // return the Promise Value
    return finalLanguageResponse;
  }
  let promise = widgetInit();

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
    img.addEventListener("load", function () {
      // get the array of RGB values,
      let colorValues = colorThief.getColor(img);
      // convert the RGB values to HEX value,
      let hexColor = rgbToHex(colorValues[0], colorValues[1], colorValues[2]);
      // pass this values as a `CSS :root` variable, accessible to all the website,
      const doc = document.documentElement;
      doc.style.setProperty("--logo-bookmaker-bg", `${hexColor}`);
    });
    // declaring the image paramaters & CORS by-pass
    let imageURL = imgURL;
    let googleProxyURL =
      "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";
    img.crossOrigin = "Anonymous";
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
  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  /**
   *  Function / Method;
   * ~~~~~~~~~~~~~~~~~~~
   * Description:
   * Deliberately delays the display of the
   * widget component for the users to show the
   * PlaceHolder loading;
   *
   * REMOVE THIS FOR PRODUCTION;
   * AS IT DELAYS ACCESS TO THE WEBSITE;
   */
  let show: boolean = false;
  onMount(async () => {
    setTimeout(() => {
      show = true;
    }, 2000);
  });

  /**
   * Decalring the ContentLoaderProps
   * values through the interface
   */
  let contentLoaderProps: ContentLoaderProps = {
    width: `100%`,
    height: `100%`,
    primaryColor: "#f9f9f9",
  };
</script>

<!-- 
~~~~~~~~~~~~
	COMPONENT HTML
~~~~~~~~~~~~
-->

{#await promise}
  <div id="ad_widget_betarena-loading">
    <ContentLoader {...contentLoaderProps} />
  </div>
{:then data}
  <!-- 
    simple further buffer to see the content loader-transition -->
  {#if !show}
    <div id="ad_widget_betarena-loading">
      <ContentLoader {...contentLoaderProps} />
    </div>
  {:else}
    <div id="ad_widget_betarena">
      <!--
            matchbetting-logo -->
      <a href={data.cta_link} target="_blank">
        <img src={data.logo} alt="Betting Site Logo" id="booker-logo" />
      </a>
      <div id="further-quick-info">
        <!-- 
                further-analytics-info -->
        <div class="row" style="margin-bottom: 21px; height: 45px;">
          <div class="info-box">
            <p class="large" style="color: var(--primary);">
              {data.avg_payout} %
            </p>
            <p class="medium">{data.lang.avg_payout}</p>
          </div>
          <div class="info-box">
            <p class="large" style="color: #68D77A">{data.payout_speed}</p>
            <p class="medium">{data.lang.payout_speed}</p>
          </div>
          {#if data.apps_support}
            <div class="info-box">
              <div class="row">
                <img
                  src="./static/BetArena - Working/icon/android.svg"
                  alt="Android"
                  class="device-support"
                />
                <img
                  src="./static/BetArena - Working/icon/apple.svg"
                  alt="Apple"
                  class="device-support"
                />
                <img
                  src="./static/BetArena - Working/icon/chrome-colored.svg"
                  alt="Desktop"
                  class="device-support"
                />
              </div>
              <p class="medium">{data.lang.apps_support}</p>
            </div>
          {/if}
        </div>
        <!-- 
                validation-row-further-info -->
        <div class={(data.cashout && data.live_stream && data.bet_builder) === true ? 'row' : 'row-center'}>
          {#if data.cashout}
            <div class="row">
              <img
                src="./static/BetArena - Working/icon/􀁣.svg"
                alt="Cashout"
                class="checkmark"
              />
              <p class="small">{data.lang.cashout}</p>
            </div>
          {/if}
          {#if data.live_stream}
            <div class="row">
              <img
                src="./static/BetArena - Working/icon/􀁣.svg"
                alt="LiveStream"
                class="checkmark"
              />
              <p class="small">{data.lang.live_stream}</p>
            </div>
          {/if}
          {#if data.bet_builder}
            <div class="row">
              <img
                src="./static/BetArena - Working/icon/􀁣.svg"
                alt="Bet Builder"
                class="checkmark"
              />
              <p class="small">{data.lang.bet_builder}</p>
            </div>
          {/if}
        </div>
      </div>
      <!-- 
            promotion-info-container -->
      <div id="promotion-info-box">
        <p class="small" style="margin-bottom: 12px;">
          {data.disclamer}
        </p>
        <a href={data.cta_link} target="_blank">
          <button class="btn-primary" style="margin-bottom: 20px; width: 100%;">
            <p class="medium">
              {data.cta_link_text}
            </p>
          </button>
        </a>
        <a href={data.link_for_review}>
          <p class="medium" style="color: var(--primary); font-weight: 500;">
            {data.lang.read_full_review} >
          </p>
        </a>
      </div>
    </div>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

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
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    overflow: hidden;
    margin: auto;
  }
  #ad_widget_betarena img#booker-logo {
    object-fit: contain;
    background-color: var(--logo-bookmaker-bg);
    width: 343px;
    height: 94px;
  }
  #ad_widget_betarena-loading {
    width: 343px;
    height: 392px;
    /* 
        constant-properties */
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    overflow: hidden;
    margin: auto;
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
    background: #ffffff;
    box-shadow: inset 0px 1px 0px #ebebeb;
    display: grid;
    text-align: center;
  }
</style>
