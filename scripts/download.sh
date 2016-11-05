#!/bin/bash

# Google font family url with custom font style params
FONT_URL="fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700,700i"

# Uses Safari iOS 10 user agent string to get .woff2 file links without extra languages in the css file. (Chrome/Firefox ignores subset param and adds all language variations, desktop Safari 10 gets .woff file links)
curl -o "downloads/index.css" -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0 Mobile/14B100 Safari/602.1" $FONT_URL
