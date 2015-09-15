## Get notified of your [Electronicbox] internet usage

[Electronicbox]:http://www.electronicbox.net/

### To run test
npm run

### To deploy on heroku
1. Create app
2. Create configs
```javascript
heroku config:set GMAIL_USER=gmail user used to send emails
heroku config:set GMAIL_PASS=das password (or application password)
heroku config:set CONFIGS=[{"code":"EBOXCODE","to":"recipients emails separated by comas"}, ...]
```
3. npm run deploy
4. Create a daily scheduler in heroku to run bin/check-ebox


### To do
1. Send regular emails only on friday
2. Send warning when at 95% of max usage