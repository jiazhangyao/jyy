import Vue from "vue";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

export function sentryInit(): void {
    if (process.env.VUE_APP_SERVER === 'devServer') {
        Sentry.init({
            dsn: 'http://0cb46718a45e4cda80ef7e26b669bc0f@47.100.180.243:9000/11',
            integrations: [new Integrations.Vue({ Vue, attachProps: true })]
        });
    }
    if (process.env.VUE_APP_SERVER === 'prodServer') {
        Sentry.init({
            dsn: 'http://dd35425a97ad43289574d996ea99a3bf@47.100.180.243:9000/12',
            integrations: [new Integrations.Vue({ Vue, attachProps: true })]
        });
    }
}

