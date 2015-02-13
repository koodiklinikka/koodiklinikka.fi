# Koodiklinikka 
![Codeship badge](https://codeship.com/projects/543e75b0-7d87-0132-42d6-0658b99f7d58/status?branch=master)

<img align="right" src="https://raw.githubusercontent.com/koodiklinikka/koodiklinikka.fi/master/src/assets/images/logo.png">

**Koodiklinikka.fi lähdekoodi**. [Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) ja [Pull Requestejä](https://github.com/koodiklinikka/koodiklinikka.fi/pulls) otetaan lämpimästi vastaan. Yritämme pitää kynnyksen kontribuoida projektiin alhaisena, jotta mahdollisimman moni pääsisi jättämään siihen jälkensä. Kaikki koodi katselmoidaan läpi ja mergetään projektiin kun näyttää hyvälle. Muutamasta mergetystä Pull Requestista oikeudet ylläpitää projektia.

[Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) voidaan käyttää myös sivun 
* toiminnallisuuteen
* designiin 
* [HTTP-rajapintaan](http://git@github.com:koodiklinikka/koodiklinikka.fi-api.git)
* projektin hallintaan liittyviin asioihin

Tai koko Koodiklinikkaan yleisesti.



-----------------------------
# Contributing

This repository is automatically deployed by [Codeship](https://codeship.com) to a [Digital Ocean](http://digitalocean.com) droplet hosting [http://koodiklinikka.fi](http://koodiklinikka.fi).


## Getting things up and running
- Install [Node.js](http://nodejs.org)

```
 git clone git@github.com:koodiklinikka/koodiklinikka.fi.git <your project name>
 cd <your project name>
 npm install
 npm start
 open http://localhost:9001 in your browser
```

### Enable LiveReload
Install [LiveReload for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

## CLI Commands
* npm install
    * Installs server-side dependencies from NPM and client-side dependencies from Bower
* npm start
    * Compiles your files, starts watching files for changes, serves static files to port 9001
* npm run build
    * Builds everything

Minification, uglification and other tasks you're expected to run before deploying your product can be made by running the build command with env variable NODE_ENV set to "production"
```
NODE_ENV=production npm run build
```
## API server
API proxy can be defined with **SERVER** environment variable.
```
SERVER=http://localhost:9000 npm start
```
## Development guidelines
* **public** - directory should be dedicated only to compiled/copied files from **src** - directory.
  It should be possible to delete directory completely and after **npm start** or **npm run build** everything should be as they were before the deletion.
* All backend dependencies should be installed with **npm**. Browser dependencies should be installed with **bower** or with **npm**.
