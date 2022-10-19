#! /usr/bin/env bash

. ./config.sh

if [ -z "${TASSEL_NAME}" ]; then
    echo "TASSEL_NAME is a required variable"
    exit 1
fi

if [ -z "${TASSEL_VERSION}" ]; then
    echo "TASSEL_VERSION is a required variable"
    exit 2
fi

if [ -z "${TASSEL_DESC}" ]; then
    echo "TASSEL_DESC is a required variable"
    exit 3
fi

if [ -z "${TASSEL_HOME}" ]; then
    echo "TASSEL_HOME is a required variable"
    exit 4
fi

if [ -z ${TASSEL_ICON} ]; then
    TASSEL_ICON="tassel"
fi

manifest='{
    "browser_specific_settings": {
        "gecko": {
            "id": "'"${TASSEL_NAME}"'@'"${TASSEL_HOST}"'",
            "strict_min_version": "100.0"
        }
    },
    "manifest_version": 2,
    "name": "'"${TASSEL_NAME}"'",
    "version": "'"${TASSEL_VERSION}"'",
    "description": "'"${TASSEL_DESC}"'",
    "homepage_url": "'"${TASSEL_HOME}"'",
    "icons": {
        "48": "icons/'"${TASSEL_ICON}"'.png",
        "96": "icons/'"${TASSEL_ICON}"'@2x.png"
    },
    "permissions": [
        "bookmarks",
        "management"
    ],
    "background": {
        "scripts": ["background.js"]
    }
}
'
echo $manifest | jq | tee manifest.json
zip "${TASSEL_NAME}" background.js manifest.json bookmarks.json LICENSE icons &>/dev/null