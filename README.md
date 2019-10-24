# Koodiklinikka
![Travis](https://travis-ci.org/koodiklinikka/koodiklinikka.fi.svg?branch=master)

<img align="right" src="https://raw.githubusercontent.com/koodiklinikka/koodiklinikka.fi/master/src/assets/images/logo.png">

**Koodiklinikka.fi lähdekoodi**. [Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) ja [Pull Requestejä](https://github.com/koodiklinikka/koodiklinikka.fi/pulls) otetaan lämpimästi vastaan. Yritämme pitää kynnyksen kontribuoida projektiin alhaisena, jotta mahdollisimman moni pääsisi jättämään siihen jälkensä. Kaikki koodi katselmoidaan läpi ja mergetään projektiin kun näyttää hyvälle. Muutamasta mergetystä Pull Requestista oikeudet ylläpitää projektia.

[Issueita](https://github.com/koodiklinikka/koodiklinikka.fi/issues) voidaan käyttää myös sivun:
* toiminnallisuuteen
* designiin
* [HTTP-rajapintaan](https://github.com/koodiklinikka/koodiklinikka.fi-api)
* projektin hallintaan liittyviin asioihin
* tai koko Koodiklinikkaan yleisesti.


-----------------------------

## Projektin asennus

- Asenna [Node.js](http://nodejs.org)
- Kloonaa projekti koneellesi:

```
 git clone https://github.com/koodiklinikka/koodiklinikka.fi.git
```

- Käynnistä kehitystila:

```
  cd koodiklinikka.fi
  npm install
  npm start
```

- Avaa selaimessasi: [`http://localhost:3000`](http://localhost:3000)


## Komennot
* `npm install`
    * asentaa projektin riippuvuudet
* `npm start`
    * kääntää lähdetiedostot ja palvelee sovellusta porttiin `3000`
* `npm run build`
    * kääntää lähdetiedostot -> `out/`
