## Get notified of your [Electronicbox] internet usage

[Electronicbox]:http://www.electronicbox.net/

### To run test
npm test

### To deploy on heroku
- Create app
```javascript
heroku create [app-name]
```
- Create configs
```javascript
heroku config:set GMAIL_USER=gmail user used to send emails
heroku config:set GMAIL_PASS=das password (or application password)
heroku config:set CONFIGS=[{"code":"EBOXCODE","to":"recipients emails separated by comas"}, ...]
```
- Disable heroku web runner
```javascript
heroku ps:scale web=0
```
- Deploy
```javascript
npm run deploy
```
- Create a daily [scheduler] in heroku to run bin/check-ebox

[scheduler]:https://scheduler.heroku.com/dashboard
