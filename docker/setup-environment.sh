#!/usr/bin/env sh

JSON_STRING='window.env = { \
  APP_POSTMAIL_ACCESS_TOKEN: "'"${APP_POSTMAIL_ACCESS_TOKEN}"'", \
}'
sed -i "s@<script id=\"environment\"></script>@<script>${JSON_STRING}</script>@" /usr/share/nginx/html/index.html
exec "$@"
