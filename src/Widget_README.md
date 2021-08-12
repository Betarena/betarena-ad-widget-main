## This is the code and development of the `Betarena` Ad Widget

This widget consist of having a fully responsive and tailored to the design from Figma

LIVE VIEW - `https://betarena-ad-widget.vercel.app/`

❗ - Some of the country codes are not in-line with the ones on the Firebase DB and will have to be manually adjsuted to fit inline with the country codes
used by the `GeoJS` API - `https://dev.maxmind.com/geoip/legacy/codes`.

## The Widget

### Mobile view

![image](https://user-images.githubusercontent.com/20924663/128642017-aedad3f8-c2b5-450a-99ba-12acb7280b25.png)

### Tablet/Desktop view

![image](https://user-images.githubusercontent.com/20924663/128642040-b51f1c20-055f-4b8a-aefb-68d7ab728bc4.png)

The Widget is fully responsive and higlhy dynamic to adjsut to any screen size and correctly display the data as outlined in the desgin-test. In line with the `Asana` Task board card, 
this widget displays data for a user on a target match-betting site in accordance to the `GeoPosition`, from which the correct `data`, `language` and `translations` are rendered into the `widget`.

The widget has been spit into to components, for easier change in the `html` code and `responsiveness` into:
- `src\components\_MobileBetarenaWidget.svelte` &,
- `src\components\_TabletPlusBetarenaWidget.svelte` (triggered at scree-width of `1024px`)

However, only the `<style> & html` code is being changed in these components, with each of the components sharing the same `<scripr>` code, stored inside `src\functions\index.ts`.

## Database

For the database, `Firebase` was used to store the necessary data of the local user location and language.

The `Firebase Realtime Database` was used, for which the following documentation was used:
https://firebase.google.com/docs/database

### Firebase Structure

All of the connection and initialization of the use of Firebase on the App is stored inside the `src\firebase\index.ts`

![image](https://user-images.githubusercontent.com/20924663/128641489-073b383a-930e-443a-bd9d-b5a800559666.png)

### Firebase Interfaces Used

To correctly interact with the Fireabse Data the following interfaces were used to manage and access the data correctly, stored inside the `src\models\firebase-real-db-interface.ts` file.

![code](https://user-images.githubusercontent.com/20924663/128641672-c4fdfe57-3849-46cb-b5fb-a47df82504d7.png)

## Geolocation

This widget is Geolocation based and upon locading the widget, the component checks the user location by making a simple request to the `GeoJS` API through the `url` - `https://get.geojs.io/v1/ip/geo.json`

The widget handles the response form the `GeoJS` API using the following consturcted interface, located inside the `src\models\geo-js-interface.ts` file:

![code](https://user-images.githubusercontent.com/20924663/128641768-be309c11-b276-40c9-bfeb-8fb0bff3945c.png)