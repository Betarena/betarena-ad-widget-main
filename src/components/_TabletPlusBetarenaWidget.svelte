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

  import type { ContentLoaderProps } from "../models/content-loader-interface";

  import { onMount } from "svelte";

  import ContentLoader from "svelte-content-loader";

  import ColorThief from "colorthief";

  /**
   * Function / Method
   * ~~~~~~~~~~~~~~~~~~~
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

<!-- calc(100vw / (var(--mobile) / 6.2)); -->

<!-- 
~~~~~~~~~~~~
	COMPONENT HTML
~~~~~~~~~~~~
-->

{#await promise}
  <div id="ad_widget_betarena">
    <ContentLoader {...contentLoaderProps} />
  </div>
{:then data}
  <!-- 
    simple further buffer to see the content loader-transition -->
  {#if !show}
    <div id="ad_widget_betarena">
      <ContentLoader {...contentLoaderProps} />
    </div>
  {:else}
    <div id="ad_widget_betarena">
      <!--
            matchbetting-logo -->
      <a href={data.cta_link} target="_blank" rel="noreferrer">
        <img src={data.logo} alt="Betting Site Logo" id="booker-logo" />
      </a>
      <div id="desktop-container">
        <!-- 
                further-info -->
        <div id="further-quick-info">
          <!-- 
                    further-analytics-info -->
          <div class="row">
            <div class="info-box">
              <p class="large" style="color: var(--primary);">
                {data.avg_payout} %
              </p>
              <p class="small">{data.lang.avg_payout}</p>
            </div>
            <div class="info-box">
              <p class="large" style="color: #68D77A">{data.payout_speed}</p>
              <p class="small">{data.lang.payout_speed}</p>
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
                <p class="small">{data.lang.apps_support}</p>
              </div>
            {/if}
          </div>
          <!-- 
                    CTA-read-more -->
          <a href={data.link_for_review}>
            <p class="small" style="color: var(--primary); font-weight: 500;">
              {data.lang.read_full_review} >
            </p>
          </a>
        </div>
        <!-- 
                promotion-info-container -->
        <div id="promotion-info-box">
          <!-- 
                    validation-row-further-info -->
          <div
            class="column"
            style="margin-right: calc(100vw / 12.5901639344);"
          >
            {#if data.cashout}
              <div class="row check-box">
                <img
                  src="./static/BetArena - Working/icon/􀁣.svg"
                  alt="Cashout"
                  class="checkmark"
                />
                <p class="small" style="white-space: nowrap;">
                  {data.lang.cashout}
                </p>
              </div>
            {:else}
              <div />
            {/if}
            {#if data.live_stream}
              <div class="row check-box">
                <img
                  src="./static/BetArena - Working/icon/􀁣.svg"
                  alt="LiveStream"
                  class="checkmark"
                />
                <p class="small" style="white-space: nowrap;">
                  {data.lang.live_stream}
                </p>
              </div>
            {:else}
              <div />
            {/if}
            {#if data.bet_builder}
              <div class="row check-box">
                <img
                  src="./static/BetArena - Working/icon/􀁣.svg"
                  alt="Bet Builder"
                  class="checkmark"
                />
                <p class="small" style="white-space: nowrap;">
                  {data.lang.bet_builder}
                </p>
              </div>
            {:else}
              <div />
            {/if}
          </div>
          <!-- 
                    disclaimer-info-&-button -->
          <div class="row">
            <p class="small" style="margin-right: 16px; text-align: end;">
              {data.disclamer}
            </p>
            <a href={data.cta_link} target="_blank" rel="noreferrer">
              <button class="btn-primary">
                <p class="medium" style="white-space: nowrap;">
                  {data.cta_link_text}
                </p>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<!-- 
~~~~~~~~~~~~~~~~~~~~
TABLED & DESKTOP FIRST -->
<style>
  /*
    ~~~~~~~~~~~~~~~~~~~~
    widget-container-style
    */
  #ad_widget_betarena {
    max-width: 700px !important;
    max-height: 196px !important;
    width: 100% !important;
    height: 100% !important;
    /* 
        constant-properties */
    display: flex;
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    overflow: hidden;
    margin: auto;
  }
  #ad_widget_betarena img#booker-logo {
    object-fit: contain;
    background-color: var(--logo-bookmaker-bg);
    width: 140px;
    height: 100%;
  }
  /* 
    ~~~~~~~~~~~~~~~~~~~~
    tabler-desktop-specific 
    */
  #desktop-container {
    display: grid;
    /* width: calc(100vw / 1.37142857143); */
    width: 560px;
  }
  /*
    ~~~~~~~~~~~~~~~~~~~~
    further-quick-info
    */
  #further-quick-info {
    /* height: calc(100vw / 9.14285714286); */
    /* padding: calc(100vw / 38.4); */
    height: 84px;
    padding: 20px;
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
    /* height: calc(100vw / 17.4545454545); */
    /* margin-right: calc(100vw / 24); */
    height: 44px;
    margin-right: 32px;
  }
  .info-box:not(:first-child) {
    /* padding-left: calc(100vw / 48); */
    padding-left: 16px;
    border-left: 1px solid #e6e6e6;
  }
  img.device-support {
    /* width: calc(100vw / 50.7600793126); */
    /* margin-right: calc(100vw / 91.5375446961); */
    height: auto;
    width: 15.13px;
    margin-right: 8.39px;
  }
  .check-box {
    /* margin-bottom: calc(100vw / 88.9918887601); */
    margin-bottom: 8.67px;
  }
  .check-box:last-child {
    margin-bottom: 0;
  }
  img.checkmark {
    /* width: calc(100vw / 45.1499118166); */
    /* margin: 0 calc(100vw / 80.6722689076) 0 0; */
    height: auto;
    width: 17.01px;
    margin: 0 9.52px 0 0;
  }
  /*
    ~~~~~~~~~~~~~~~~~~~~
    promotion-CTA-box
    */
  #promotion-info-box {
    /* padding: calc(100vw / 38.4); */
    padding: 21.34px;
    background: #ffffff;
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
      max-width: 783px !important;
      max-height: 196px !important;
      width: 100% !important;
      height: 100% !important;
      /* width: calc(100vw / 1.81818181818); */
      /* height: calc(100vw / 7.34693877551); */
    }
    #ad_widget_betarena img#booker-logo {
      /* width: calc(100vw / 10.2857142857);
            height: inherit; */
      object-fit: contain;
      width: 140px;
    }
    /* 
        ~~~~~~~~~~~~~~~~~~~~
        tabler-desktop-specific 
        */
    #desktop-container {
      /* width: calc(100vw / 2.20858895706); */
      width: 652px;
    }
    /*
        ~~~~~~~~~~~~~~~~~~~~
        further-quick-info
        */
    #further-quick-info {
      /* height: calc(100vw / 17.1428571429); */
      /* padding: calc(100vw / 72); */
      height: 84px;
      padding: 20px;
    }
    .info-box {
      /* height: calc(100vw / 32.7272727273); */
      /* margin-right: calc(100vw / 45); */
      height: 44px;
      margin-right: 32px;
    }
    .info-box:not(:first-child) {
      /* padding-left: calc(100vw / 90); */
      padding-left: 16px;
      border-left: 1px solid #e6e6e6;
    }
    img.device-support {
      /* width: calc(100vw / 95.1751487112); */
      /* margin-right: calc(100vw / 171.632896305); */
      height: auto;
      width: 15.13px;
      margin-right: 8.39px;
    }
    .check-box {
      /* margin-bottom: calc(100vw / 166.666666667); */
      margin-bottom: 8.64px;
    }
    .check-box:last-child {
      margin-bottom: 0;
    }
    img.checkmark {
      /* width: calc(100vw / 84.6560846561); */
      /* margin: 0 calc(100vw / 151.260504202) 0 0; */
      height: auto;
      width: 17.01px;
      margin-right: 9.52px;
    }
    /*
        ~~~~~~~~~~~~~~~~~~~~
        promotion-CTA-box
        */
    #promotion-info-box {
      /* padding: calc(100vw / 72); */
      padding: 21.35px;
    }
  }
</style>
