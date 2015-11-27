# Koodiklinikka
![Travis](https://travis-ci.org/koodiklinikka/koodiklinikka.fi.svg?branch=master)

<img align="right" src="https://raw.githubusercontent.com/koodiklinikka/koodiklinikka.fi/master/src/assets/images/logo.png">

**Koodiklinikka.fi lähdekoodi**. [Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) ja [Pull Requestejä](https://github.com/koodiklinikka/koodiklinikka.fi/pulls) otetaan lämpimästi vastaan. Yritämme pitää kynnyksen kontribuoida projektiin alhaisena, jotta mahdollisimman moni pääsisi jättämään siihen jälkensä. Kaikki koodi katselmoidaan läpi ja mergetään projektiin kun näyttää hyvälle. Muutamasta mergetystä Pull Requestista oikeudet ylläpitää projektia.

[Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) voidaan käyttää myös sivun
* toiminnallisuuteen
* designiin
* [HTTP-rajapintaan](https://github.com/koodiklinikka/koodiklinikka.fi-api)
* projektin hallintaan liittyviin asioihin

Tai koko Koodiklinikkaan yleisesti.


-----------------------------

## Getting things up and running
- Install [Node.js](http://nodejs.org)

```
 git clone git@github.com:leonidas/gulp-project-template.git <your project name>
 cd <your project name>
 npm install
 npm start
 open http://localhost:9001 in your browser
```

## CLI Commands
* npm install
    * Installs server-side dependencies from npm
* npm start
    * Compiles your files, starts watching files for changes, serves static files to port 9001
* npm run build
    * Builds everything

# Production build
Minification, uglification and other tasks you're expected to run before deploying your product can be made by running the build command with env variable NODE_ENV set to "production"

    NODE_ENV=production npm run build

## Development guidelines
#### Directory structure

**public** - directory should be dedicated only to compiled/copied files from **src** - directory.
  It should be possible to delete directory completely and after **npm start** or **npm run build** everything should be as they were before the deletion.
