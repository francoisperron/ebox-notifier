## Get notified of your [Electronicbox] internet usage

[Electronicbox]:http://www.electronicbox.net/

### To run test
npm run

### To deploy on heroku
- Create app
- Create configs
```javascript
heroku config:set GMAIL_USER=gmail user used to send emails
heroku config:set GMAIL_PASS=das password (or application password)
heroku config:set CONFIGS=[{"code":"EBOXCODE","to":"recipients emails separated by comas"}, ...]
heroku ps:scale web=0
```
- npm run deploy
- Create a daily scheduler in heroku to run bin/check-ebox


### To do
- Send regular emails only on friday
- Send warning when at 95% of max usage